<script setup>
import { fontFamily, availableFonts, setFontFamily } from '../../composables/functions/useFontFamily.js';
const emit = defineEmits(['applyFont']);

function handleChange(event) {
  const selectedFont = event.target.value;
  setFontFamily(selectedFont);
  emit('applyFont', selectedFont);
}
</script>

<template>
  <div class="font-family-selector">
    <label for="font-select">Font Family:</label>
    <select id="font-select" v-model="fontFamily" @change="handleChange" selected>
      <option v-for="font in availableFonts" :key="font" :value="font">
        {{ font }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.font-family-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}

select {
  padding: 4px 8px;
}
</style>