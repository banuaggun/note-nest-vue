<template>
  <div class="app-container">
    <Header />
    <div class="main-layout">
      <Sidebar />
      <div class="content-area">
        <NoteList />
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import NoteList from "./components/NoteList.vue";
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
  flex: 1;
  padding: 1rem;
  margin-top: 100px;
  margin-left: 284px;
}
</style>
