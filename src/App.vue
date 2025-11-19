<template>
  <div class="app-layout" :class="[settings.theme, settings.font]">
  
    <div class="sidebar-panel">
      <Sidebar />
    </div>
    
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import Sidebar from './components/sidebar/Sidebar.vue'
import { RouterView } from 'vue-router' 

const settings = inject('settings')
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

.light {
  background: #f9f9f9;
  color: #333;
}

.dark {
  background: #333;
  color: #000;
}


/* Font class'ları */
.sans {
  font-family: Arial, sans-serif;
}
.serif {
  font-family: Georgia, serif;
}
.mono {
  font-family: Courier New, monospace;
}
</style>
