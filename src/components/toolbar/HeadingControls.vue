<script setup>
import { ref } from 'vue'
import { useHeadingMode } from '../../composables/functions/useHeadingMode'

const { activeHeading, toggleHeading } = useHeadingMode()
</script>

<template>
  <div class="header-controls">
    <div class="text-style-controls">
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
.text-style-controls{
  border:1px solid black;
  display: flex;
  width:max-content;
  gap:12px;
}

.text-style-controls button {
  padding: 4px 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  font-size:14px;
  color:#444;
}

.text-style-controls button:hover{
  color:#000;
  cursor:pointer;
  background-color: #BDBDEF;
}

.text-style-controls button.active{
  background-color: #9898e7;
  font-weight: bold;
  color:#000;
}

</style>