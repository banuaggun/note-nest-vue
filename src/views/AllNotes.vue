<template>
  <section class="all-notes">
    <div class="header">
      <h2>All Notes</h2>
      <button @click="startCreate">Create a New Note</button>
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
        v-if="isEditorOpen"
          :note="editingNote"
          @save="handleSave"
          @cancel="closeEditor"
        /> 
        <div v-else class="placeholder">
          <p>Bir not seçin ya da yeni bir not oluşturun. Burada düzenleme yapabilirsiniz.</p>
        </div>
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
  margin: 2rem 0;
  padding: 0rem;
} 
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0rem;
  margin-right:2rem;
}
.main-content{
  display:flex;
  gap:0.5rem;
} 

.list-panel {
  flex:1; 
  height:80vh; 
  overflow-y: auto;
  padding-right:0.5rem;
}

.editor-panel {
  flex: 2.5; 
  /*max-width: 400px;*/
  border-left: 1px solid #ccc;
  padding-left: 1rem;
} 
.placeholder {
  display: flex;
  justify-content: center;
  color: #666;
  font-style: italic;
}
</style>
