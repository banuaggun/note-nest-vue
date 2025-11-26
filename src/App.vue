<template>
  <div class="app-layout" :class="[settings.theme, settings.font]">
    <div class="header-panel">
      <Header />
    </div>
    <div class="sidebar-panel">
      <Navbar />
    </div>
    
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import Header from './components/Header.vue'
import Navbar from './components/navbar/Navbar.vue'
import { RouterView } from 'vue-router' 

const settings = inject('settings')
</script>

<style scoped>
.app-layout{
  display:flex;
  flex-direction: column;
  font-family: 'Segoe UI', sans-serif;
}

.header-panel{
  width:100%;
  height:42px;
  padding:24px 0 12px 12px;
  border:1px solid blue;
  background-color: var(--bg-color);
  position:fixed;
  margin-bottom: 20px;
  z-index:10;
  display:flex;
  align-items: center;
}

.main-content{
  width:100%;
  height:auto;
  border:1px solid fuchsia;
}

/* ---Yeri sabit kalacak --- */
.light {
  background: #f9f9f9;
  color: #333;
}

.dark {
  background: #333;
  color: #f8f8f8;
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
/* ---Yeri sabit kalacak --- */
</style>
