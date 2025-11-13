<template>
  <div class="app-layout">
    <div class="sidebar-panel">
      <Sidebar />
    </div>
    

    <!-- Sağ: Sayfa içeriği -->
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
}

.sidebar-panel {
  width: 200px;
}

.main-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  margin-top: 20px;
} 
ul{
  list-style-type: disc;
}
ol{
  list-style-type: decimal;
}
</style>
