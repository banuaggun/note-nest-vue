<template>
  <div class="button-group">
    <button class="btn" @click="emit('format', 'unordered-list')">
      <span>• List</span>
    </button>
    <button class="btn" @click="emit('format', 'ordered-list')">
      <span>1. List</span>
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['format']);
</script>
