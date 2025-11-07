<template>
  <div class="note-card">
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
.note-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>