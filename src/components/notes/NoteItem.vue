<template>
  <div
    class="note-item" :class="{ archived: note.status === 'archived' }">
    <h3>{{ cleanedTitle }}</h3>
    <p>{{ cleanedContent }}...</p> 
    <div class="tags">
      <span v-for="tag in note.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>

    <NoteActions 
    class="actions"
      :note="note"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)"
      @archive="$emit('archive', $event)"
      @unarchive="$emit('unarchive', $event)"
      @restore="$emit('restore', $event)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import NoteActions from "../toolbar/NoteActions.vue";

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
}) 

const cleanedTitle = computed(() => {
  const raw = props.note.title || ''
  const text = raw
    .replace(/&nbsp;/g, ' ')       // HTML boşluk karakterlerini düzelt
    .replace(/<[^>]+>/g, '')       // HTML etiketlerini kaldır
    .replace(/\s+/g, ' ')          // Fazla boşlukları sadeleştir
    .trim()

  const maxLength = 30
  return text.length > maxLength
    ? text.slice(0, maxLength) + '...'
    : text
})

const cleanedContent = computed(() => {
  const raw = props.note.content || ''
  const text = raw
    .replace(/&nbsp;/g, ' ')       // HTML boşluk karakterlerini düzelt
    .replace(/<[^>]+>/g, '')       // HTML etiketlerini kaldır
    .replace(/\s+/g, ' ')          // Fazla boşlukları sadeleştir
    .trim()

  const maxLength = 50
  return text.length > maxLength
    ? text.slice(0, maxLength) + '...'
    : text
})

</script>

<style scoped>
.note-item {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
} 
.archived {
  opacity: 0.6;
}
.note-item:hover {
  background-color: #f9f9f9;
} 
.tag {
  background-color: #eee;
  padding: 0.2rem 0.5rem;
  margin-right: 0.3rem;
  border-radius: 4px;
  font-size: 0.8rem;
}
.actions button {
  margin-right: 0.5rem;
}
</style>