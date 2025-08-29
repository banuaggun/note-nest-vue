<template>
  <div class="button-group">
    <!-- Örnek: H1 butonu -->
    <button class="btn" @click="emit('format', 'h1')">
      <span>H1</span>
    </button>
    <!-- Diğer başlıklar buraya eklenebilir -->
  </div>
</template>

<script setup>
const emit = defineEmits(['format']);
</script>
