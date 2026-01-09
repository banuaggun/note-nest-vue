<template>
  <div class="note-editor">
    <div class="note-editor-header">

      <div class="note-editor-actions">
        <button @click="handleSubmit">
          {{ note?.id ? "Update" : "Create" }}
        </button>
        <button @click="$emit('cancel')">Cancel</button>
      </div>

      <div class="note-editor-header">
        <textarea v-model="noteLocal.title" rows="3" class="note-editor-title-input" placeholder="Enter a Title..."
          @input="handleTitleInput"></textarea>
      </div>

      <div class="note-editor-toolbar">
        <Toolbar :isBold="isBold" :isItalic="isItalic" :isUnderline="isUnderline" :activeColor="activeColor"
          :fontFamily="fontFamily"  
          @applyStyle="applyStyle" @applyColor="applyColor" @applyFont="applyFont" @applyHeading="applyHeading"
          @applySpellcheck="applySpellcheck" />
      </div>

      <div class="note-editor-editable">
        <div 
          class="text-area" 
          contenteditable="true" 
          ref="contentRef" 
          v-html="noteLocal.content" 
          @input="onInput"
          @beforeinput="(e) => {onBeforeInput(e)}"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';
import { useNotes } from '../../composables/useNotes';
import Toolbar from '../toolbar/Toolbar.vue';
import { useTextFormatting } from '../../composables/functions/useTextFormatting';
import { useTextColor } from '../../composables/functions/useTextColor';
import { useSpellcheck } from '../../composables/functions/useSpellcheck';
import { useHeadingMode } from '../../composables/functions/useHeadingMode';
import { useFontFamily } from '../../composables/functions/useFontFamily';
import { useEditorContent } from '../../composables/based/useEditorContent';
import { useEditorFormatting } from '../../composables/based/useEditorFormatting';
import { editable, currentHeadingElement } from '../../composables/based/useEditorState';

// required by default 
const props = defineProps({ note: Object });
const emit = defineEmits(["save", "cancel"]);
const { createNote, updateNote } = useNotes();

const noteLocal = ref({ title: "", content: "" });
const contentRef = ref(null);

// composables
const { isBold, isItalic, isUnderline, toggleStyle } = useTextFormatting(); 

const currentColor = ref("#000000"); // default black

const currentFont = ref("Arial"); // default font


const { activeColor, setColor } = useTextColor();
const { activeHeading, toggleHeading } = useHeadingMode();

// editor content + formatting
const { formatContent, updateFromHTML, onContentInput } = useEditorContent(contentRef, noteLocal);
const { applyStyleToSelection, setCaretToEnd } = useEditorFormatting({
  editable: contentRef,
  selectedNote: noteLocal,
  activeHeading,
  isBold,
  isItalic,
  isUnderline,
  currentHeadingElement,
  onContentInput,
});

// editor title input  
const titleCharCount = ref(0);
const MAX_TITLE_LENGTH = 100;
const MAX_CONTENT_LENGTH = 4000;

function handleTitleInput(e) {
  const value = e.target.value;
  if (value.length > MAX_TITLE_LENGTH) {
    e.target.value = value.slice(0, MAX_TITLE_LENGTH);
    noteLocal.value.title = e.target.value;
  }
  titleCharCount.value = noteLocal.value.title.length;
}

// toolbar event handler’ları 
function findHeadingAncestor(node) {
  let cur = node.nodeType === Node.TEXT_NODE ? node.parentNode : node;
  while (cur) {
    if (/^H[1-6]$/.test(cur.tagName)) return cur;
    cur = cur.parentNode;
  }
  return null;
}


