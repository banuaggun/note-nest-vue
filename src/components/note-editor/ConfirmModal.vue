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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px; /* küçük ekranlarda taşmayı engeller */
  backdrop-filter: blur(2px);
  animation: fadeIn 0.2s ease-out;
}

.modal {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 380px; /* masaüstünde genişlik */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  animation: scaleIn 0.25s ease-out;
}

.modal p {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
  text-align: center;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.modal-actions button {
  flex: 1;
  padding: 10px 0;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  transition: 0.2s;
}

.modal-actions button:first-child {
  background: #e74c3c;
  color: white;
}

.modal-actions button:first-child:hover {
  background: #c0392b;
}

.modal-actions button:last-child {
  background: #ddd;
}

.modal-actions button:last-child:hover {
  background: #cfcfcf;
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
