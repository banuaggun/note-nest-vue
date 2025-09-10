<script setup>
import HeadingControls from './HeadingControls.vue'
import TextStyleControls from './TextStyleControls.vue'
import SpellcheckToggle from './SpellcheckToggle.vue'

defineProps({ note: Object })
const emit = defineEmits(['update', 'applyStyle'])

function handleUpdate(updatedNote) {
  emit('update', updatedNote)
}

function handleStyle(styleType) {
  emit('applyStyle', styleType)
}
</script>

<template>
  <div class="toolbar">
    <HeadingControls :note="note" @update="handleUpdate" />
    <TextStyleControls @applyStyle="handleStyle" />
    <SpellcheckToggle />
  </div>
</template>