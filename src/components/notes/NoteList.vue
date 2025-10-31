<template>
  <div class="note-list">
    <NoteItem
      v-for="note in filteredNotes"
      :key="note.id"
      :note="note"
      @select="selectNote"
      @archive="handleArchive"
      @unarchive="handleUnarchive"
      @delete="handleDelete"
      @restore="handleRestore"
    />

    <NotificationModal
      :visible="modalVisible"
      :message="modalMessage"
      @close="modalVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useNotes } from "../../composables/useNotes"
import NoteItem from "./NoteItem.vue"
import NotificationModal from "../note-editor/NotificationModal.vue"

const props = defineProps({
  showArchived: Boolean,
  showDeleted: Boolean
})

const { notes, updateNote, archiveNote, unarchiveNote, deleteNote, restoreNote } = useNotes()

const selectedNote = defineModel()
const modalMessage = ref("")
const modalVisible = ref(false)

function showModal(message) {
  modalMessage.value = message
  modalVisible.value = true
}

function handleArchive(id) {
  updateNote(id, { archived: true })
  showModal("Not arşivlendi!")
}

function handleUnarchive(id) {
  updateNote(id, {archived:false})
  showModal("Arşivden çıkarıldı!")
}

function handleDelete(id) {
  updateNote(id, {deleted:true})
  showModal("Not silindi!")
}

function handleRestore(id) {
  updateNote(id, {deleted: false, archived: false})
  showModal("Not geri alındı!")
}

const filteredNotes = computed(() =>
  notes.value.filter(note =>
    note.archived === props.showArchived &&
    note.deleted === props.showDeleted
  )
)

function selectNote(note) {
  selectedNote.value = note
}
</script>