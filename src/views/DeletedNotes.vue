<template>
  <section class="deleted-notes">
    <div class="deleted-notes-header">
      <h2>Deleted Notes</h2>
    </div>

    <div class="deleted-notes-area">
      <NoteList
        :notes="deletedNotes"
        @restore="handleRestore"
        @delete="handleDeletePermanent"
      />
    </div>
  </section>
</template>

<script setup>
import { useNotes } from '../composables/useNotes'
import { useToast } from '../composables/useToast'
import NoteList from '../components/notes/NoteList.vue'

const { deletedNotes, deleteNotePermanently, restoreNote } = useNotes()
const { showToast } = useToast()

function handleRestore(id) {
  restoreNote(id)
  showToast("Note restored")
}

function handleDeletePermanent(id) {
  deleteNotePermanently(id)
  showToast("Note permanently deleted")
}
</script>

<style scoped>
.deleted-notes {
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height:auto
}

.deleted-notes-header{
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

.deleted-notes-area{
  margin-top: 100px; 
}
</style>
