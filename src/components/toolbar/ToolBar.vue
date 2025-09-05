<template>
  <div>
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