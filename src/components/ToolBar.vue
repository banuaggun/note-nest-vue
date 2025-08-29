<template>
    <div v-if="selectedNote && selectedNote.id">
        <div class="button-group">
            <button class="btn" @click="emit('edit-note', selectedNote)" aria-label="Edit note">
                <IconPencil/> 
                <span>Edit</span>
            </button>
            <button class="btn" @click="emit('format-bold')" :class="{ active: isBoldActive }" aria-label="Bold">
  <IconBold />
  <span>Bold</span>
</button>

        </div>

        <div class="divider">
            <div>
                <button class="btn btn-remove" :disabled="disabled" @click="emit('remove-note')">
                    <IconTrash/>
                </button>
            </div>
        </div>

        <div class="note-warning">
            <p>
                Click on the edit button to write something.
            </p>
        </div>
    </div>
</template>

<script setup>
import IconBold from "./icons/editor/IconBold.vue"
import IconPencil from "./icons/editor/IconPencil.vue"
import IconTrash from "./icons/editor/IconTrash.vue";

const emit = defineEmits(['new-note', 'remove-note', 'edit-note']);

defineProps({
    disabled:Boolean,
    selectedNote: Object,  // veya null olabilir 
    isBoldActive: Boolean
})
</script>

<style scoped>
.btn-remove{
    color:red;
    font-size:1.5rem;
}
.active {
  background-color: #e0e0ff;
  border: 1px solid #4f46e5;
  color: #4f46e5;
}

</style>