<template>
  <div class="actions">
    <template v-if="note.status === 'archived'">
      <button @click="$emit('unarchive', note.id)">Geri Al</button>
      <button @click="$emit('delete', note.id)">Kalıcı Olarak Sil</button>
    </template>

    <template v-else-if="note.status === 'deleted'">
      <button @click="$emit('restore', note.id)">Çöp Kutusundan Çıkar</button>
      <button @click="$emit('delete', note.id)">Kalıcı Olarak Sil</button>
    </template>

    <template v-else>
      <button @click="$emit('edit', note)">Düzenle</button>
      <button @click="$emit('delete', note.id)">Sil</button>
      <button @click="$emit('archive', note.id)">Arşivle</button>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.actions button {
  margin-right: 0.5rem;
}
</style>
