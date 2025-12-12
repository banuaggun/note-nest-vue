<template>
  <div class="app-layout" :class="[settings.theme, settings.font]">
    <div class="header-panel">
      <Header />
    </div>

    <!-- The navbar only works if the editor is closed -->
    <div class="sidebar-panel" v-if="!isEditorOpen">
      <Navbar />
    </div>

    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <component
          :is="Component"
          :isEditorOpen="isEditorOpen"
          @update:isEditorOpen="val => isEditorOpen = val"
        />
      </RouterView>
    </main>

    <!-- Global Toast -->
    <NotificationModal :message="message" :visible="visible" />
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import Header from './components/Header.vue';
import Navbar from './components/navbar/Navbar.vue'; 
import NotificationModal from './components/note-editor/NotificationModal.vue'; 
import { RouterView } from 'vue-router';
import { useToast } from './composables/useToast'; 

const settings = inject('settings');
const isEditorOpen = ref(false);

// Global toast state
const { message, visible } = useToast();
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', sans-serif;
}

.header-panel {
  width: 100%;
  height: 42px;
  padding: 24px 0 12px 12px;
  border: 1px solid blue;
  background-color: var(--bg-color);
  position: fixed;
  margin-bottom: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
}

.main-content {
  width: 100%;
  height: auto;
  border: 1px solid fuchsia;
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
