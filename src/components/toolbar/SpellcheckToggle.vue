<script setup>
import { useSpellcheck } from '../../composables/functions/useSpellcheck'

const { isSpellcheckEnabled, toggleSpellcheck } = useSpellcheck()
</script>

<template>
  <div class="spellcheck-toggle">
    <button :class="{ active: isSpellcheckEnabled }" @click="toggleSpellcheck">
      Yazım Denetimi: {{ isSpellcheckEnabled ? 'Açık' : 'Kapalı' }}
    </button>
  </div>
</template>

<style scoped>
.spellcheck-toggle button {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}
button.active {
  background-color: #cce;
  font-weight: bold;
}
</style>