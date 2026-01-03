<template>
  <div class="actions-item">
    <template v-if="note.status === 'archived'">
      <div class="item-buttons-2 actions-item-archive-page">
        <button @click="$emit('unarchive', note.id)">
          <!-- unarchive -->
          <i class="ph ph-box-arrow-up"></i>
        </button>
        <button @click="$emit('delete', note.id)">
          <!-- move to trash -->
          <i class="ph ph-trash"></i>
        </button>
      </div>
    </template>

    <template v-else-if="note.status === 'deleted'">
      <div class="item-buttons-2 actions-item-deleted-page">
        <button @click="$emit('restore', note.id)">
          <!-- restore -->
          <i class="ph ph-recycle"></i>
        </button>
        <button @click="confirmPermanentDelete(note.id)">Delete</button>
      </div>

      <ConfirmModal
        v-if="showModal"
        message="Do you want to permanently delete this note?"
        @confirm="handleConfirm"
        @close="handleClose"
      />
    </template>

    <template v-else>
      <div class="item-buttons actions-item-all-notes-page">
        <button @click="$emit('delete', note.id)">
          <i class="ph ph-trash"></i>
        </button>
        <button @click="$emit('archive', note.id)">
          <i class="ph ph-box-arrow-down"></i>
        </button>
        <button @click="$emit('edit', note)">
          <i class="ph ph-pencil-line"></i>
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ConfirmModal from "../note-editor/ConfirmModal.vue";

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete"]);
const showModal = ref(false);
let selectedId = null;

function confirmPermanentDelete(id) {
  selectedId = id;
  showModal.value = true;
}

function handleConfirm() {
  emit("delete", selectedId);
  showModal.value = false;
}

function handleClose() {
  showModal.value = false;
}
</script>

<style scoped>
.actions-item {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.actions-item-all-notes-page,
.actions-item-archive-page,
.actions-item-deleted-page {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.actions-item-all-notes-page button,
.actions-item-archive-page button,
.actions-item-deleted-page button:nth-child(1) {
  width: 40px;
  height: 40px;
  background-color: transparent; 
  color:var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: none;
  outline: none;
}

.actions-item-deleted-page button:nth-child(2) {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  outline: none;
  border:1px solid var(--d-border); 
  background-color:transparent;
  color: var(--button-text);
}


.actions-item-all-notes-page button:hover,
.actions-item-archive-page button:hover,
.actions-item-deleted-page button:nth-child(1):hover {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #242424;
  background: #fff;
  border-radius: 50%;
  cursor: pointer; 
  transform: scale(0.98);
} 

.actions-item-all-notes-page button:nth-child(1):hover, .actions-item-archive-page button:nth-child(2):hover, .actions-item-deleted-page button:nth-child(2):hover{
  box-shadow: var(--d-shadow); 
  background-color: var(--bg-color); 
  color:var(--text-color);
} 

.actions-item-all-notes-page button:nth-child(2):hover, 
.actions-item-archive-page button:nth-child(1):hover{
  box-shadow: var(--a-shadow); 
  background-color: var(--bg-color); 
  color:var(--text-color);
} 

.actions-item-all-notes-page button:nth-child(3):hover{
  box-shadow: var(--c-u-shadow); 
  background-color: var(--bg-color); 
  color:var(--text-color);
} 

.actions-item-deleted-page button:nth-child(1):hover {
  box-shadow: var(--r-s-shadow); 
  background-color: var(--bg-color); 
  color:var(--text-color)
}

.actions-item-all-notes-page button i,
.actions-item-archive-page button i,
.actions-item-deleted-page button:nth-child(1) i {
  font-size: 20px;
}

.actions-item-all-notes-page button:hover i,
.actions-item-archive-page button:hover i,
.actions-item-deleted-page button:nth-child(1):hover i {
  font-size: 24px;
}
</style>
