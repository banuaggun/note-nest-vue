<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useNotes } from '../../composables/useNotes'
import Toolbar from '../toolbar/Toolbar.vue'
import { useHeadingMode } from '../../composables/useHeadingMode'
import { useTextFormatting } from '../../composables/useTextFormatting'
import { useSpellcheck } from '../../composables/useSpellcheck'

const { activeHeading } = useHeadingMode()
const { isBold, isItalic, isUnderline } = useTextFormatting()
const { isSpellcheckEnabled } = useSpellcheck()

const currentHeadingElement = ref(null)
const editable = ref(null)
const editorContent = ref('')
const selectedNote = defineModel()
const { notes } = useNotes()

function updateNote(updatedNote) {
  selectedNote.value = updatedNote
  editorContent.value = updatedNote.content
}

function saveNote() {
  const index = notes.value.findIndex(n => n.id === selectedNote.value.id)
  if (index !== -1) {
    notes.value[index] = { ...selectedNote.value }
  }
}

function onContentInput(event) {
  const html = event.target.innerHTML
  const titleMatch = html.match(/<h1>(.*?)<\/h1>/)

  if (titleMatch) {
    selectedNote.value.title = titleMatch[1]
    selectedNote.value.content = html.replace(titleMatch[0], '').trim()
  } else {
    selectedNote.value.content = html.trim()
  }
}

function onBeforeInput(event) {
  if (event.inputType !== 'insertText') return

  const text = event.data
  const selection = window.getSelection()
  const range = selection.getRangeAt(0)

  let targetElement

  // Eğer heading aktifse ve zaten bir heading elementi varsa
  if (
    activeHeading.value &&
    currentHeadingElement.value &&
    currentHeadingElement.value.tagName.toLowerCase() === activeHeading.value
  ) {
    targetElement = currentHeadingElement.value
    targetElement.textContent += text
  } else {
    // Yeni heading veya span oluştur
    targetElement = document.createElement(activeHeading.value || 'span')
    targetElement.textContent = text

    // Stil uygula
    if (isBold.value) targetElement.style.fontWeight = 'bold'
    if (isItalic.value) targetElement.style.fontStyle = 'italic'
    if (isUnderline.value) targetElement.style.textDecoration = 'underline'

    // DOM'a ekle
    range.deleteContents()
    range.insertNode(targetElement)

    // Heading ise referansı sakla
    if (activeHeading.value) {
      currentHeadingElement.value = targetElement
    }
  }

  // Caret'i sona taşı
  const newRange = document.createRange()
  newRange.selectNodeContents(targetElement)
  newRange.collapse(false)
  selection.removeAllRanges()
  selection.addRange(newRange)

  event.preventDefault()
  onContentInput({ target: editable.value })
}




function applyStyleToSelection(styleType) {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  const range = selection.getRangeAt(0)

  if (selection.isCollapsed) {
    // Seçim yoksa caret konumuna stil uygulamak için bayrakları güncelle
    if (styleType === 'bold') isBold.value = !isBold.value
    if (styleType === 'italic') isItalic.value = !isItalic.value
    if (styleType === 'underline') isUnderline.value = !isUnderline.value
    return
  }

  const selectedContent = range.cloneContents()
  const span = document.createElement('span')
  span.appendChild(selectedContent)

  if (styleType === 'bold') span.style.fontWeight = 'bold'
  if (styleType === 'italic') span.style.fontStyle = 'italic'
  if (styleType === 'underline') span.style.textDecoration = 'underline'

  range.deleteContents()
  range.insertNode(span)

  const newRange = document.createRange()
  newRange.selectNodeContents(span)
  newRange.collapse(false)
  selection.removeAllRanges()
  selection.addRange(newRange)

  onContentInput({ target: editable.value })
}



function setCaretToEnd() {
  const el = editable.value
  if (!el) return
  const range = document.createRange()
  const sel = window.getSelection()
  range.selectNodeContents(el)
  range.collapse(false)
  sel.removeAllRanges()
  sel.addRange(range)
}

function formatContent(note) {
  const titleHTML = `<h1>${note.title || ''}</h1>`
  const contentHTML = note.content?.replace(/\n/g, '<br/>') || ''
  return `${titleHTML}\n${contentHTML}`
}

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
</script>

<template>
  <div v-if="selectedNote" class="note-editor">
    <Toolbar
  :note="selectedNote"
  :isBold="isBold"
  :isItalic="isItalic"
  :isUnderline="isUnderline"
  @update="updateNote"
  @applyStyle="applyStyleToSelection"
/>


    <div
      ref="editable"
      contenteditable="true"
      :spellcheck="isSpellcheckEnabled"
      class="editable"
      @input="onContentInput"
      @beforeinput="onBeforeInput"
      @focus="setCaretToEnd"
    ></div>

    <button @click="saveNote">Kaydet</button>
  </div>
  <div v-else class="note-editor-empty">
    <p>Bir not seçin...</p>
  </div>
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