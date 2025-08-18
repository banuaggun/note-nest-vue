<template>
  <section class="note-list">
    <NoteItem v-for="note in allNotes" :key="note.id" :note="note" />
  </section>
</template>

<script setup>
import NoteItem from './NoteItem.vue'
import useNotes from '../composables/useNotes.js'
import { onMounted } from 'vue'

const { allNotes, loadNotesFromJson } = useNotes()

onMounted(() => {
  loadNotesFromJson()
})
</script>

<style scoped>
.note-list {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>
