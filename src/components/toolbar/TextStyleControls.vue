<script setup>
import { useTextFormatting } from '../../composables/useTextFormatting.js'

const {
  isBold,
  isItalic,
  isUnderline,
  toggleBold,
  toggleItalic,
  toggleUnderline
} = useTextFormatting()
</script>

<template>
  <div class="text-style-controls">
    <button :class="{ active: isBold }" @click="toggleBold"><strong>B</strong></button>
    <button :class="{ active: isItalic }" @click="toggleItalic"><em>I</em></button>
    <button :class="{ active: isUnderline }" @click="toggleUnderline"><u>U</u></button>
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

button.active {
  background-color: #cce;
  font-weight: bold;
}
</style>