<template>
  <div class="note-editor">
    <!-- Actions -->
    <div class="actions">
      <button @click="handleSubmit">
        {{ note?.id ? "Update" : "Create" }}
      </button>
      <button @click="$emit('cancel')">Cancel</button>
    </div>
    <!-- Header -->
    <input
      v-model="noteLocal.title"
      type="text"
      placeholder="Enter a Title..."
    />
    <div class="note-editor-toolbar">
      <Toolbar
        :isBold="isBold"
        :isItalic="isItalic"
        :isUnderline="isUnderline"
        @applyStyle="applyStyle"
        @applyColor="applyColor"
        @applyFont="applyFont"
        @applyHeading="applyHeading"
        @applySpellcheck="applySpellcheck" 
      />
    </div>

    <div class="note-editor-editable">
      <div
        class="text-area"
        v-html="noteLocal.content"
        contenteditable="true"
        ref="contentRef"
        :spellcheck="isSpellcheckEnabled"
        @input="onInput"
        @beforeinput="(e) => { handleEnter(e); onBeforeInput(e); }"
      ></div> 
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useNotes } from "../../composables/useNotes";
import Toolbar from "../toolbar/Toolbar.vue";
import { useTextFormatting } from "../../composables/functions/useTextFormatting";
import { useHeadingMode } from "../../composables/functions/useHeadingMode";
import { currentHeadingElement } from "../../composables/based/useEditorState";
import { useSpellcheck } from "../../composables/functions/useSpellcheck"; 


const props = defineProps({ note: Object });
const emit = defineEmits(["save", "cancel"]);

const { createNote, updateNote } = useNotes();

// Local state
const noteLocal = ref({ title: "", content: "" });

const { isBold, isItalic, isUnderline, toggleStyle } = useTextFormatting();
const contentRef = ref(null);

const currentColor = ref("#000000"); // default black

const currentFont = ref("Arial"); // default font

function handleEnter(e) {
  if (e.inputType !== "insertParagraph") return;
   
  e.preventDefault();

  //console.log("ENTER");

   const br = document.createElement("br");
   const range = window.getSelection().getRangeAt(0);
   range.insertNode(br);
   range.setStartAfter(br);
   range.collapse(true);
}


function applyColor(color) {
  currentColor.value = color; // just update state
}

const { activeHeading, toggleHeading } = useHeadingMode();

const { isSpellcheckEnabled } = useSpellcheck();

function applySpellcheck(val) {
  isSpellcheckEnabled.value = val;
  nextTick(() => {
    if (contentRef.value) {
      const html = contentRef.value.innerHTML;
      contentRef.value.innerHTML = ""; // empty
      contentRef.value.innerHTML = html; // write again
      contentRef.value.focus(); // auto focus
    }
  });
}

function applyFont(font) {
  currentFont.value = font;

  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);

  // If no selection: apply to nearest style container
  if (sel.isCollapsed) {
    const container =
      range.startContainer.nodeType === Node.TEXT_NODE
        ? range.startContainer.parentNode
        : range.startContainer;

    // Nearest <span> or styled element
    const spanAncestor = findStylableAncestor(container);

    if (spanAncestor) {
      spanAncestor.style.fontFamily = font;
    } else {
      // If no suitable style container is available: minimal wrap
      const span = document.createElement("span");
      span.style.fontFamily = font;
      span.appendChild(document.createTextNode("\u200B"));
      range.insertNode(span);

      // put caret back into span
      const newRange = document.createRange();
      newRange.setStart(span.firstChild, 1);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
    }

    noteLocal.value.content = contentRef.value.innerHTML;
    return;
  }

  // If selected: non-destructive wrap
  try {
    const span = document.createElement("span");
    span.style.fontFamily = font;
    range.surroundContents(span);
  } catch {
    // if surroundContents fails (fragmented DOM):
    const span = document.createElement("span");
    span.style.fontFamily = font;
    const frag = range.cloneContents(); // copy the content (do not extract!)
    range.deleteContents(); // then delete
    span.appendChild(frag);
    range.insertNode(span);
    // move caret to end of span
    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    newRange.collapse(false);
    sel.removeAllRanges();
    sel.addRange(newRange);
  }

  noteLocal.value.content = contentRef.value.innerHTML;
} 

function applyHeading(level) {
  const tag = `h${level}`;
  currentHeadingElement.value = tag;

  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);

  // If the caret is empty, open the heading.
  if (sel.isCollapsed) {
    const heading = document.createElement(tag);
    heading.appendChild(document.createTextNode("\u200B"));
    range.insertNode(heading);

    // Move caret into heading
    const newRange = document.createRange();
    newRange.setStart(heading.firstChild, 1);
    newRange.collapse(true);
    sel.removeAllRanges();
    sel.addRange(newRange);

    // Keep heading in state
    currentHeadingElement.value = heading;
  } else {
    // Wrap selected text with heading
    const frag = range.extractContents();
    const heading = document.createElement(tag);
    heading.appendChild(frag);
    range.insertNode(heading);
    currentHeadingElement.value = heading;
  }

  noteLocal.value.content = contentRef.value.innerHTML;
}

// Helper: find the nearest inertia where the style is applicable
function findStylableAncestor(node) {
  let cur = node;
  while (cur && cur !== contentRef.value) {
    if (cur.nodeType === Node.ELEMENT_NODE && cur.tagName === "SPAN") {
      return cur;
    }
    cur = cur.parentNode;
  }
  return null;
}

