import { watch, onMounted } from 'vue'

export function useLocalNoteStorage(selectedNote) {
  const storageKey = () => `note-${selectedNote.value?.id}`

  function loadNoteFromStorage() {
    const stored = localStorage.getItem(storageKey())
    if (stored) {
      selectedNote.value = JSON.parse(stored)
    }
  }

  function saveNoteToStorage() {
    if (selectedNote.value?.id) {
      localStorage.setItem(storageKey(), JSON.stringify(selectedNote.value))
      alert('Not kaydedildi!')
    }
  }

  function cancelNoteEdit() {
    const stored = localStorage.getItem(storageKey())
    if (stored) {
      selectedNote.value = JSON.parse(stored)
      alert('Değişiklikler geri alındı.')
    } else {
      alert('Geri alınacak bir kayıt bulunamadı.')
    }
  }

  onMounted(() => {
    if (selectedNote.value?.id) {
      loadNoteFromStorage()
    }
  })

  watch(() => selectedNote.value?.id, (newId) => {
    if (newId) {
      loadNoteFromStorage()
    }
  })

  return {
    saveNoteToStorage,
    cancelNoteEdit,
    loadNoteFromStorage
  }
}