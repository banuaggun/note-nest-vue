<template>
  <div class="note-list">
    <NoteItem
      v-for="note in notes"
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



<style lang="css">
.note-list {
  padding: 16px;
}

.note-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.note-card {
  background: #f9f9f9;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: 0.3s ease;
}

.note-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.note-card h3 {
  margin: 0 0 8px;
  font-size: 18px;
}

.note-card p {
  margin: 0 0 12px;
  font-size: 14px;
  color: #333;
}

.tags {
  margin-bottom: 8px;
}

.tag {
  display: inline-block;
  background-color: #e0f0ff;
  color: #0077cc;
  padding: 4px 8px;
  margin-right: 6px;
  border-radius: 4px;
  font-size: 12px;
}

.note-card small {
  color: #666;
  font-size: 12px;
}

.note-card.archived {
  background-color: #f0f0f0;
  opacity: 0.8;
}
</style>
