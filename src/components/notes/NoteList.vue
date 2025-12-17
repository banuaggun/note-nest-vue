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
import NoteItem from "./NoteItem.vue";

defineProps({
  notes: {
    type: Array,
    required: true,
  },
});

defineEmits(["edit", "delete", "archive", "unarchive", "restore"]);
</script>
<style scoped>
.note-list-card {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0.8rem;
}
@media only screen and (min-width: 767px) and (max-width: 1025px) {
  .note-list-card {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
@media only screen and (min-width: 1026px) and (max-width: 1921px) {
  .note-list-card {
    display: flex;
    flex-direction: column;
  }
}
</style>
