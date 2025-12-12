<template>
  <div class="empty-state">
    <img v-if="image" :src="image" alt="image" class="empty-image" />

    <h3>{{ title }}</h3>
    <p>{{ description }}</p>

    <button v-if="buttonText" @click="$emit('button-click')">
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  image: String,
  buttonText: String
});
</script>

<style scoped>
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #777;
}
.empty-image {
  width: 180px;
  height:auto;
  opacity: 0.8;
  margin-bottom: 20px;
}
</style>
