import { ref } from 'vue'

export const activeColor = ref('#000000')

export function useTextColor() {
  function setColor(color) {
    activeColor.value = color
  }

  return {
    activeColor,
    setColor
  }
}