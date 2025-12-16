<template>
  <div class="app-layout" :class="[settings.theme, settings.font]">
    <div class="header-panel" ref="headerRef">
      <Header />
    </div>

    <main class="main-content" :style="{ paddingTop: headerHeight + 'px' }">
      <RouterView v-slot="{ Component }">
        <component
          :is="Component"
          :isEditorOpen="isEditorOpen"
          @update:isEditorOpen="val => isEditorOpen = val"
        />
      </RouterView>
    </main>

    <!-- The navbar only works if the editor is closed -->
    <div class="navbar-panel" v-if="!(!isDesktop && isEditorOpen)">
      <Navbar />
    </div>
     
    <!-- Global Toast -->
    <NotificationModal :message="message" :visible="visible" />
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import Header from './components/Header.vue';
import Navbar from './components/navbar/Navbar.vue'; 
import NotificationModal from './components/note-editor/NotificationModal.vue'; 
import { RouterView } from 'vue-router';
import { useToast } from './composables/useToast'; 

const settings = inject('settings');
const isEditorOpen = ref(false);

const isDesktop = ref(window.innerWidth > 1024);

window.addEventListener("resize", () => {
  isDesktop.value = window.innerWidth < 1024;
});

const headerRef = ref(null);
const headerHeight = ref(0);

onMounted(() => {
  headerHeight.value = headerRef.value.offsetHeight;
});

// Global toast state
const { message, visible } = useToast();
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column; 
  width:100%; 
  height:auto;
  font-family: 'Segoe UI', sans-serif;
}

.header-panel {
  width: 100%;
  height: 42px;
  padding: 24px 0 12px 12px;
  background-color: var(--bg-color);
  position: fixed; 
  z-index: 10;
  display: flex;
  align-items: center; 
}

.navbar-panel{
  width:100%;
}

.main-content {
  width: 100%;
  height: auto;  
  padding:0;
}

.light {
  background: #f9f9f9;
  color: #333;
}
.dark {
  background: #333;
  color: #f8f8f8;
}
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
