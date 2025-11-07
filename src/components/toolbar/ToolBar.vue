<template>
  <div class="toolbar">
    <button @click="$emit('style', 'bold')"><strong>B</strong></button>
    <button @click="$emit('style', 'italic')"><em>I</em></button>
    <button @click="$emit('style', 'underline')"><u>U</u></button>
  </div>
</template>

<script setup>
defineEmits(['style'])
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.toolbar button {
  padding: 0.3rem 0.6rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>
