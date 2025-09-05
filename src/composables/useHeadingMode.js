import { ref } from 'vue'

const activeHeading = ref(null)

function toggleHeading(level) {
  const tag = `h${level}`
  activeHeading.value = activeHeading.value === tag ? null : tag
}

export function useHeadingMode() {
  return { activeHeading, toggleHeading }
}
