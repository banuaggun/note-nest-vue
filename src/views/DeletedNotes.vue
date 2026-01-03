<template>
  <section class="deleted-notes">
    <div class="deleted-notes-header">
      <h2>Deleted Notes</h2>
    </div>

    <div class="deleted-notes-area">
      <div v-if="deletedNotes.length === 0" class="empty-message">
        <EmptyState title="No deleted notes" description="Deleted notes will appear here" :image="deleteNote" />
      </div>
      <div class="list-panel" v-else>
        <NoteList :notes="deletedNotes" @restore="handleRestore" @delete="handleDeletePermanent" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useNotes } from '../composables/useNotes'
import { useToast } from '../composables/useToast'
import NoteList from '../components/notes/NoteList.vue'
import EmptyState from '../components/empty-states/EmptyState.vue'
import deleteNote from "../assets/image/deleteNote.svg"

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
  align-items: flex-start;
  height: auto;
  padding: 0.8rem 4px;
}

.deleted-notes-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: var(--bg-color);
  color: var(--text-color);
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-top: var(--app-header-height);
}

.deleted-notes-area {
  width: 100%;
}

.list-panel {
  margin-top: 50px;
}

@media only screen and (min-width:760px) {
  .deleted-notes-header {
    padding: 0 24px;
  }
}

@media only screen and (min-width:1026px) {
  .deleted-notes {
    width: 100%;
    max-width: 100%;
  }

  .deleted-notes-header {
    padding: 0 48px;
  }

  :deep(.note-list-card) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    padding: 0.8rem 3rem;
  }

  :deep(.note-item) {
    width: 100%;
  }
}
</style>
