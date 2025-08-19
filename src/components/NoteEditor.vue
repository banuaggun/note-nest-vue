<template>
  <section class="note-editor">
    <ToolBar @new-note="createNote"/>
    <input v-model="title" placeholder="Note title" />
    <textarea v-model="content" placeholder="Write your note..."></textarea>
    <button @click="saveNote">Save</button>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import useNotes from '../composables/useNotes';
import ToolBar from './ToolBar.vue';


const {createNote} = useNotes()

const title = ref('')
const content = ref('')

function saveNote() {
  console.log('Note saved:', title.value, content.value)
}
</script>

<style scoped>
.note-editor {
  flex:1;
  padding: 1rem;
  border-top: 1px solid #ccc;
}
input, textarea {
  width: 100%;
  margin-bottom: 0.5rem;
}
</style>
