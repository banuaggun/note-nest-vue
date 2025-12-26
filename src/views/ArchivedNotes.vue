<template>
  <section class="archived-notes">
    <div class="archived-notes-header">
      <h2>Archived Notes</h2>
    </div>

    <div class="archived-notes-area">
      <div v-if="archivedNotes.length === 0" class="empty-message">
        <EmptyState
          title="No archived notes"
          description="Archived notes will appear here"
          :image="image"
        />
      </div>
      <div class="list-panel" v-else>
        <NoteList
          :notes="archivedNotes"
          @unarchive="handleUnarchive"
          @delete="handleMoveToTrash"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useNotes } from "../composables/useNotes";
import { useToast } from "../composables/useToast";
import NoteList from "../components/notes/NoteList.vue";
import EmptyState from "../components/empty-states/EmptyState.vue";
import image from "../assets/image/logo-icon.svg";

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
}

.archived-notes-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: var(--bg-color);
  display: flex;
  align-items: center;
  padding: 0 12px;
  margin-top: var(--app-header-height);
}

.archived-notes-area {
  width:100%;
} 

.list-panel{
  margin-top:50px;
} 

@media only screen and (min-width:760px){
   .archived-notes-header{
    padding:0 48px;
  }
}
</style>
