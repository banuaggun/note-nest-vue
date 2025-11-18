<template>
  <section class="all-notes">
    <div class="header">
      <h2>All Notes</h2>
      <button @click="startCreate">Create a New Note</button>
    </div>

    <div class="main-content">
      <!-- Liste sadece editor kapalıysa -->
      <div 
        class="list-panel" 
        v-if="!isEditorOpen || !isMobile"
      >
        <NoteList
          :notes="activeNotes"
          @edit="startEdit"
          @delete="deleteNote"
          @archive="archiveNote"
        />
      </div>

      <!-- Editor sadece editor açıksa -->
      <div 
        class="editor-panel" 
        v-if="isEditorOpen"
      >
        <NoteEditor 
          :note="editingNote"
          @save="handleSave"
          @cancel="closeEditor"
        /> 
        
      </div>
      <div v-if="!isEditorOpen && !isMobile" class="placeholder">
          <p>Bir not seçin ya da yeni bir not oluşturun. Burada düzenleme yapabilirsiniz.</p>
        </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
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
const isMobile = ref(window.innerWidth <= 641) // başlangıç değeri

function updateIsMobile() {
  isMobile.value = window.innerWidth <= 641
}

onMounted(() => {
  window.addEventListener('resize', updateIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})

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
  width:100%;
  margin: 0;
  padding: 0rem;
  border:1px solid red;
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
  gap:1rem;
  width:100%;
} 

.list-panel {
  width:30%;
  height:80vh; 
  overflow-y: auto;
}

.editor-panel {
  width:70%;
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

@media only screen and (max-width:641px){
  .main-content{
    display:flex;
    flex-direction: column;
  }
  .list-panel{
    width:100%;
  }
  .editor-panel{
    width:100%;
  }
}

</style>
