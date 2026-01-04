<script setup>
import { useSpellcheck } from '../../composables/functions/useSpellcheck'

const { isSpellcheckEnabled, toggleSpellcheck } = useSpellcheck() 

const emit = defineEmits(["applySpellcheck"]) 

function handleToggle() {
  toggleSpellcheck()
  emit("applySpellcheck", isSpellcheckEnabled.value)
}
</script>

<template>
  <div class="spellcheck-toggle">
    <button :class="{ active: isSpellcheckEnabled }" @click="handleToggle">
      Spell Check: {{ isSpellcheckEnabled ? 'On' : 'Off' }}
    </button>
  </div>
</template>

<style scoped>
.spellcheck-toggle button {
  padding: 8px 14px;
  border: 1px solid var(--c-u-border);
  background-color: var(--bg-color);
  cursor: pointer;
  font-size:14px;
  color:var(--text-color);
  text-align: center;
}

.spellcheck-toggle button:hover{
  color:var(--text-color);
  cursor:pointer;
  background-color: var(--bg-color); 
  box-shadow:var(--a-shadow);
}

.spellcheck-toggle button.active{
  background-color: var(--bg-color); 
  box-shadow: var(--a-shadow);
  font-weight: bold;
  color:var(--text-color);
}
</style>