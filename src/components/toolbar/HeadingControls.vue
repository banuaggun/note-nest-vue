<script setup>
import { ref } from "vue";
import { useHeadingMode } from "../../composables/functions/useHeadingMode";

const { activeHeading, toggleHeading } = useHeadingMode();

const emit = defineEmits(["applyHeading"]);


</script>

<template>
  <div class="header-controls">
    <div class="text-style-controls">
      <button v-for="level in 6" :key="level" :class="{ active: activeHeading === `h${level}` }" @click="
        () => {
          toggleHeading(level);
          emit('applyHeading', level);
        }
      ">
        <!-- @click="toggleHeading(level)"-->
        H{{ level }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.text-style-controls {
  display: flex;
  gap: 8px;
}

.text-style-controls button {
  padding: 6px 8px;
  border: 1px solid var(--c-u-border);
  background-color: var(--bg-color);
  cursor: pointer;
  font-size: 14px;
  color: var(--text-color);
}

.text-style-controls button:hover {
  color: var(--text-color);
  cursor: pointer;
  background-color: var(--bg-color);
  box-shadow: var(--a-shadow);
}

.text-style-controls button.active {
  background-color: var(--bg-color);
  box-shadow: var(--a-shadow);
  font-weight: bold;
  color: var(--text-color);
}
</style>
