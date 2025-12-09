<template>
  <div class="note-editor">
    <!-- Actions -->
    <div class="actions">
      <button @click="handleSubmit">
        {{ note?.id ? "Güncelle" : "Oluştur" }}
      </button>
      <button @click="$emit('cancel')">İptal</button>
    </div>
 <!-- Header -->
      <input
        v-model="noteLocal.title"
        type="text"
        placeholder="Başlık yazın..."
      />
    <div class="note-editor-toolbar">
      <Toolbar
        :isBold="isBold"
        :isItalic="isItalic"
        :isUnderline="isUnderline" 
          
         @applyStyle="applyStyle"
      />
    </div>

    <div class="note-editor-editable">
     
      <div
        class="text-area"
        v-html="noteLocal.content"
        contenteditable="true"
        ref="contentRef"
        @input="onInput"  
        @beforeinput="onBeforeInput"
      >
      </div> 
      <!--  @input="noteLocal.content = contentRef.innerHTML" -->
   
      <!-- Tags -->
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
const contentRef = ref(null); 

function onBeforeInput(e) {
  if (e.inputType !== "insertText") return;

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);

  const span = document.createElement("span");
  // toggle logic: apply style if true, normal if false
  span.style.fontWeight = isBold.value ? "bold" : "normal";
  span.style.fontStyle = isItalic.value ? "italic" : "normal";
  span.style.textDecoration = isUnderline.value ? "underline" : "none";

  const text = e.data === " " ? "\u00A0" : e.data;
  span.textContent = text;

  if (range.collapsed) { 
     if (
      range.startContainer.parentNode &&
      range.startContainer.parentNode.style &&
      range.startContainer.parentNode.style.textDecoration === "underline" &&
      !isUnderline.value
    ) {
      // remove caret from underline span
      range.setStartAfter(range.startContainer.parentNode);
    }

    range.insertNode(span);
    range.setStartAfter(span);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    e.preventDefault(); 
    return;
  }

  noteLocal.value.content = contentRef.value.innerHTML;
}


function applyStyle(styleType) { 

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0); 

  const span = document.createElement("span");

  // Apply style toggles
  if (styleType === "bold") {
    span.style.fontWeight = isBold.value ? "bold" : "normal";
  }
  if (styleType === "italic") {
    span.style.fontStyle = isItalic.value ? "italic" : "normal";
  }
  if (styleType === "underline") {
    span.style.textDecoration = isUnderline.value ? "underline" : "none";
  }

  // Enclose the selected text in spans
  try {
    range.surroundContents(span);
  } catch (err) {
    // Eğer range boşsa veya surroundContents hata verirse fallback
    span.appendChild(range.extractContents());
    range.insertNode(span);
  }

  // Update content
  noteLocal.value.content = contentRef.value.innerHTML;
}


function onInput() {
  // Update content
  noteLocal.value.content = contentRef.value.innerHTML;
/*
  // Move caret to end after Vue update
  nextTick(() => {
    const sel = window.getSelection();
    if (!sel || !contentRef.value) return;

    const range = document.createRange();
    range.selectNodeContents(contentRef.value);
    range.collapse(false); // false => sona collapse et

    sel.removeAllRanges();
    sel.addRange(range);
  });
  */
}


watch(
  () => props.note,
  (note) => {
    noteLocal.value.title = note?.title || "";
    noteLocal.value.content = note?.content || "";
    tags.value = note?.tags?.join(", ") || "";

    // only fill on first load
    if (contentRef.value && note?.content) {
      contentRef.value.innerHTML = noteLocal.value.content;
    }
  },
  { immediate: true }
);


/*
// Fill in the note in edit mode
watch(
  () => props.note,
  (note) => {
    noteLocal.value.title = note?.title || "";
    noteLocal.value.content = note?.content || "";
    tags.value = note?.tags?.join(", ") || "";

    // contenteditable div fill
    if (contentRef.value) {
      contentRef.value.innerHTML = noteLocal.value.content;
    }
  },
  { immediate: true }
);
*/
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

// Save
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
.bold { font-weight: bold; }
.italic { font-style: italic; }
.underline { text-decoration: underline; }

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
