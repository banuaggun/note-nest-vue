<template>
  <div class="button-group">
    <button @click="onSave" class="save-btn">Save</button>
    <button @click="onCancel" class="cancel-btn">Cancel</button>
  </div>
</template>

<script setup>
defineProps({
  onSave: Function,
  onCancel: Function
})
</script>

<style scoped>
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 1rem;
}
.save-btn {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}
.cancel-btn {
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}
</style>