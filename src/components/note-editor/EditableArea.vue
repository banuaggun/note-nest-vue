<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useHeadingMode } from '../../composables/useHeadingMode'
import { useTextFormatting } from '../../composables/useTextFormatting'
import { useSpellcheck } from '../../composables/useSpellcheck'
import { useEditorContent } from '../../composables/useEditorContent'
import { useEditorFormatting } from '../../composables/useEditorFormatting'

const editable = ref(null)
const currentHeadingElement = ref(null)
const selectedNote = defineModel()

const { activeHeading } = useHeadingMode()
const { isBold, isItalic, isUnderline } = useTextFormatting()
const { isSpellcheckEnabled } = useSpellcheck()

const { formatContent, onContentInput } = useEditorContent(editable, selectedNote)
const { onBeforeInput, applyStyleToSelection, setCaretToEnd } = useEditorFormatting({
  editable,
  selectedNote,
  activeHeading,
  isBold,
  isItalic,
  isUnderline,
  currentHeadingElement,
  onContentInput
})

onMounted(() => {
  nextTick(() => {
    if (selectedNote.value && editable.value) {
      editable.value.innerHTML = formatContent(selectedNote.value)
    }
  })
})

watch(
  () => selectedNote.value,
  (newNote) => {
    nextTick(() => {
      if (editable.value && newNote) {
        editable.value.innerHTML = formatContent(newNote)
      }
    })
  },
  { immediate: true }
)

defineExpose({
  applyStyleToSelection
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
}
</style>
