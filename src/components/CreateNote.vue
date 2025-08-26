<template>
  <div class="create-btn-area">
    <button class="create-btn" @click="emit('new-note')">
      <IconCreate class="icon" /> Create a New Note
    </button>
  </div>
</template>

<script setup>
import IconCreate from "./icons/buttons/IconCreate.vue";

const emit = defineEmits(["new-note"]);
</script>

<style scoped>
.create-btn-area {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.create-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  border-radius: 8px;
  width: 100%;
  background-color: var(--link-color-two);
  border: none;
}
.create-btn .icon {
  width: 24px;
  height: 24px;
}

.create-btn:hover {
  background-color: var(--link-color);
}
</style>
