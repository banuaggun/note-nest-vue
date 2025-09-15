<script setup>
const props = defineProps({
  isBold: Boolean,
  isItalic: Boolean,
  isUnderline: Boolean
})
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

<button @click="apply('underline')" :class="['underline-btn', { active: props.isUnderline }]">
  <u>U</u>
</button>

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
.text-style-controls button.bold-btn.active,
.text-style-controls button.italic-btn.active,
.text-style-controls button.underline-btn.active{
  background-color: fuchsia !important;
  border-color: #999;
}


</style>