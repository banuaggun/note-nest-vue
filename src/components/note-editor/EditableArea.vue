<script setup>
import { watch, onMounted, nextTick } from 'vue'
import { useHeadingMode } from '../../composables/functions/useHeadingMode'
import { useTextFormatting } from '../../composables/functions/useTextFormatting'
import { useSpellcheck } from '../../composables/functions/useSpellcheck'
import { useEditorContent } from '../../composables/based/useEditorContent'
import { useEditorFormatting } from '../../composables/based/useEditorFormatting'
import { activeColor } from '../../composables/functions/useTextColor'
import { editable, currentHeadingElement } from '../../composables/based/useEditorState'
import { useFontFamily } from '../../composables/functions/useFontFamily'

const selectedNote = defineModel()

const { activeHeading } = useHeadingMode()
const { isBold, isItalic, isUnderline } = useTextFormatting()
const { isSpellcheckEnabled } = useSpellcheck()

const { fontFamily } = useFontFamily()

const { formatContent, onContentInput } = useEditorContent(editable, selectedNote)
const {
  onBeforeInput,
  applyStyleToSelection,
  setCaretToEnd,
  applyListToSelection,
  resetCurrentElement,
  activeListType,
} = useEditorFormatting({
  editable,
  selectedNote,
  activeHeading,
  isBold,
  isItalic,
  isUnderline,
  currentHeadingElement,
  onContentInput
})

function applyColorToSelection(color) {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  const range = selection.getRangeAt(0)

  if (selection.isCollapsed) {
    activeColor.value = color
    resetCurrentElement()
    return
  }

  const selectedContent = range.cloneContents()
  const span = document.createElement('span')
  span.appendChild(selectedContent)
  span.style.color = color

  range.deleteContents()
  range.insertNode(span)

  const newRange = document.createRange()
  newRange.selectNodeContents(span)
  newRange.collapse(false)
  selection.removeAllRanges()
  selection.addRange(newRange)

  onContentInput({ target: editable.value })
}

function applyFontToSelection(font) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);

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

  onContentInput({ target: editable.value });
}


onMounted(() => {
  nextTick(() => {
    if (selectedNote.value?.content && editable.value) {
      editable.value.innerHTML = formatContent(selectedNote.value)
      document.addEventListener("selectionchange", saveSelection)
    }
  })
})

watch(
  () => selectedNote.value,
  (newNote) => {
    nextTick(() => {
      if (newNote?.content && editable.value) {
        editable.value.innerHTML = formatContent(newNote)
      }
    })
  },
  { immediate: true }
)

defineExpose({
  applyStyleToSelection,
  applyColorToSelection,
  applyListToSelection, 
  applyFontToSelection, 
  resetCurrentElement,
  activeListType
})

watch(fontFamily, (newFont) => {
  console.log("Yeni font seçildi:", newFont)
})

</script>

<template>
  <div
    ref="editable"
    contenteditable="true"
    :spellcheck="isSpellcheckEnabled"
    class="editable"
    @input="onContentInput"
    @beforeinput="onBeforeInput"
    @focus="setCaretToEnd" 
  ></div>
</template>

<style scoped>
.editable {
  min-height: 400px;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
}
.editable a {
  color: #0077cc;
  text-decoration: underline;
}
</style>