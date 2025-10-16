<script setup>
import { ref, computed, onMounted, watch } from "vue"
import Toolbar from "../toolbar/Toolbar.vue"
import EditableArea from "./EditableArea.vue"
import SaveCancelButtons from "../tools/SaveCancelButtons.vue"
import { useNotes } from "../../composables/useNotes"
import { useTextFormatting } from "../../composables/functions/useTextFormatting"
import { useTextColor } from "../../composables/functions/useTextColor"
import { toggleListType } from '../../composables/functions/useTextFormatting'
import { fontFamily, setFontFamily } from "../../composables/functions/useFontFamily"

import { useLocalNoteStorage } from '../../composables/useLocalNoteStorage'

const selectedNote = defineModel()
const { saveNoteToStorage, cancelNoteEdit } = useLocalNoteStorage(selectedNote)

const { notes } = useNotes()
const { isBold, isItalic, isUnderline } = useTextFormatting()
const { setColor } = useTextColor()
const editableRef = ref(null)

const activeListType = computed(() => editableRef.value?.activeListType || null)

function updateNote(updatedNote) {
  selectedNote.value = updatedNote
}

function saveNote() {
  const index = notes.value.findIndex((n) => n.id === selectedNote.value.id)
  if (index !== -1) {
    notes.value[index] = { ...selectedNote.value }
  }
  localStorage.setItem(`note-${selectedNote.value.id}`, JSON.stringify(selectedNote.value))
  alert("Not kaydedildi!")
}


function cancelEdit() {
  const stored = localStorage.getItem(`note-${selectedNote.value.id}`)
  if (stored) {
    selectedNote.value = JSON.parse(stored)
    alert("Değişiklikler geri alındı.")
  } else {
    alert("Geri alınacak bir kayıt bulunamadı.")
  }
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