<template>
  <div v-if="selectedNote && selectedNote.id">
    <TextStyleControls :isFormatActive="isFormatActive" @format="emit('format', $event)" />
    <HeadingControls @format="emit('format', $event)" />
    <ListControls @format="emit('format', $event)" />
    <NoteActions :disabled="disabled" :selectedNote="selectedNote" @edit-note="emit('edit-note', $event)" @remove-note="emit('remove-note')" />
    
    <div class="note-warning">
      <p>Click on the edit button to write something.</p>
    </div>
  </div>
</template>

<script setup>
import TextStyleControls from "./TextStyleControls.vue";
import HeadingControls from "./HeadingControls.vue";
import ListControls from "./ListControls.vue";
import NoteActions from "./NoteActions.vue";

const emit = defineEmits(['format', 'edit-note', 'remove-note']);

defineProps({
  disabled: Boolean,
  selectedNote: Object,
  isFormatActive: Object
});
</script>
