<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useHeadingMode } from '../../composables/functions/useHeadingMode'
import { useTextFormatting } from '../../composables/functions/useTextFormatting'
import { useSpellcheck } from '../../composables/functions/useSpellcheck'
import { useEditorContent } from '../../composables/based/useEditorContent'
import { useEditorFormatting } from '../../composables/based/useEditorFormatting'
import { activeColor } from '../../composables/functions/useTextColor' 
//import { activeListType } from '../../composables/functions/useTextFormatting'

const editable = ref(null)
const currentHeadingElement = ref(null)
const selectedNote = defineModel()

const { activeHeading } = useHeadingMode()
const { isBold, isItalic, isUnderline } = useTextFormatting()
const { isSpellcheckEnabled } = useSpellcheck()

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
    resetCurrentElement() // ✅ stil değiştiğinde yeni element için sıfırla
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

onMounted(() => {
  nextTick(() => {
    if (selectedNote.value?.content && editable.value) {
      editable.value.innerHTML = formatContent(selectedNote.value)
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
  resetCurrentElement, 
  activeListType
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
  white-space: pre-wrap;
  word-break: normal;
}
.editable h1,
.editable h2,
.editable h3,
.editable h4,
.editable h5,
.editable h6 {
  display: block;
  width: 100%;
  white-space: normal;
  word-break: break-word;
  margin: 0 0 8px 0;
  font-weight: bold;
}
</style>