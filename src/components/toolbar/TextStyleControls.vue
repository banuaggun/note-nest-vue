<script setup>
const props = defineProps({
  isBold: Boolean,
  isItalic: Boolean,
  isUnderline: Boolean,
});
const emit = defineEmits(["applyStyle"]);

function apply(styleType) {
  emit("applyStyle", styleType);
}
</script>

<template>
  <div class="text-style-controls">
    <button @click="apply('bold')" :class="['bold-btn', { active: props.isBold }]">
      <strong>B</strong>
    </button>

    <button @click="apply('italic')" :class="['italic-btn', { active: props.isItalic }]">
      <em>I</em>
    </button>

    <button
      @click="apply('underline')"
      :class="['underline-btn', { active: props.isUnderline }]"
    >
      <u>U</u>
    </button>
  </div>
</template>

<style scoped>
.text-style-controls {
  display: flex;
  gap: 8px;
}

.text-style-controls button {
  padding: 6px 10px;
  border: 1px solid var(--c-u-border);
  background-color: var(--bg-color);
  cursor: pointer;
  font-size: 14px;
  color: var(--text-color);
}

.text-style-controls button:hover {
  color: var(--text-color);
  cursor: pointer; 
  box-shadow:var(--a-shadow); 
  background-color: var(--bg-color);
}

.text-style-controls button.bold-btn.active,
.text-style-controls button.italic-btn.active,
.text-style-controls button.underline-btn.active { 
  box-shadow:var(--a-shadow);
  background-color: var(--bg-color);
  color: var(--text-color);
}
</style>
