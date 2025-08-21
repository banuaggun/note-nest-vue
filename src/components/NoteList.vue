<template>
  <div class="note-list-area" v-if="allNotes.length">
    <section class="note-list">
      <SearchBar />
      <NoteItem
        v-for="note in allNotes"
        :key="note.id"
        :note="note"
        :active="activeNote && activeNote.id === note.id"
      />
    </section>

    <!--
    <div class="no-notes-message">
      no notes
    </div>
  -->
  </div>
</template>

<script setup>
import NoteItem from "./NoteItem.vue";
import SearchBar from "./SearchBar.vue";
import useNotes from "../composables/useNotes.js";
import { onMounted } from "vue";

const { allNotes, activeNote, loadNotesFromJson } = useNotes();

onMounted(() => {
  loadNotesFromJson();
});
</script>

<style scoped>
.note-list-area {
  display: flex;
  flex: 1;
  width: 320px;
  height: 100vh;
  margin-right: 24px;
  margin-top: 12px;
  border: 1px solid red;
}
.note-list {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
}

@media (min-width: 1200px) {
  .note-list {
    max-width: 800px;
    border: 1px solid green;
  }
}
</style>
