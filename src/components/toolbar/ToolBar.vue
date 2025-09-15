<script setup>
import HeadingControls from "./HeadingControls.vue";
import TextStyleControls from "./TextStyleControls.vue";
import SpellcheckToggle from "./SpellcheckToggle.vue";

const props = defineProps({
  note: Object,
  isBold: Boolean,
  isItalic: Boolean,
  isUnderline: Boolean
})


const emit = defineEmits(["update", "applyStyle"]);

function handleUpdate(updatedNote) {
  emit("update", updatedNote);
}

function handleStyle(styleType) {
  emit("applyStyle", styleType);
}
</script>

<template>
  <div class="toolbar">
    <HeadingControls :note="note" @update="handleUpdate" />
    <TextStyleControls
      :isBold="isBold"
      :isItalic="isItalic"
      :isUnderline="isUnderline"
      @applyStyle="handleStyle"
    />

    <SpellcheckToggle />
  </div>
</template>