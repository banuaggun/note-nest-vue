<template>
  <section class="archived-notes">
    <div class="header">
      <h2>Arşivlenmiş Notlar</h2>
    </div>

    <NoteList
      :notes="archivedNotes"
      @unarchive="unarchiveNote"
      @delete="deleteNotePermanently"
    />
  </section>
</template>

<script setup>
import { useNotes } from '../composables/useNotes'
import NoteList from '../components/notes/NoteList.vue'

const { archivedNotes, archiveNote, deleteNotePermanently } = useNotes()

function unarchiveNote(id) {
  archiveNote(id) // status: 'archived' → 'active'
}
</script>

<style scoped>
.archived-notes {
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
