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
      placeholder="Başlık yazın..."
    />
    <div class="note-editor-toolbar">
      <Toolbar
        :isBold="isBold"
        :isItalic="isItalic"
        :isUnderline="isUnderline"
        @applyStyle="applyStyle"
        @applyColor="applyColor"
        @applyFont="applyFont"
      />
    </div>

    <div class="note-editor-editable">
      <div
        class="text-area"
        v-html="noteLocal.content"
        contenteditable="true"
        ref="contentRef"
        @input="onInput"
        @beforeinput="onBeforeInput"
      ></div>
      <!--  @input="noteLocal.content = contentRef.innerHTML" -->

      <!-- Tags -->
      <label>
        Etiketler (virgülle ayır):
        <input v-model="tags" type="text" />
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useNotes } from "../../composables/useNotes";
import Toolbar from "../toolbar/Toolbar.vue";
import { useTextFormatting } from "../../composables/functions/useTextFormatting";

const props = defineProps({ note: Object });
const emit = defineEmits(["save", "cancel"]);

const { createNote, updateNote } = useNotes();

// Local state
const noteLocal = ref({ title: "", content: "" });

const tags = ref("");

const { isBold, isItalic, isUnderline, toggleStyle } = useTextFormatting();
const contentRef = ref(null);

const currentColor = ref("#000000"); // default black

const currentFont = ref("Arial"); // default font

function applyColor(color) {
  currentColor.value = color; // just update state
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
  // perform special action only for adding text
  if (e.inputType === "insertText") {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    const span = document.createElement("span");
    span.style.fontWeight = isBold.value ? "bold" : "normal";
    span.style.fontStyle = isItalic.value ? "italic" : "normal";
    span.style.textDecoration = isUnderline.value ? "underline" : "none";
    span.style.color = currentColor.value;
    span.style.fontFamily = currentFont.value; // active font comes from here

    const text = e.data === " " ? "\u00A0" : e.data;
    span.textContent = text;

    if (range.collapsed) {
      range.insertNode(span);
      range.setStartAfter(span);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
      e.preventDefault(); // only for insertText
      return;
    }

    noteLocal.value.content = contentRef.value.innerHTML;
  }
  // do nothing for other input types (e.g. deleteContentBackward)
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
    tags.value = note?.tags?.join(", ") || "";

    // only fill on first load
    if (contentRef.value && note?.content) {
      //contentRef.value.innerHTML = noteLocal.value.content;
      contentRef.value.innerHTML = note?.content; // direct HTML
    }
  },
  { immediate: true }
);

/*
// Fill in the note in edit mode
watch(
  () => props.note,
  (note) => {
    noteLocal.value.title = note?.title || "";
    noteLocal.value.content = note?.content || "";
    tags.value = note?.tags?.join(", ") || "";

    // contenteditable div fill
    if (contentRef.value) {
      contentRef.value.innerHTML = noteLocal.value.content;
    }
  },
  { immediate: true }
);
*/
/*
watch(
  () => props.note,
  (note) => {
    noteLocal.value.title = note?.title || "";
    noteLocal.value.content = note?.content || "";
    tags.value = note?.tags?.join(", ") || "";
  },
  { immediate: true }
);
*/

// Save
function handleSubmit() {
  const noteData = {
    id: props.note?.id,
    title: noteLocal.value.title.trim(),
    //content: contentRef.value.innerHTML.trim(),
    //content: noteLocal.value.content.trim(),
    content: contentRef.value.innerHTML,

    tags: tags.value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
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

.note-editor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.actions {
  display: flex;
  gap: 1rem;
}
input,
textarea,
.text-area {
  border: 1px solid #ccc;
  padding: 0.5rem;
  width: 100%;
  height: 80px;
  border-radius: 4px;
}
</style>
