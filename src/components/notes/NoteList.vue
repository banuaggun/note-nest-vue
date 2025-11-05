<template>
  <div class="note-list">
    <CreateNewNote :onCreate="createNote" @save="createNote" />
    <NoteItem
      v-for="note in filteredNotes"
      :key="note.id"
      :note="note"
      @select="selectNote"
      @archive="handleArchive"
      @unarchive="handleUnarchive"
      @delete="handleDelete"
      @restore="handleRestore" 
      @save="createNote"
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
import CreateNewNote from "../note-editor/CreateNewNote.vue"

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


function createNote() {
  const id = Math.random().toString(36).substring(2, 9); 
 

  const newNote = {
    id,
    title: ref(''),
    content: ref(''),
    archived: false,
    deleted: false
  }

  notes.value.push(newNote) 
    localStorage.setItem('notes', JSON.stringify(notes.value))
  setActiveNote(id) 
  
}

function setActiveNote(id) {
  const note = notes.value.find(n => n.id === id)
  //if (!note) return

  selectedNote.value = {
    title: titleEditable.value?.innerText || note.title,
    content: contentEditable.value?.innerHTML || note.content, 
    ...note
  }
}

const title = ref('')
const content = ref('')
function save() {
  emit('save', {
    title: title.value,
    content: content.value
  })
}


function selectNote(note) {
  selectedNote.value = note
}
</script>