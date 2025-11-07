<template>
  <section class="all-notes">
    <div class="header">
      <h2>All Notes</h2>
      <button @click="startCreate">+ Yeni Not</button>
    </div>

    <div class="main-content">
      <div class="list-panel">
        <NoteList
          :notes="activeNotes"
          @edit="startEdit"
          @delete="deleteNote"
          @archive="archiveNote"
        />
      </div>
      <div class="editor-panel" v-if="isEditorOpen">
        <NoteEditor
          :note="editingNote"
          @save="handleSave"
          @cancel="closeEditor"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useNotes } from '../composables/useNotes'
import NoteList from '../components/notes/NoteList.vue'
import NoteEditor from '../components/note-editor/NoteEditor.vue'

const {
  activeNotes,
  createNote,
  updateNote,
  archiveNote,
  deleteNote
} = useNotes()

const isEditorOpen = ref(false)
const editingNote = ref(null)

function startCreate() {
  editingNote.value = null
  isEditorOpen.value = true
}

function startEdit(note) {
  editingNote.value = note
  isEditorOpen.value = true
}

function closeEditor() {
  editingNote.value = null
  isEditorOpen.value = false
}

function handleSave(noteData) {
  if (noteData.id) {
    updateNote(noteData)
  } else {
    createNote(noteData)
  }
  closeEditor()
}
</script>

<style scoped>
.all-notes {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
} 
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.main-content{
  display:flex;
  gap:2rem;
} 

.list-panel {
  flex:1;
}

.editor-panel {
  flex: 2; 
  /*max-width: 400px;*/
  border-left: 1px solid #ccc;
  padding-left: 1rem;
}
</style>
