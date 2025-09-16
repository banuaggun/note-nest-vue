import { ref } from 'vue'

export const activeHeading = ref(null)

export function useHeadingMode() {
  function toggleHeading(level) {
    const tag = `h${level}`
    activeHeading.value = activeHeading.value === tag ? null : tag
  }

  return { activeHeading, toggleHeading }
}