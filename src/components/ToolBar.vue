<template>
    <div>
        <div class="button-group">
            <button class="btn" @click="emit('new-note')">
                <IconPencil/>
            </button>
            <button class="btn" @click="emit('new-note')">
                <IconBold />
            </button>
        </div>

        <div class="divider">
            <div>
                <button class="btn btn-remove" :disabled="disabled" @click="emit('remove-note')">
                    <i class="ph-fill ph-trash"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import IconBold from "./icons/editor/IconBold.vue"
import IconPencil from "./icons/editor/IconPencil.vue"

const emit = defineEmits(['new-note', 'remove-note']);

defineProps({
    disabled:Boolean
})
</script>

<style scoped>
.btn-remove{
    color:red;
    font-size:1.5rem;
}
</style>