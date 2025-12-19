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
  padding: 4px 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  font-size: 14px;
  color: #444;
}

.text-style-controls button:hover {
  color: #000;
  cursor: pointer;
  background-color: #bdbdef;
}

.text-style-controls button.bold-btn.active,
.text-style-controls button.italic-btn.active,
.text-style-controls button.underline-btn.active {
  background-color: #9898e7;
  color: #000;
}
</style>
