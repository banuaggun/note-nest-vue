<template>
  <div class="toolbar">
     <HeadingControls :note="note" @update="handleUpdate" />
     <TextStyleControls />
     <SpellcheckToggle />
  </div>
</template>

<script setup>
import HeadingControls from "./HeadingControls.vue";
import SpellcheckToggle from "./SpellcheckToggle.vue";
import TextStyleControls from "./TextStyleControls.vue";

defineProps({ note: Object })
const emit = defineEmits(['update'])

function handleUpdate(updatedNote) {
  emit('update', updatedNote)
}
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
</style>