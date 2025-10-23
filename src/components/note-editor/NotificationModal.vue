<template>
    <div v-if="visible" class="toast-container">
        <div class="toast-message">
            <p>{{ message }}</p>
            <button @click="close" class="close-btn" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path
                        d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 0 0-1.41 1.41L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4z" />
                </svg>
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
    background: #323232;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 240px;
    position: relative;
}

.close-btn {
    background: #4CAF50;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: auto;
    transition: transform 0.2s ease, color 0.2s ease;
}

.close-btn:hover {
    transform: scale(1.2);
    background-color: #ff6b6b;
}
</style>
