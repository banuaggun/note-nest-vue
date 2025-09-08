<template>
  <div v-if="selectedNote" class="note-editor">
    <Toolbar :note="selectedNote" @update="updateNote" />

    <div
      ref="editable"
      contenteditable="true"
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

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useNotes } from '../../composables/useNotes'
import Toolbar from '../toolbar/Toolbar.vue'
import { useHeadingMode } from '../../composables/useHeadingMode'

const { activeHeading } = useHeadingMode()
const currentHeadingElement = ref(null)

const { notes } = useNotes()
const selectedNote = defineModel()
const editorContent = ref('')
const editable = ref(null)

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
  if (!activeHeading.value || event.inputType !== 'insertText') return

  const text = event.data
  const selection = window.getSelection()
  const range = selection.getRangeAt(0)

  if (
    currentHeadingElement.value &&
    currentHeadingElement.value.tagName.toLowerCase() === activeHeading.value
  ) {
    currentHeadingElement.value.textContent += text

    const newRange = document.createRange()
    newRange.selectNodeContents(currentHeadingElement.value)
    newRange.collapse(false)
    selection.removeAllRanges()
    selection.addRange(newRange)

    event.preventDefault()
    onContentInput({ target: editable.value })
    return
  }

  const headingEl = document.createElement(activeHeading.value)
  headingEl.textContent = text
  currentHeadingElement.value = headingEl

  range.deleteContents()
  range.insertNode(headingEl)

  const newRange = document.createRange()
  newRange.selectNodeContents(headingEl)
  newRange.collapse(false)
  selection.removeAllRanges()
  selection.addRange(newRange)

  event.preventDefault()
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

<style scoped>
.editable {
  min-height: 400px;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
  white-space: pre-wrap;
}

.editable h1,
.editable h2,
.editable h3,
.editable h4,
.editable h5,
.editable h6 {
  display: inline;
  margin: 0;
  padding: 0;
  font-weight: bold;
}
</style>