<template>
  <div class="note-editor">
    <div class="actions">
      <button @click="handleSubmit">
        {{ note?.id ? "Güncelle" : "Oluştur" }}
      </button>
      <button @click="$emit('cancel')">İptal</button>
    </div>

    <!-- Toolbar -->
    <Toolbar
      :isBold="isBold"
      :isItalic="isItalic"
      :isUnderline="isUnderline"
      :activeListType="activeListType"
      @applyStyle="editable.value?.applyStyle($event)"
      @applyColor="editable.value?.applyColor($event)"
      @applyFont="editable.value?.applyFont($event)"
      @applyList="editable.value?.applyList($event)"
    />

    <!-- EditableArea -->
    <EditableArea ref="editable" :note="note" />

    <!-- Etiketler -->
    <label>
      Etiketler (virgülle ayır):
      <input v-model="tags" type="text" />
    </label>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useNotes } from "../../composables/useNotes";
import Toolbar from "../toolbar/Toolbar.vue";
import EditableArea from "./EditableArea.vue";
import { useTextFormatting } from "../../composables/functions/useTextFormatting";
import { useTextColor } from "../../composables/functions/useTextColor";
import { useFontFamily } from "../../composables/functions/useFontFamily";
import { toggleListType } from "../../composables/functions/useTextFormatting";

const props = defineProps({ note: Object });
const emit = defineEmits(["save", "cancel"]);

const { createNote, updateNote } = useNotes();

const tags = ref(""); 
const title = ref(""); 
const content = ref(""); 
const editable = ref(null);

watch(
  () => props.note,
  (note) => { 
    title.value = note?.title || "";
    content.value = note?.content || "";
    tags.value = note?.tags?.join(", ") || "";
  },
  { immediate: true }
);

function handleSubmit() {
  const safeNote = editable.value?.noteLocal || { title: "", content: "" };

  const noteData = {
    id: props.note?.id,
    title: (safeNote.title).trim(),
    content: (safeNote.content).trim(),
    tags: tags.value.split(",").map(t => t.trim()).filter(Boolean),
  };

  if (noteData.id) {
    updateNote(noteData);
  } else {
    createNote(noteData);
  }

  emit("save", noteData);
}

/* Toolbar state */
const { isBold, isItalic, isUnderline } = useTextFormatting();
const { setColor } = useTextColor();
const { setFontFamily } = useFontFamily();
const activeListType = ref(null);
</script>

<style scoped>
.note-editor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.actions {
  display: flex;
  gap: 1rem;
}
</style>
