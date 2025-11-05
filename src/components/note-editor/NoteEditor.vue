<script setup>
import { ref, computed, onMounted, watch } from "vue"
import Toolbar from "../toolbar/Toolbar.vue"
import EditableArea from "./EditableArea.vue"
import SaveCancelButtons from "../toolbar/SaveCancelButtons.vue"
import { useNotes } from "../../composables/useNotes"
import { useTextFormatting } from "../../composables/functions/useTextFormatting"
import { useTextColor } from "../../composables/functions/useTextColor"
import { toggleListType } from '../../composables/functions/useTextFormatting'
import { fontFamily, setFontFamily } from "../../composables/functions/useFontFamily"

import NotificationModal from "./NotificationModal.vue"

const selectedNote = defineModel()
const { notes } = useNotes()
const { isBold, isItalic, isUnderline } = useTextFormatting()
const { setColor } = useTextColor()
const editableRef = ref(null)

const modalVisible = ref(false)
const modalMessage = ref('')

const activeListType = computed(() => editableRef.value?.activeListType || null)

function updateNote(updatedNote) {
  selectedNote.value = updatedNote
}

function isNoteChanged() {
  const stored = localStorage.getItem(`note-${selectedNote.value.id}`)
  if (!stored) return true
  const storedNote = JSON.parse(stored)
  return JSON.stringify(storedNote) !== JSON.stringify(selectedNote.value)
}


function saveNoteToStorage() {
  if (!isNoteChanged()) return
  localStorage.setItem(`note-${selectedNote.value.id}`, JSON.stringify(selectedNote.value)) 
    // Notes dizisini güncelle
  updateNote(selectedNote.value.id, {
    title: selectedNote.value.title,
    content: selectedNote.value.content
  })
  modalMessage.value = 'Note saved!'
  modalVisible.value = true
}

function cancelNoteEdit() {
  if (!isNoteChanged()) return
  const stored = localStorage.getItem(`note-${selectedNote.value.id}`)
  if (stored) {
    selectedNote.value = JSON.parse(stored)
    modalMessage.value = 'Changes reverted.'
  } else {
    modalMessage.value = 'No records found to retrieve.'
  }
  modalVisible.value = true
}

function handleApplyStyle(styleType) {
  editableRef.value?.resetCurrentElement()
  editableRef.value?.applyStyleToSelection(styleType)
}

function handleApplyColor(color) {
  setColor(color)
  editableRef.value?.resetCurrentElement()
  editableRef.value?.applyColorToSelection(color)
}

function handleApplyFont(font) {
  setFontFamily(font)
  editableRef.value?.resetCurrentElement()
  editableRef.value?.applyFontToSelection(font)
}

function handleApplyList(type) {
  toggleListType(type)
  editableRef.value?.resetCurrentElement()
}

onMounted(() => {
  if (selectedNote.value?.id) {
    const stored = localStorage.getItem(`note-${selectedNote.value.id}`)
    if (stored) {
      selectedNote.value = JSON.parse(stored)
    }
  }
})

watch(() => selectedNote.value?.id, (newId) => {
  if (newId) {
    const stored = localStorage.getItem(`note-${newId}`)
    if (stored) {
      selectedNote.value = JSON.parse(stored)
    }
  }
})
</script>

<template>
  <div v-if="selectedNote" class="note-editor">
    <Toolbar
      :note="selectedNote"
      :isBold="isBold"
      :isItalic="isItalic"
      :isUnderline="isUnderline"
      :activeListType="activeListType"
      @update="updateNote"
      @applyStyle="handleApplyStyle"
      @applyColor="handleApplyColor"
      @applyList="handleApplyList"
      @applyFont="handleApplyFont"
    />
    <EditableArea ref="editableRef" v-model="selectedNote" />
    <SaveCancelButtons :onSave="saveNoteToStorage" :onCancel="cancelNoteEdit" />
    <NotificationModal :visible="modalVisible" :message="modalMessage" @close="modalVisible = false" />
  </div>
  <div v-else class="note-editor-empty">
    <p>Bir not seçin...</p>
  </div>
</template>

<style scoped>
.note-editor {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid green;
}
</style>
