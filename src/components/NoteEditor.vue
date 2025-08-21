<template>
  <section class="note-editor">
    <ToolBar @new-note="createNote" @remove-note="removeActiveNote" :disabled="!activeNote" />
    <div class="note-editor-content" v-if="activeNote">

      <input type="text" @keyup="updateNote" v-model="activeNote.title" placeholder="Note title" />

      <textarea @keyup="updateNote" v-model="activeNote.content" placeholder="Write your note..."></textarea>

      <!-- 
        <input type="text" v-debounce:500ms="updateNote" />
        <textarea v-debounce=500ms="updateNote"></textarea>
      -->

      <button @click="saveNote">Save</button>

    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue'
//import {vueDebounce} from 'vue-debounce';
import useNotes from '../composables/useNotes';
import ToolBar from './ToolBar.vue';


const { createNote, activeNote, updateNote, removeNote } = useNotes()

//const vDebounce = vueDebounce({lock:true})

const title = ref('')
const content = ref('')

const removeActiveNote = () => {
  if(confirm("Are you sure?")){
    removeNote()
  }
}

function saveNote() {
  console.log('Note saved:', title.value, content.value)
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
