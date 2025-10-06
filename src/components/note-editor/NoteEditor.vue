<script setup>
import { ref, computed } from "vue";
import Toolbar from "../toolbar/Toolbar.vue";
import EditableArea from "./EditableArea.vue";
import { useNotes } from "../../composables/useNotes";
import { useTextFormatting } from "../../composables/functions/useTextFormatting";
import { useTextColor } from "../../composables/functions/useTextColor";
import { toggleListType } from '../../composables/functions/useTextFormatting'
import { fontFamily, setFontFamily } from "../../composables/functions/useFontFamily";


const selectedNote = defineModel();
const { notes } = useNotes();
const { isBold, isItalic, isUnderline } = useTextFormatting();
const { setColor } = useTextColor(); 

const editableRef = ref(null);

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
  editableRef.value?.resetCurrentElement();
  editableRef.value?.applyStyleToSelection(styleType);
}

function handleApplyColor(color) {
  setColor(color);
  editableRef.value?.resetCurrentElement();
  editableRef.value?.applyColorToSelection(color);
}

function handleApplyFont(font) {
  setFontFamily(font); 
  editableRef.value?.resetCurrentElement(); 
  editableRef.value?.applyFontToSelection(font); 
}


function handleApplyList(type) {
  toggleListType(type);
  editableRef.value?.resetCurrentElement();
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
      :saveSelection="triggerSaveSelection"
      @update="updateNote"
      @applyStyle="handleApplyStyle"
      @applyColor="handleApplyColor"
      @applyList="handleApplyList" 
      @applyFont="handleApplyFont"
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
  border:1px solid green;
}
</style>