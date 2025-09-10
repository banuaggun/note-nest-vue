<script setup>
const emit = defineEmits(['applyStyle'])

function apply(styleType) {
  emit('applyStyle', styleType)
}
</script>

<template>
  <div class="text-style-controls">
    <button @click="apply('bold')"><strong>B</strong></button>
    <button @click="apply('italic')"><em>I</em></button>
    <button @click="apply('underline')"><u>U</u></button>
  </div>
</template>

<style scoped>
.text-style-controls button {
  margin-right: 6px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}
</style>