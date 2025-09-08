<template>
  <div class="app-container">
    <Header />
    <div class="main-layout">
      <Sidebar />
      <div class="content-area">
        <div class="content-area-list">
<NoteList v-model="selectedNote" />
        </div>
        <div class="content-area-editor">
<NoteEditor v-model="selectedNote" />
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import NoteList from "./components/notes/NoteList.vue";
import NoteEditor from "./components/note-editor/NoteEditor.vue";

const selectedNote = ref(null)
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}
.main-layout {
  display: flex;
  flex: 1;
}
.content-area {
  display:flex;
  flex: 1;
  flex-direction: row;
  padding: 1rem;
  margin-top: 100px;
  margin-left: 260px;
}

.content-area-list{
  width: 40%;
  border-right: 1px solid #ccc;
  overflow-y: auto;
}

.content-area-editor{
  width: 60%;
  padding: 20px;
}
</style>
