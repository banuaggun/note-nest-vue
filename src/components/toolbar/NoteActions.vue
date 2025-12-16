<template>
  <div class="actions-item">
    <template v-if="note.status === 'archived'">
      <div class="item-buttons-2 actions-item-archive-page">
        <button @click="$emit('unarchive', note.id)">Unarchive</button>
        <button @click="$emit('delete', note.id)">Move To Trash</button>
      </div>
    </template>

    <template v-else-if="note.status === 'deleted'">
      <div class="item-buttons-2 actions-item-deleted-page">
        <button @click="$emit('restore', note.id)">Restore</button>
        <button @click="$emit('delete', note.id)">Delete Permanently</button>
      </div>
    </template>

    <template v-else>
      <div class="item-buttons actions-item-all-page">
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
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.actions-item {
  background: lightblue;
}
.item-buttons,
.item-buttons-2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background-color: lightcoral;
}
.item-buttons button {
  width: 40px;
  height: 40px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: none;
  outline: none;
}

.item-buttons-2 button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  outline: none;
  background-color: #ccc;
}

.item-buttons button:nth-child(2):hover,
.item-buttons button:nth-child(3):hover {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #242424;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 2px 2px 3px rgba(15, 139, 141, 0.2), 3px 5px 18px rgba(15, 139, 141, 0.1),
    4px 5px 13px rgba(15, 139, 141, 0.1), inset -0.5px -0.5px 5px rgba(15, 139, 141, 0.2),
    inset -0.5px -0.5px 1.5px rgba(255, 255, 255, 0.6),
    inset 0.5px 0.5px 4px rgba(255, 255, 255, 1),
    inset 2px 2px 12px rgba(15, 139, 141, 0.15),
    -2.5px -2.5px 7.5px rgba(255, 255, 255, 0.9);
  transform: scale(0.98);
}

.item-buttons button:nth-child(1):hover {
  display: flex;
  align-items: center;
  justify-content: center;
  color: 242424;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 2px 2px 3px rgba(254, 95, 85, 0.2), 3px 5px 18px rgba(254, 95, 85, 0.1),
    4px 5px 13px rgba(254, 95, 85, 0.1), inset -0.5px -0.5px 5px rgba(254, 95, 85, 0.2),
    inset -0.5px -0.5px 1.5px rgba(255, 255, 255, 0.6),
    inset 0.5px 0.5px 4px rgba(255, 255, 255, 1),
    inset 2px 2px 12px rgba(254, 95, 85, 0.15),
    -2.5px -2.5px 7.5px rgba(255, 255, 255, 0.9);
  transform: scale(0.98);
}

.item-buttons button i {
  font-size: 20px;
}

.item-buttons button:hover i {
  font-size: 24px;
}
</style>
