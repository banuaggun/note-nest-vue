import { ref } from 'vue'

export const isBold = ref(false)
export const isItalic = ref(false)
export const isUnderline = ref(false) 


export function useTextFormatting() {
  function toggleStyle(styleType) {
    if (styleType === 'bold') isBold.value = !isBold.value
    if (styleType === 'italic') isItalic.value = !isItalic.value
    if (styleType === 'underline') isUnderline.value = !isUnderline.value
  }

  return {
    isBold,
    isItalic,
    isUnderline,
    toggleStyle
  }
} 
