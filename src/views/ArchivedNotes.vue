<template>
  <section class="archived-notes">
    <div class="archived-notes-header">
      <h2>Archived Notes</h2>
    </div>

    <div class="archived-notes-area">
      <NoteList
        :notes="archivedNotes"
        @unarchive="handleUnarchive"
        @delete="handleMoveToTrash"
      />
    </div>
  </section>
</template>

<script setup>
import { useNotes } from '../composables/useNotes'
import { useToast } from '../composables/useToast'
import NoteList from '../components/notes/NoteList.vue'

const { archivedNotes, archiveNote, deleteNote } = useNotes()
const { showToast } = useToast()

function handleUnarchive(id) {
  archiveNote(id)
  showToast("Note unarchived")
}


function handleMoveToTrash(id) {
  deleteNote(id)
  showToast("Note moved to trash")
}
</script>

<style scoped>
.archived-notes {
  max-width: 1200px;
  display:flex;
  flex-direction: column;
  align-items: center;
  height: auto;
}

.archived-notes-header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: white;
  border-bottom: 1px solid yellowgreen;
  display: flex;
  align-items: center;
  padding: 0 12px;
  margin-top:40px;
}

.archived-notes-area{
   margin-top: 100px; 
}
</style>
