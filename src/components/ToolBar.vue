<template>
    <div>
        <div class="button-group">
            <button class="btn" @click="emit('new-note')" >
                <IconPencil/>
            </button>
            <button class="btn">
                <IconBold />
            </button>
        </div>
    </div>
</template>

<script setup>
import IconBold from "./icons/editor/IconBold.vue"
import IconPencil from "./icons/editor/IconPencil.vue"

const emit = defineEmits(['new-note']);
</script>

<style scoped>

</style>