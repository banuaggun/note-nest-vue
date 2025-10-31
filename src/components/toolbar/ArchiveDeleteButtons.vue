<template>
  <div class="button-group">
    <button
      v-if="!note.archived && !note.deleted"
      @click="$emit('archive', note.id)"
    >
      Arşivle
    </button>
    <button
      v-if="note.archived && !note.deleted"
      @click="$emit('unarchive', note.id)"
    >
      Arşivden Çıkar
    </button>
    <button v-if="!note.deleted" @click="$emit('delete', note.id)">Sil</button>
    <button v-if="note.deleted" @click="$emit('restore', note.id)">
      Geri Al
    </button>
  </div>
</template>

<script setup>
defineProps({ note: Object });
defineEmits(["archive", "unarchive", "delete", "restore"]);
</script>

<style scoped>
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 1rem;
}

button {
  padding: 6px 12px;
  border: none;
  cursor: pointer;
}
</style>