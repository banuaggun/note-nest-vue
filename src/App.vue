<template>
  <div class="app-container">
    <Header />
    <div class="main-layout">
      <Sidebar />
      <div class="content-area">
     
      area
      </div>
    </div>
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main-layout {
  display: flex;
  flex: 1;
}
.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  background-color: #fafafa;
  margin-top:100px;
  margin-left:284px;
}
</style>
