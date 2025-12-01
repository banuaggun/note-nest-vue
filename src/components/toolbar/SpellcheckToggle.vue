<!-- components/editor/tools/SpellcheckToggle.vue -->
<script setup>
import { useSpellcheck } from '../../composables/functions/useSpellcheck'

const { isSpellcheckEnabled, toggleSpellcheck } = useSpellcheck()
</script>

<template>
  <div class="spellcheck-toggle">
    <button :class="{ active: isSpellcheckEnabled }" @click="toggleSpellcheck">
      Spell Check: {{ isSpellcheckEnabled ? 'On' : 'Off' }}
    </button>
  </div>
</template>

<style scoped>
.spellcheck-toggle button {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  font-size:14px;
  color:#444;
  text-align: center;
}

.spellcheck-toggle button:hover{
  color:#000;
  cursor:pointer;
  background-color: #BDBDEF;
}

.spellcheck-toggle button.active{
  background-color: #9898e7;
  font-weight: bold;
  color:#000;
}
</style>