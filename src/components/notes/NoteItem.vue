<template>
  <div
    class="note-item"
    @click="emit('select', note)"
    :class="{ archived: note.archived }"
  >
    <h3>{{ note.title }}</h3>
    <p class="preview">{{ note.content.slice(0, 50) }}...</p>

    <ArchiveDeleteButtons
      :note="note"
      @archive="emit('archive', $event)"
      @unarchive="emit('unarchive', $event)"
      @delete="emit('delete', $event)"
      @restore="emit('restore', $event)"
    />
  </div>
</template>

<script setup>
import ArchiveDeleteButtons from "../toolbar/ArchiveDeleteButtons.vue";
defineProps({ note: Object });
const emit = defineEmits([
  "select",
  "archive",
  "unarchive",
  "delete",
  "restore",
]);
</script>

<style scoped>
.note-item {
  padding: 12px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.note-item:hover {
  background-color: #f9f9f9;
}
.preview {
  color: #666;
  font-size: 14px;
}
</style>