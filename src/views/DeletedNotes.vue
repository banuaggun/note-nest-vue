<template>
  <section class="deleted-notes">
    <div class="header">
      <h2>Çöp Kutusu</h2>
    </div>

    <NoteList
      :notes="deletedNotes"
      @restore="restoreNote"
      @delete="deleteNotePermanently"
    />
  </section>
</template>

<script setup>
import { useNotes } from '../composables/useNotes'
import NoteList from '../components/notes/NoteList.vue'

const { deletedNotes, archiveNote, deleteNotePermanently, restoreNote } = useNotes()

/*
function restoreNote(id) {
  archiveNote(id) // status: 'deleted' → 'archived' → 'active'
}
  */
</script>

<style scoped>
.deleted-notes {
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
</style>
