<template>
  <div class="note-list">
    <NoteItem
      v-for="note in filteredNotes"
      :key="note.id"
      :note="note"
      @click="selectNote(note)"
    />
  </div>
</template>

<script setup>
import { useNotes } from "../../composables/useNotes";
import NoteItem from "./NoteItem.vue";
import { computed } from "vue";

const props = defineProps({
  showArchived: Boolean 
})

const selectedNote = defineModel();
const { notes } = useNotes();

const filteredNotes = computed(() =>
  notes.value.filter(note => note.archived === props.showArchived)
)

function selectNote(note) {
  selectedNote.value = note;
}
</script>