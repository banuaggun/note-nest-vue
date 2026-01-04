<script setup>
import {
  fontFamily,
  availableFonts,
  setFontFamily,
} from "../../composables/functions/useFontFamily.js";
const emit = defineEmits(["applyFont"]);

function handleChange(event) {
  const selectedFont = event.target.value;
  setFontFamily(selectedFont);
  emit("applyFont", selectedFont);
}
</script>

<template>
  <div class="font-family-selector">
    <i class="ph ph-text-aa"></i>
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
  background-color: var(--bg-color);
}

select {
  padding: 6px 10px 6px 10px;  
  background-color:var(--bg-color); 
  color:var(--text-color); 
  border:1px solid var(--c-u-border); 
  outline:none; 
}
.font-family-selector i {
  font-size: 28px; 
  color:var(--text-color);
} 
select:hover, select.active{
  box-shadow:var(--a-shadow);
}
</style>
