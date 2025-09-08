import { ref } from 'vue'

const isBold = ref(false)
const isItalic = ref(false)
const isUnderline = ref(false)

function toggleBold() {
  isBold.value = !isBold.value
}
function toggleItalic() {
  isItalic.value = !isItalic.value
}
function toggleUnderline() {
  isUnderline.value = !isUnderline.value
}

export function useTextFormatting() {
  return {
    isBold,
    isItalic,
    isUnderline,
    toggleBold,
    toggleItalic,
    toggleUnderline
  }
}