<template>
  <div class="toolbar">
     <HeadingControls :note="note" @update="handleUpdate" />
 
  </div>
</template>

<script setup>
import HeadingControls from "./HeadingControls.vue";

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