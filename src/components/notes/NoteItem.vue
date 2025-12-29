<template>
  <div class="note-item" :class="{ archived: note.status === 'archived' }">
    <NoteActions
      class="actions"
      :note="note"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)"
      @archive="$emit('archive', $event)"
      @unarchive="$emit('unarchive', $event)"
      @restore="$emit('restore', $event)"
    />
    <h3>{{ cleanedTitle }}</h3>
    <p>{{ cleanedContent }}...</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import NoteActions from "../toolbar/NoteActions.vue";

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const cleanedTitle = computed(() => {
  const raw = props.note.title || "";
  const text = raw
    .replace(/&nbsp;/g, " ") // HTML boşluk karakterlerini düzelt
    .replace(/<[^>]+>/g, "") // HTML etiketlerini kaldır
    .replace(/\s+/g, " ") // Fazla boşlukları sadeleştir
    .trim();

  const maxLength = 30;
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
});

const cleanedContent = computed(() => {
  const raw = props.note.content || "";
  const text = raw
    .replace(/&nbsp;/g, " ") // HTML boşluk karakterlerini düzelt
    .replace(/<[^>]+>/g, "") // HTML etiketlerini kaldır
    .replace(/\s+/g, " ") // Fazla boşlukları sadeleştir
    .trim();

  const maxLength = 50;
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
});
</script>

<style scoped>
.note-item {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 8px; 
  color:var(--text-color);
}

.note-item h3,
.note-item p {
  margin: 8px 8px;
}

@media only screen and (min-width: 767px) and (max-width: 1025px) {
  .note-item {
    width: 48%;
  }
}

@media only screen and (min-width: 1026px) and (max-width: 1921px) {
  .note-item {
    width: 100%;
  }
}
</style>
