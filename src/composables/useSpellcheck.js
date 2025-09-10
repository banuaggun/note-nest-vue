import { ref } from 'vue'

const isSpellcheckEnabled = ref(false)

function toggleSpellcheck() {
  isSpellcheckEnabled.value = !isSpellcheckEnabled.value
}

export function useSpellcheck() {
  return {
    isSpellcheckEnabled,
    toggleSpellcheck
  }
}