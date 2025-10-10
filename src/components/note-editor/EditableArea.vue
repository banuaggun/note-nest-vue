<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import { useHeadingMode } from "../../composables/functions/useHeadingMode";
import { useTextFormatting } from "../../composables/functions/useTextFormatting";
import { useSpellcheck } from "../../composables/functions/useSpellcheck";
import { useEditorFormatting } from "../../composables/based/useEditorFormatting";
import { activeColor } from "../../composables/functions/useTextColor";
import { currentHeadingElement } from "../../composables/based/useEditorState";
import { useFontFamily } from "../../composables/functions/useFontFamily";

const selectedNote = defineModel();

const titleEditable = ref(null);
const contentEditable = ref(null);

const { activeHeading } = useHeadingMode();
const { isBold, isItalic, isUnderline } = useTextFormatting();
const { isSpellcheckEnabled } = useSpellcheck();
const { fontFamily } = useFontFamily();

const {
  onBeforeInput,
  applyStyleToSelection,
  setCaretToEnd,
  applyListToSelection,
  resetCurrentElement,
  activeListType,
} = useEditorFormatting({
  editable: contentEditable,
  selectedNote,
  activeHeading,
  isBold,
  isItalic,
  isUnderline,
  currentHeadingElement,
  onContentInput,
});

function onTitleInput() {
  selectedNote.value.title = titleEditable.value.innerText;
}

function onContentInput() {
  selectedNote.value.content = contentEditable.value.innerHTML;
}

function applyColorToSelection(color) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);

  if (selection.isCollapsed) {
    activeColor.value = color;
    resetCurrentElement();
    return;
  }

  const selectedContent = range.cloneContents();
  const span = document.createElement("span");
  span.appendChild(selectedContent);
  span.style.color = color;

  range.deleteContents();
  range.insertNode(span);

  const newRange = document.createRange();
  newRange.selectNodeContents(span);
  newRange.collapse(false);
  selection.removeAllRanges();
  selection.addRange(newRange);

  onContentInput();
}

function applyFontToSelection(font) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const anchorNode = selection.anchorNode;
  const isInTitle = titleEditable.value.contains(anchorNode);
  const targetEditable = isInTitle ? titleEditable : contentEditable;

  if (selection.isCollapsed) {
    fontFamily.value = font;

    const span = document.createElement("span");
    span.style.fontFamily = font;
    span.appendChild(document.createTextNode("\u200B"));

    range.insertNode(span);

    const newRange = document.createRange();
    newRange.setStart(span, 1);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);

    resetCurrentElement();
    return;
  }

  const selectedContent = range.cloneContents();
  const span = document.createElement("span");
  span.appendChild(selectedContent);
  span.style.fontFamily = font;

  range.deleteContents();
  range.insertNode(span);

  const newRange = document.createRange();
  newRange.selectNodeContents(span);
  newRange.collapse(false);
  selection.removeAllRanges();
  selection.addRange(newRange);

  // Güncelleme tetikleyelim
  if (isInTitle) {
    onTitleInput();
  } else {
    onContentInput();
  }
}



onMounted(() => {
  nextTick(() => {
    if (selectedNote.value) {
      titleEditable.value.innerText = selectedNote.value.title;
      contentEditable.value.innerHTML = selectedNote.value.content;
      document.addEventListener("selectionchange", saveSelection);
    }
  });
});

watch(
  () => selectedNote.value,
  (newNote) => {
    nextTick(() => {
      if (newNote) {
        titleEditable.value.innerText = newNote.title;
        contentEditable.value.innerHTML = newNote.content;
      }
    });
  },
  { immediate: true }
);

defineExpose({
  applyStyleToSelection,
  applyColorToSelection,
  applyListToSelection,
  applyFontToSelection,
  resetCurrentElement,
  activeListType,
});
</script>

<template>
  <div class="editable-wrapper">
    <div
      ref="titleEditable"
      contenteditable="true"
      class="editable-title"
      @input="onTitleInput"
    ></div>

    <div
      ref="contentEditable"
      contenteditable="true"
      :spellcheck="isSpellcheckEnabled"
      class="editable-content"
      @input="onContentInput"
      @beforeinput="onBeforeInput"
      @focus="setCaretToEnd"
    ></div>
  </div>
</template>

<style scoped>
.editable-wrapper {
  border: 1px solid #ccc;
  padding: 10px;
}
.editable-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
}
.editable-content {
  min-height: 300px;
  font-size: 16px;
}
</style>