<template>
  <div class="main-layout">
    <div class="sidebar-panel">
      <Sidebar />
    </div>
    <div class="note-list-panel">
      <router-view v-model:selectedNote="selectedNote" />
    </div>
    <div class="note-editor-panel">
      <NoteEditor v-model="selectedNote" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NoteEditor from './components/note-editor/NoteEditor.vue'
import Sidebar from './components/sidebar/Sidebar.vue'

const selectedNote = ref(null)
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
}

.sidebar-panel {
  width: 200px;
}

.note-list-panel {
  width: 40%;
  border-right: 1px solid #ccc;
  overflow-y: auto;
}

.note-editor-panel {
  width: 60%;
  padding: 20px;
}
</style>