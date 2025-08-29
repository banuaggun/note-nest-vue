<template>
  <div class="button-group">
    <button class="btn" @click="emit('edit-note', selectedNote)" aria-label="Edit note">
      <IconPencil />
      <span>Edit</span>
    </button>

    <button class="btn btn-remove" :disabled="disabled" @click="emit('remove-note')">
      <IconTrash />
    </button>
  </div>
</template>

<script setup>
import IconPencil from "../icons/editor/IconPencil.vue";
import IconTrash from "../icons/editor/IconTrash.vue";

const emit = defineEmits(['edit-note', 'remove-note']);

defineProps({
  disabled: Boolean,
  selectedNote: Object
});
</script>

<style scoped>
.btn-remove {
  color: red;
  font-size: 1.5rem;
}
</style>
