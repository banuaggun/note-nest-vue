import { ref, computed } from 'vue'

const notes = ref([])

const updateStorage = () => {
  localStorage.setItem('notes-data', JSON.stringify(notes.value))
}

const loadNotesFromJson = async () => {
  try {
    const response = await fetch('/notes.json')
    const data = await response.json()
    notes.value = Array.isArray(data) ? data : data.notes || []
    updateStorage()
  } catch (error) {
    console.error('JSON dosyası yüklenemedi:', error)
  }
}

const createNote = () => {
  notes.value.unshift({
    id: Math.floor(Math.random() * 1000),
    title: '',
    content: '',
    updated: Date.now()
  })
  updateStorage()
}

const allNotes = computed(() =>
  notes.value.sort((a, b) => b.updated - a.updated)
)

export default function useNotes() {
  return {
    createNote,
    allNotes,
    loadNotesFromJson
  }
}
