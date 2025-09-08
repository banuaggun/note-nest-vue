import { ref, computed, onMounted } from 'vue'

export function useNotes() {
  const notes = ref([])
  const isLoading = ref(true)

  // JSON'dan veriyi çek
  const fetchNotes = async () => {
    try {
      const res = await fetch('/collect-data/notes.json')
      const data = await res.json()
      notes.value = data
    } catch (error) {
      console.error('Veri alınamadı:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Etiketle filtreleme
  const filterByTag = (tag) => {
    return notes.value.filter(note => note.tags.includes(tag))
  }

  // Arşivlenmiş notlar
  const archivedNotes = computed(() =>
    notes.value.filter(note => note.archived)
  )

  // Aktif notlar
  const activeNotes = computed(() =>
    notes.value.filter(note => !note.archived)
  )

  onMounted(fetchNotes)

  return {
    notes,
    isLoading,
    fetchNotes,
    filterByTag,
    archivedNotes,
    activeNotes
  }
}