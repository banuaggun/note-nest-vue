<template>
  <section class="note-editor">
    <ToolBar
      @new-note="handleCreateNote"
      @remove-note="removeActiveNote"
      @edit-note="startEditing"
      @format="applyFormat"
      :disabled="!activeNote"
      :selectedNote="activeNote"
      :isFormatActive="isFormatActiveState"
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
import ToolBar from "./toolbar/ToolBar.vue";
import useNotes from "../composables/useNotes";
import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";

const isFormatActiveState = ref({
  bold: false,
  italic: false,
  underline: false
});

const isEditing = ref(false);
const noteBody = ref(null);
const editingNote = ref(null);

const {
  createNote: createNewNote,
  activeNote,
  setActiveNoteId,
  updateNote,
  removeNote
} = useNotes();

function updateFormatState() {
  if (isEditing.value) {
    isFormatActiveState.value.bold = document.queryCommandState("bold");
    isFormatActiveState.value.italic = document.queryCommandState("italic");
    isFormatActiveState.value.underline = document.queryCommandState("underline");
  }
}

onMounted(() => {
  document.addEventListener("selectionchange", updateFormatState);
});

onUnmounted(() => {
  document.removeEventListener("selectionchange", updateFormatState);
});

function handleCreateNote() {
  isEditing.value = false;
  editingNote.value = null;
  createNewNote();
}

function startEditing() {
  isEditing.value = true;
}

function onContentInput() {
  if (noteBody.value && isEditing.value) {
    updateNote("content", noteBody.value.innerHTML);
  }
}

watch(activeNote, async (newNote) => {
  if (newNote?.content !== undefined) {
    await nextTick();
    if (noteBody.value) {
      noteBody.value.innerHTML = newNote.content;
    }
    isEditing.value = false;
    editingNote.value = null;
  }
});

function removeActiveNote() {
  if (confirm("Are you sure?")) {
    removeNote();
    isEditing.value = false;
    editingNote.value = null;
  }
}

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

function applyFormat(command) {
  if (noteBody.value && isEditing.value) {
    document.execCommand(command, false, null);
    isFormatActiveState.value[command] = !isFormatActiveState.value[command];
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
