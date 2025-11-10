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

/* Sidebar bileşeni sabit genişlikte */
.sidebar-panel {
  width: 220px;
  background-color: #f0f0f0;
  padding: 1rem;
  border-right: 1px solid #ccc;
}

/* Sayfa içeriği alanı */
.main-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>
