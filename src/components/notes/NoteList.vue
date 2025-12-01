<template>
  <div class="note-list">
<div class="note-list-card">
    <NoteItem
      v-for="note in notes"
      :key="note.id"
      :note="note"
      @edit="(note) => $emit('edit', note)"
      @delete="(id) => $emit('delete', id)"
      @archive="(id) => $emit('archive', id)" 
      @unarchive="(id) => $emit('unarchive', id)" 
      @restore="(id) => $emit('restore', id)"
    />

  </div>
  </div>
  
</template>

<script setup>
import NoteItem from "./NoteItem.vue"

defineProps({
  notes: {
    type: Array,
    required: true
  }
})

defineEmits(['edit', 'delete', 'archive', 'unarchive', 'restore'])

</script> 
<style scoped>
.note-list-card {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding:0.8rem;
}
</style>