function onBeforeInput(e) {
  if (e.inputType !== "insertText") return;

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const text = e.data === " " ? "\u00A0" : e.data;

  if (activeHeading.value) {
    // If the caret is already in the heading, just add the text.
    const container = range.startContainer;
    const headingAncestor = findHeadingAncestor(container);

    if (headingAncestor) {
      // Add a text node to the heading
      const textNode = document.createTextNode(text);
      range.insertNode(textNode);

      // move caret to end of textNode
      const newRange = document.createRange();
      newRange.setStartAfter(textNode);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);

      e.preventDefault();
      return;
    } else {
      // If a heading is being created for the first time, create a heading.
      const heading = document.createElement(activeHeading.value);
      heading.textContent = text;
      range.insertNode(heading);

      const newRange = document.createRange();
      newRange.selectNodeContents(heading);
      newRange.collapse(false);
      selection.removeAllRanges();
      selection.addRange(newRange);

      e.preventDefault();
      return;
    }
  } else {
    // Use span for normal style.
    const span = document.createElement("span");
    span.style.fontWeight = isBold.value ? "bold" : "normal";
    span.style.fontStyle = isItalic.value ? "italic" : "normal";
    span.style.textDecoration = isUnderline.value ? "underline" : "none";
    span.style.color = currentColor.value;
    span.style.fontFamily = currentFont.value;

    span.textContent = text;
    range.insertNode(span);

    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    newRange.collapse(false);
    selection.removeAllRanges();
    selection.addRange(newRange);

    e.preventDefault();
    return;
  }

  noteLocal.value.content = contentRef.value.innerHTML;
}

// Helper: Find the heading where caret is located.
function findHeadingAncestor(node) {
  let cur = node.nodeType === Node.TEXT_NODE ? node.parentNode : node;
  while (cur) {
    if (/^H[1-6]$/.test(cur.tagName)) return cur;
    cur = cur.parentNode;
  }
  return null;
}

function applyStyle(styleType) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);

  const span = document.createElement("span");

  // Apply style toggles
  if (styleType === "bold") {
    span.style.fontWeight = isBold.value ? "bold" : "normal";
  }
  if (styleType === "italic") {
    span.style.fontStyle = isItalic.value ? "italic" : "normal";
  }
  if (styleType === "underline") {
    span.style.textDecoration = isUnderline.value ? "underline" : "none";
  }

  // Enclose the selected text in spans
  try {
    range.surroundContents(span);
  } catch (err) {
    // If range is empty or surroundContents fails, fallback
    span.appendChild(range.extractContents());
    range.insertNode(span);
  }

  // Update content
  noteLocal.value.content = contentRef.value.innerHTML;
}

function moveCaretToEnd() {
  const sel = window.getSelection();
  if (!sel || !contentRef.value) return;

  const range = document.createRange();
  range.selectNodeContents(contentRef.value);
  range.collapse(false); // false => finally collapse

  sel.removeAllRanges();
  sel.addRange(range);
}

function moveCaretToStart() {
  const sel = window.getSelection();
  if (!sel || !contentRef.value) return;

  const range = document.createRange();
  range.selectNodeContents(contentRef.value);
  range.collapse(true); // true => collapse start

  sel.removeAllRanges();
  sel.addRange(range);
}

function onInput() {
  noteLocal.value.content = contentRef.value.innerHTML;
  nextTick(() => {
    moveCaretToEnd(); // or moveCaretToStart()
  });
}

watch(
  () => props.note,
  (note) => {
    noteLocal.value.title = note?.title || "";
    noteLocal.value.content = note?.content || "";

    // only fill on first load
    if (contentRef.value && note?.content) {
      //contentRef.value.innerHTML = noteLocal.value.content;
      contentRef.value.innerHTML = note?.content; // direct HTML
    }
  },
  { immediate: true }
);

// Save
function handleSubmit() {
  const noteData = {
    id: props.note?.id,
    title: noteLocal.value.title.trim(),
    //content: contentRef.value.innerHTML.trim(),
    //content: noteLocal.value.content.trim(),
    content: contentRef.value.innerHTML,

    styles: {
      bold: isBold.value,
      italic: isItalic.value,
      underline: isUnderline.value,
    },
  };

  if (noteData.id) {
    updateNote(noteData);
  } else {
    createNote(noteData);
  }

  emit("save", noteData);
}
</script>

<style scoped>
.bold {
  font-weight: bold;
}
.italic {
  font-style: italic;
}
.underline {
  text-decoration: underline;
}

.text-area h1 {
  font-size: 2em;
  font-weight: bold;
  margin: 0.5em 0;
}

.text-area h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0.5em 0;
}

.text-area h3 {
  font-size: 1.17em;
  font-weight: bold;
  margin: 0.5em 0;
}

.text-area h4 {
  font-size: 1em;
  font-weight: bold;
  margin: 0.5em 0;
}

.text-area h5 {
  font-size: 0.83em;
  font-weight: bold;
  margin: 0.5em 0;
}

.text-area h6 {
  font-size: 0.67em;
  font-weight: bold;
  margin: 0.5em 0;
}

.note-editor-editable h1,
.note-editor-editable h2,
.note-editor-editable h3,
.note-editor-editable h4,
.note-editor-editable h5,
.note-editor-editable h6 {
  margin: 0; /* varsayılan boşlukları kaldır */
  line-height: 1.4; /* satır yüksekliğini ayarla */
  display: inline-block;
}

.note-editor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.actions {
  display: flex;
  gap: 1rem;
}
input {
  width: 100%;
  height: 40px;
}

textarea,
.text-area {
  border: 1px solid #ccc;
  padding: 0.5rem;
  width: 100%;
  height: 400px;
  border-radius: 4px;
}
</style>
