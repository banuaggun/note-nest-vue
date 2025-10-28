<script setup>
import NoteList from '../components/notes/NoteList.vue'

const selectedNote = defineModel('selectedNote')
</script>

<template>
  <NoteList 
  :showArchived="false"
    :modelValue="selectedNote"
    @update:modelValue="selectedNote = $event"
  />
</template>

<style scoped>
.note-list-panel {
  width: 100%;
  height: 100%;
}
</style>