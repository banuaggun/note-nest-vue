<template>
    <div v-if="visible" class="toast-container">
        <div class="toast-message">
            <p>{{ message }}</p>
            <button @click="close" class="close-btn" aria-label="Close">
                <i class="ph ph-x"></i>
            </button>

        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    visible: Boolean,
    message: String
})

const emit = defineEmits(['close'])

function close() {
    emit('close')
}
</script>

<style scoped>
.toast-container {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 1000;
}

.toast-message {
    background: var(--bg-color);
    color: var(--text-color);
    padding: 16px 20px;
    border-radius: 8px; 
    border:1px solid var(--c-u-border);
    box-shadow: var(--c-u-shadow);
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 240px;
    position: relative;
}

.close-btn {
    color: var(--text-color); 
    background-color:transparent;
    font-size: 18px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: auto;
    transition: transform 0.2s ease, color 0.2s ease;
}

.close-btn:hover {
    transform: scale(1.2);
}
</style>
