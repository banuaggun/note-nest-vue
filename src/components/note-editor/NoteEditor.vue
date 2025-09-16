<script setup>
import { ref } from "vue";
import Toolbar from "../toolbar/Toolbar.vue";
import EditableArea from "./EditableArea.vue";
import { useNotes } from "../../composables/useNotes";
import { useTextFormatting } from "../../composables/functions/useTextFormatting";
import { useTextColor } from "../../composables/functions/useTextColor";

const selectedNote = defineModel();
const { notes } = useNotes();
const { isBold, isItalic, isUnderline } = useTextFormatting();

const editableRef = ref(null);

const { setColor } = useTextColor();

function updateNote(updatedNote) {
  selectedNote.value = updatedNote;
}

function saveNote() {
  const index = notes.value.findIndex((n) => n.id === selectedNote.value.id);
  if (index !== -1) {
    notes.value[index] = { ...selectedNote.value };
  }
}

function handleApplyStyle(styleType) {
  editableRef.value?.applyStyleToSelection(styleType);
}

function handleApplyColor(color) {
  setColor(color);
  editableRef.value?.applyColorToSelection(color);
}
</script>

<template>
  <div v-if="selectedNote" class="note-editor">
    <Toolbar
      :note="selectedNote"
      :isBold="isBold"
      :isItalic="isItalic"
      :isUnderline="isUnderline"
      @update="updateNote"
      @applyStyle="handleApplyStyle"
      @applyColor="handleApplyColor"
    />
    <EditableArea ref="editableRef" v-model="selectedNote" />
    <button @click="saveNote">Kaydet</button>
  </div>
  <div v-else class="note-editor-empty">
    <p>Bir not seçin...</p>
  </div>
</template>

<style scoped>
.note-editor {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>