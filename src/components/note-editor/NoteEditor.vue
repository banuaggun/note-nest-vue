<template>
  <div class="note-editor">
    <!-- Actions -->
    <div class="actions">
      <button @click="handleSubmit">
        {{ note?.id ? "Güncelle" : "Oluştur" }}
      </button>
      <button @click="$emit('cancel')">İptal</button>
    </div>

    <div class="note-editor-toolbar">
      <Toolbar
        :isBold="isBold"
        :isItalic="isItalic"
        :isUnderline="isUnderline"
        @applyStyle="applyStyle"
      />
    </div>

    <div class="note-editor-editable">
      <!-- Başlık -->
      <input
        v-model="noteLocal.title"
        type="text"
        placeholder="Başlık yazın..."
      />
      <div
        class="text-area"
        v-html="noteLocal.content"
        contenteditable="true"
        ref="contentRef"
        @input="onInput" 
      >
      </div> 
      <!--  @input="noteLocal.content = contentRef.innerHTML" -->
   
      <!-- Etiketler -->
      <label>
        Etiketler (virgülle ayır):
        <input v-model="tags" type="text" />
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useNotes } from "../../composables/useNotes";
import Toolbar from "../toolbar/Toolbar.vue";
import { useTextFormatting } from "../../composables/functions/useTextFormatting";

const props = defineProps({ note: Object });
const emit = defineEmits(["save", "cancel"]);

const { createNote, updateNote } = useNotes();

// Local state
const noteLocal = ref({ title: "", content: "" });

const tags = ref("");

const { isBold, isItalic, isUnderline, toggleStyle } = useTextFormatting();

function applyStyle(styleType) {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const span = document.createElement("span");

  if (styleType === "italic") span.style.fontStyle = "italic";
  if (styleType === "bold") span.style.fontWeight = "bold";
  if (styleType === "underline") span.style.textDecoration = "underline";

  range.surroundContents(span);
}
 
const contentRef = ref(null);  

function onInput() {
  // İçeriği güncelle
  noteLocal.value.content = contentRef.value.innerHTML;

  // Vue güncellemeden sonra caret'i sona taşı
  nextTick(() => {
    const sel = window.getSelection();
    if (!sel || !contentRef.value) return;

    const range = document.createRange();
    range.selectNodeContents(contentRef.value);
    range.collapse(false); // false => sona collapse et

    sel.removeAllRanges();
    sel.addRange(range);
  });
}



// Edit modunda gelen notu doldur
watch(
  () => props.note,
  (note) => {
    noteLocal.value.title = note?.title || "";
    noteLocal.value.content = note?.content || "";
    tags.value = note?.tags?.join(", ") || "";

    // contenteditable div'i doldur
    if (contentRef.value) {
      contentRef.value.innerHTML = noteLocal.value.content;
    }
  },
  { immediate: true }
);

/*
watch(
  () => props.note,
  (note) => {
    noteLocal.value.title = note?.title || "";
    noteLocal.value.content = note?.content || "";
    tags.value = note?.tags?.join(", ") || "";
  },
  { immediate: true }
);
*/

// Kaydet
function handleSubmit() {
  const noteData = {
    id: props.note?.id,
    title: noteLocal.value.title.trim(),
    //content: contentRef.value.innerHTML.trim(),
    content: noteLocal.value.content.trim(),
    tags: tags.value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    styles: {
      bold: isBold.value,
      italic: isItalic.value,
      underline: isUnderline.value,
    },
  };

  if (noteData.id) {
    updateNote(noteData);
  } else {
    createNote(noteData);
  }

  emit("save", noteData);
}
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
input,
textarea,
.text-area {
  border: 1px solid #ccc;
  padding: 0.5rem;
  width: 100%;
  height: 80px;
  border-radius: 4px;
}
</style>