function applyStyle(styleType) { 
  //toggleStyle(styleType); 

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
    span.style.textDecoration = "underline";
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


function applyHeading(level) {
  const sel = window.getSelection();
  //if (!sel || sel.rangeCount === 0) return;

  if (sel.rangeCount === 0) {
  const range = document.createRange();
  range.selectNodeContents(contentRef.value);
  range.collapse(false);
  sel.addRange(range);
}

  const tag = `h${level}`;
  const range = sel.getRangeAt(0);

  // Toggle off: aynı heading aktifse sadece state kapat
  if (activeHeading.value === tag) {
    //activeHeading.value = null;
    currentHeadingElement.value = null;
    return;
  } else{
    activeHeading.value= null; 
    return;
  }

  // Toggle on: heading ekle
  let heading;
  if (sel.isCollapsed) {
    heading = document.createElement(tag);
    const zwsp = document.createTextNode("\u200B");
    heading.appendChild(zwsp);
    range.insertNode(heading);

    const newRange = document.createRange();
    newRange.setStart(zwsp, 1);
    newRange.collapse(true);
    sel.removeAllRanges();
    sel.addRange(newRange);
  } else {
    const frag = range.extractContents();
    heading = document.createElement(tag);
    heading.appendChild(frag);
    range.insertNode(heading);

    const newRange = document.createRange();
    newRange.selectNodeContents(heading);
    newRange.collapse(false);
    sel.removeAllRanges();
    sel.addRange(newRange);
  }

  activeHeading.value = tag;
  currentHeadingElement.value = heading;
  noteLocal.value.content = contentRef.value.innerHTML;
} 

function applyColor(color) {
  currentColor.value = color; // just update state
} 

function applyFont(font) {
  currentFont.value = font;
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;

  const range = sel.getRangeAt(0);

  if (sel.isCollapsed) {
    const container = range.startContainer.nodeType === Node.TEXT_NODE
      ? range.startContainer.parentNode
      : range.startContainer;

    // Önce heading içinde miyiz?
    const headingAncestor = findHeadingAncestor(container);
    if (headingAncestor) {
      headingAncestor.style.fontFamily = font; // tüm heading satırına uygula
    } else {
      const spanAncestor = findStylableAncestor(container);
      if (spanAncestor) {
        spanAncestor.style.fontFamily = font;
      } else {
        const span = document.createElement("span");
        span.style.fontFamily = font;
        span.appendChild(document.createTextNode("\u200B"));
        range.insertNode(span);
        const newRange = document.createRange();
        newRange.setStart(span.firstChild, 1);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
      }
    }

    noteLocal.value.content = contentRef.value.innerHTML;
    return;
  }

  // Seçim var: wrap
  try {
    const span = document.createElement("span");
    span.style.fontFamily = font;
    range.surroundContents(span);
    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    newRange.collapse(false);
    sel.removeAllRanges();
    sel.addRange(newRange);
  } catch {
    const span = document.createElement("span");
    span.style.fontFamily = font;
    const frag = range.cloneContents();
    range.deleteContents();
    span.appendChild(frag);
    range.insertNode(span);
    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    newRange.collapse(false);
    sel.removeAllRanges();
    sel.addRange(newRange);
  }

  noteLocal.value.content = contentRef.value.innerHTML;
}

/*
function applyHeading(level) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;

  const tag = `h${level}`;
  const range = sel.getRangeAt(0);

  let heading;
  if (sel.isCollapsed) {
    // Caret varsa ama seçim yoksa → boş heading oluştur
    heading = document.createElement(tag);
    const zwsp = document.createTextNode("\u200B"); // zero-width space
    heading.appendChild(zwsp);
    range.insertNode(heading);

    // Caret'i heading'in içine taşı
    const newRange = document.createRange();
    newRange.setStart(zwsp, 1);
    newRange.collapse(true);
    sel.removeAllRanges();
    sel.addRange(newRange);
  } else {
    // Seçili metin varsa → heading içine al
    const frag = range.extractContents();
    heading = document.createElement(tag);
    heading.appendChild(frag);
    range.insertNode(heading);

    // Caret'i heading'in sonuna taşı
    const newRange = document.createRange();
    if (heading.lastChild.nodeType === Node.TEXT_NODE) {
      newRange.setStart(heading.lastChild, heading.lastChild.length);
    } else {
      newRange.selectNodeContents(heading);
    }
    newRange.collapse(false);
    sel.removeAllRanges();
    sel.addRange(newRange);
  }

  // Aktif heading state güncelle
  activeHeading.value = tag;
  currentHeadingElement.value = heading;

  // İçeriği senkronize et
  noteLocal.content = contentRef.value.innerHTML;
}
*/

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
    //span.style.color = activeColor.value;
    //span.style.fontFamily = fontFamily.value;
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


function moveCaretToEnd() {
  const sel = window.getSelection();
  if (!sel || !contentRef.value) return;

  const range = document.createRange();
  range.selectNodeContents(contentRef.value);
  range.collapse(false); // false => finally collapse

  sel.removeAllRanges();
  sel.addRange(range);
}

function onInput() {
  const el = contentRef.value;
  noteLocal.value.content = el.innerHTML;

  nextTick(() => {
    moveCaretToEnd();
    //scrollToCaret(el);
  });
}

watch(() => props.note, (note) => {
  noteLocal.value.title = note?.title || "";
  noteLocal.value.content = note?.content || "";

  if (contentRef.value && note?.content) {
    contentRef.value.innerHTML = note?.content;
  }
}, { immediate: true });


function handleSubmit() {
  const noteData = {
    id: props.note?.id,
    title: noteLocal.value.title.trim(),
    content: noteLocal.value.content,
  }
  if (noteData.id) {
    updateNote(noteData);
  } else {
    createNote(noteData);
  }
  emit("save", noteData);
};

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
/*
h1, h2, h3, h4, h5, h6 {
  font-size: unset;
  font-weight: inherit;
}
*/ 

:deep(.note-editor-editable .text-area h1) {
  font-size: 32px;
  font-weight: bold;
}

:deep(.note-editor-editable .text-area h2) {
  font-size: 28px;
  font-weight: bold;
}

:deep(.note-editor-editable .text-area h3) {
  font-size: 24px;
  font-weight: bold;
} 

:deep(.note-editor-editable .text-area h4) {
  font-size: 20px;
  font-weight: bold;
}

:deep(.note-editor-editable .text-area h5) {
  font-size: 18px;
  font-weight: bold;
}

:deep(.note-editor-editable .text-area h6) {
  font-size: 16px;
  font-weight: bold;
}
/*
.note-editor-editable .text-area h1 {
  font-size: 32px;
  font-weight: bold;
}

.note-editor-editable .text-area h2 {
  font-size: var(--h2-font-size) !important;
  font-weight: bold;
}

.note-editor-editable .text-area h3 {
  font-size: 20px;
  font-weight: bold;
}

.note-editor-editable .text-area h4 {
  font-size: 18px;
  font-weight: bold;
}

.note-editor-editable .text-area h5 {
  font-size: 16px;
  font-weight: bold;
}

.note-editor-editable .text-area h6 {
  font-size: 14px;
  font-weight: bold;
}
*/
.note-editor-editable .text-area h1,
.note-editor-editable .text-area h2,
.note-editor-editable .text-area h3,
.note-editor-editable .text-area h4,
.note-editor-editable .text-area h5,
.note-editor-editable .text-area h6 {
  margin: 0;
  line-height: 1.4;
  display: block;
}

.note-editor-actions {
  width: 100;
  padding: 8px 16px;
  border: 1px solid red;
  display: flex;
  gap: 20px;
  justify-content: flex-end;
}

.note-editor-header {
  resize: none;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 16px;
}

.note-editor-toolbar {
  width: 100%;
  padding: 8px 16px;
  border: 1px solid palegreen;
}

.note-editor-editable>.text-area {
  width: 100%;
  height: 40vh;
  box-sizing: border-box;
  border: 1px solid salmon;
  padding: 8px;
}
</style>