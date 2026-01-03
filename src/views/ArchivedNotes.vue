<template>
  <section class="archived-notes">
    <div class="archived-notes-header">
      <h2>Archived Notes</h2>
    </div>

    <div class="archived-notes-area">
      <div v-if="archivedNotes.length === 0" class="empty-message">
        <EmptyState title="No archived notes" description="Archived notes will appear here"  :image="archivesNote" />
      </div>
      <div class="list-panel" v-else>
        <NoteList :notes="archivedNotes" @unarchive="handleUnarchive" @delete="handleMoveToTrash" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useNotes } from "../composables/useNotes";
import { useToast } from "../composables/useToast";
import NoteList from "../components/notes/NoteList.vue";
import EmptyState from "../components/empty-states/EmptyState.vue";
import archivesNote from "../assets/image/archiveNote.svg";

const { archivedNotes, archiveNote, deleteNote } = useNotes();
const { showToast } = useToast();

function handleUnarchive(id) {
  archiveNote(id);
  showToast("Note unarchived");
}

function handleMoveToTrash(id) {
  deleteNote(id);
  showToast("Note moved to trash");
}
</script>

<style scoped>
.archived-notes {
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  padding: 0.8rem 4px;
}

.archived-notes-header {
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

.archived-notes-area {
  width: 100%;
}

.list-panel {
  margin-top: 50px;
}

@media only screen and (min-width:760px) {
  .archived-notes-header {
    padding: 0 24px;
  }
}

@media only screen and (min-width:1026px) {
  .archived-notes {
    width: 100%;
    max-width: 100%;
  }

  .archived-notes-header {
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
