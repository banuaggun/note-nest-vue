<template>
  <div class="modal-backdrop" @click="close">
    <div class="modal" @click.stop>
      <p>{{ message }}</p>

      <div class="modal-actions">
        <button @click="confirm">Delete</button>
        <button @click="close">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: String,
});

const emit = defineEmits(["confirm", "close"]);

function confirm() {
  emit("confirm");
}

function close() {
  emit("close");
}
</script>

<style>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45); 
  color:var(--text-color); 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px; 
  backdrop-filter: blur(2px);
  animation: fadeIn 0.2s ease-out;
}

.modal {
  background: var(--bg-color); 
  color:var(--text-color);
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 380px; 
  box-shadow: 0 8px 24px var(--c-u-shadow);
  animation: scaleIn 0.25s ease-out;
}

.modal p {
  margin-bottom: 20px;
  font-size: 16px;
  color: var(--text-color);
  text-align: center;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.modal-actions button {
  flex: 1;
  padding: 12px 0;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  transition: 0.2s; 
  color: var(--text-color);
}

.modal-actions button:first-child {
  border:1px solid var(--d-border); 
  background-color: var(--bg-color);
  color: var(--text-color);
}

.modal-actions button:first-child:hover {
  box-shadow:var(--d-hover); 
  color: var(--text-color); 
}

.modal-actions button:last-child {
  background: var(--bg-color);  
  border:1px solid var(--c-u-border);
  color: var(--text-color);
}

.modal-actions button:last-child:hover {
  background: var(--bg-color);  
  box-shadow: var(--c-u-shadow);
  color: var(--text-color);
}

/* Animasyonlar */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.85);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Mobil uyumluluk */
@media (max-width: 350px) {
  .modal {
    padding: 20px;
    max-width: 100%;
  }

  .modal-actions button {
    font-size: 14px;
    padding: 8px 0;
  }
}
</style>
