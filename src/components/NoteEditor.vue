<template>
  <section class="note-editor">
    <ToolBar
      @new-note="createNote"
      @remove-note="removeActiveNote"
      :disabled="!activeNote"
    />
    <div
      class="note-editor-content"
      v-if="activeNote && activeNote.title !== undefined"
    >
      <input
        type="text"
        @input="updateNote('title', $event.target.value)"
        v-model="activeNote.title"
      />
      <textarea
        @input="updateNote('content', $event.target.value)"
        v-model="activeNote.content"
      />

      <button @click="saveNote">Save</button>
    </div>
  </section>
</template>

<script setup>
//import { ref } from 'vue'
import useNotes from "../composables/useNotes";
import ToolBar from "./ToolBar.vue";

const { createNote, activeNote, setActiveNoteId, updateNote, removeNote } =
  useNotes();

//const title = ref('')
//const content = ref('')

const removeActiveNote = () => {
  if (confirm("Are you sure?")) {
    removeNote();
  }
};

function saveNote() {
  if (activeNote.value) {
    updateNote("title", activeNote.value.title);
    updateNote("content", activeNote.value.content);
    console.log(
      "Note saved:",
      activeNote.value.title,
      activeNote.value.content
    );

    setActiveNoteId(null);
  }
}
</script>

<style scoped>
.note-editor {
  flex: 1;
  padding: 1rem;
  border-top: 1px solid #ccc;
}

input,
textarea {
  width: 100%;
  margin-bottom: 0.5rem;
}
</style>
