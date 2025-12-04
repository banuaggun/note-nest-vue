import { ref, computed, watch, onMounted } from 'vue'

const STORAGE_KEY = 'note-app-data'

export function useNotes() {
  const notes = ref([])

  // LocalStorage'tan veri yükle
  function loadFromLocalStorage() {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        notes.value = JSON.parse(saved)
      } catch (e) {
        console.error('LocalStorage verisi bozuk:', e)
      }
    }
  }

  // JSON dosyasından veri yükle (ilk kullanımda)
  async function loadFromJson() {
    try {
      const res = await fetch('/collect-data/notes.json')
      const jsonData = await res.json()
      if (notes.value.length === 0) {
        notes.value = jsonData
      }
    } catch (error) {
      console.error('notes.json yüklenemedi:', error)
    }
  }

  // notes değiştiğinde LocalStorage'a kaydet
  watch(notes, (newNotes) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newNotes))
  }, { deep: true })

  onMounted(() => {
    loadFromLocalStorage()
    loadFromJson()
  })

  // Filtrelenmiş listeler
  const activeNotes = computed(() =>
    notes.value.filter(note => note.status === 'active')
  )

  const archivedNotes = computed(() =>
    notes.value.filter(note => note.status === 'archived')
  )

  const deletedNotes = computed(() =>
    notes.value.filter(note => note.status === 'deleted')
  )

  // Yeni not oluştur
  function createNote({ title, content, tags = [] }) {
    const newNote = {
      id: Date.now(),
      title,
      content,
      tags,
      status: 'active'
    }
    notes.value.push(newNote) 
    return newNote; 
  }

  // Var olan notu güncelle
  function updateNote(updatedNote) {
    const index = notes.value.findIndex(n => n.id === updatedNote.id)
    if (index !== -1) {
      notes.value[index] = { ...notes.value[index], ...updatedNote }
    }
  }

  // Notu arşivle / geri al
  function archiveNote(id) {
    const note = notes.value.find(n => n.id === id)
    if (note) {
      note.status = note.status === 'archived' ? 'active' : 'archived'
    }
  }

  // Notu sil (soft delete)
  function deleteNote(id) {
    const note = notes.value.find(n => n.id === id)
    if (note) {
      note.status = 'deleted'
    }
  }

  // Notu kalıcı olarak sil (hard delete)
  function deleteNotePermanently(id) {
    notes.value = notes.value.filter(n => n.id !== id)
  }

  function restoreNote(id) {
  const note = notes.value.find(n => n.id === id)
  if (note && note.status === 'deleted') {
    note.status = 'active'
  }
}


  return {
    notes,
    activeNotes,
    archivedNotes,
    deletedNotes,
    createNote,
    updateNote,
    archiveNote,
    deleteNote,
    deleteNotePermanently, 
    restoreNote
  }
}
