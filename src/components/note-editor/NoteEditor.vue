<script setup>
import { ref, computed } from "vue";
import Toolbar from "../toolbar/Toolbar.vue";
import EditableArea from "./EditableArea.vue";
import { useNotes } from "../../composables/useNotes";
import { useTextFormatting } from "../../composables/functions/useTextFormatting";
import { useTextColor } from "../../composables/functions/useTextColor";
import { toggleListType } from '../../composables/functions/useTextFormatting'

const selectedNote = defineModel();
const { notes } = useNotes();
const { isBold, isItalic, isUnderline } = useTextFormatting();

const editableRef = ref(null);

const { setColor } = useTextColor();

const activeListType = computed(() => editableRef.value?.activeListType || null);

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
  editableRef.value?.resetCurrentElement(); // yeni fonksiyon
  editableRef.value?.applyStyleToSelection(styleType);
}


function handleApplyColor(color) {
  setColor(color);
  editableRef.value?.resetCurrentElement(); // yeni fonksiyon
  editableRef.value?.applyColorToSelection(color);
}

function handleApplyList(type) {
  toggleListType(type) // ⬅️ Liste modunu aç/kapat
  editableRef.value?.resetCurrentElement()
}


</script>

<template>
  <div v-if="selectedNote" class="note-editor">
    <Toolbar
      :note="selectedNote"
      :isBold="isBold"
      :isItalic="isItalic"
      :isUnderline="isUnderline" 
      :activeListType="activeListType"
      @update="updateNote"
      @applyStyle="handleApplyStyle"
      @applyColor="handleApplyColor" 
      @applyList="handleApplyList"
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