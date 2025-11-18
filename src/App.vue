<template>
  <div class="app-layout">
  
    <div class="sidebar-panel">
      <Sidebar />
    </div>
    
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import Sidebar from './components/sidebar/Sidebar.vue'
import { RouterView } from 'vue-router' 
</script>

<style scoped>
.app-layout {
  display: flex;
  height: auto;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f8f8f8;
}


.main-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  margin-top: 20px;
  background-color: #f8f8f8;
} 
ul{
  list-style-type: disc;
}
ol{
  list-style-type: decimal;
}
</style>
