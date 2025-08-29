<template>
  <section class="note-editor">
    <ToolBar
      @new-note="handleCreateNote"
      @remove-note="removeActiveNote"
      @edit-note="startEditing" 
      @format-bold="applyBold"
      :disabled="!activeNote"
      :selectedNote="activeNote" 
      :isBoldActive="isBoldActive"
    />

    <div v-if="activeNote && activeNote.title !== undefined" class="note-editor-content">
      <input
        type="text"
        class="note-title"
        placeholder="Note title..."
        v-model="activeNote.title"
        :disabled="!isEditing"
      />

      <div
        class="note-body"
        :contenteditable="isEditing"
        ref="noteBody"
        @input="onContentInput"
      ></div>

      <div class="note-tags">
        <label>Tags:</label>
        <input type="text" placeholder="e.g. work, idea, personal" :disabled="!isEditing" />
      </div>

      <div class="note-meta">
        <span>Last updated: 25 Aug 2025, 14:30</span>
      </div>

      <button class="save-btn" v-if="isEditing" @click="saveNote">Save Note</button>
    </div>

    <p v-else class="note-empty">Note saved. Select a note to continue.</p>
  </section>
</template>

<script setup>
import ToolBar from "./ToolBar.vue";
import useNotes from "../composables/useNotes";
import { ref, watch, nextTick } from "vue";
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  document.addEventListener("selectionchange", updateBoldState);
});

onUnmounted(() => {
  document.removeEventListener("selectionchange", updateBoldState);
});

function updateBoldState() {
  if (isEditing.value) {
    isBoldActive.value = document.queryCommandState("bold");
  }
}


const {
  createNote: createNewNote,
  activeNote,
  setActiveNoteId,
  updateNote,
  removeNote
} = useNotes();

const editingNote = ref(null);
const isEditing = ref(false);
const noteBody = ref(null);
const isBoldActive = ref(false);


// Yeni not oluşturulunca edit modu kapatılır
function handleCreateNote() {
  isEditing.value = false;
  editingNote.value = null;
  createNewNote();
}

// Var olan not için edit modu başlatılır
function startEditing(note) {
  editingNote.value = note;
  isEditing.value = true;
}

// İçerik düzenlenince güncelle
function onContentInput() {
  if (noteBody.value && isEditing.value) {
    updateNote("content", noteBody.value.innerHTML);
  }
}

// Aktif not değiştiğinde içeriği DOM'a yaz
watch(activeNote, async (newNote) => {
  if (newNote?.content !== undefined) {
    await nextTick();
    if (noteBody.value) {
      noteBody.value.innerHTML = newNote.content;
    }
    isEditing.value = false; // yeni not seçildiğinde edit modu kapanır
    editingNote.value = null;
  }
});

// Notu sil
function removeActiveNote() {
  if (confirm("Are you sure?")) {
    removeNote();
    isEditing.value = false;
    editingNote.value = null;
  }
}

// Notu kaydet
function saveNote() {
  if (activeNote.value) {
    updateNote("title", activeNote.value.title);
    updateNote("content", noteBody.value?.innerHTML || "");
    console.log("Note saved:", activeNote.value.title, activeNote.value.content);
    setActiveNoteId(null);
    isEditing.value = false;
    editingNote.value = null;
  }
}

// Notu bold yaz
function applyBold() {
  if (noteBody.value && isEditing.value) {
    document.execCommand("bold", false, null);
    isBoldActive.value = document.queryCommandState("bold");
  }
}



</script>

<style scoped>
.note-editor {
  flex: 1;
  padding: 2rem;
  border-top: 1px solid #ddd;
  background-color: #f9f9f9;
}

.note-editor-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.note-title {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.note-body {
  width: 600px;
  min-height: 300px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  line-height: 1.6;
  background-color: white;
  outline: none;
  overflow-y: auto;
  text-align: left;
  direction: ltr;
  unicode-bidi: normal;
  white-space: pre-wrap;
  word-break: break-word;
}

.note-tags input {
  margin-top: 0.25rem;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 4px;
}

.note-meta {
  font-size: 0.85rem;
  color: #666;
}

.save-btn {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #4338ca;
}

.note-empty {
  margin-top: 2rem;
  color: #999;
  font-style: italic;
}
</style>
