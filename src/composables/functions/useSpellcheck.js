import { ref } from 'vue'

export const isSpellcheckEnabled = ref(false)

export function useSpellcheck() {
  function toggleSpellcheck() {
    isSpellcheckEnabled.value = !isSpellcheckEnabled.value
  }

  return {
    isSpellcheckEnabled,
    toggleSpellcheck
  }
}