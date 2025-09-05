<script setup>
import { ref } from 'vue'
import { useHeadingMode } from '../../composables/useHeadingMode'

const { activeHeading, toggleHeading } = useHeadingMode()
</script>

<template>
  <div class="header-controls">
    <div class="heading-buttons">
      <button
        v-for="level in 6"
        :key="level"
        :class="{ active: activeHeading === `h${level}` }"
        @click="toggleHeading(level)"
      >
        H{{ level }}
      </button>
    </div>
  </div>
</template>

<style scoped>
button.active {
  background-color: #cce;
  font-weight: bold;
}
</style>
