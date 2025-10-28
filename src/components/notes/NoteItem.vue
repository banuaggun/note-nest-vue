<template>
  <div class="note-item" @click="emit('select', note)" :class="{ archived: note.archived }">
    <h3>{{ note.title }}</h3>
    <p class="preview">{{ note.content.slice(0, 50) }}...</p>
  </div>
</template>

<script setup>
defineProps({ note: Object }) 
const emit = defineEmits(['select'])
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
