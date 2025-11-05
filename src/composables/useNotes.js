import { ref, onMounted } from 'vue'

export function useNotes() {
  const notes = ref([])
  const STORAGE_KEY = 'notes'

  const saveNotes = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes.value))
  }

  const fetchNotes = async () => {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (stored) {
      notes.value = JSON.parse(stored)
      return
    }

    try {
      const res = await fetch('/collect-data/notes.json')
      const data = await res.json()

      notes.value = data.map(note => ({
        ...note,
        deleted: note.deleted ?? false
      }))

      saveNotes()
    } catch (error) {
      console.error('Veri alınamadı:', error)
    }
  }

  /*
  const updateNote = (id, changes) => {
    const note = notes.value.find(n => n.id === id)
    if (note) {
      Object.assign(note, changes)
      saveNotes()
    }
  }
*/

const updateNote = (id, changes) => {
  const note = notes.value.find(n => n.id === id)
  if (!note) return

  const allowedFields = ['archived', 'deleted', 'title', 'content']
  for (const key in changes) {
    if (allowedFields.includes(key)) {
      note[key] = changes[key]
    }
  }

  saveNotes()
}

function createNote(noteData) {
  const id = Math.random().toString(36).substring(2, 9)

  const newNote = {
    id,
    title: noteData.title || 'untitled',
    content: noteData.content || '',
    archived: false,
    deleted: false
  }

  notes.value.push(newNote)
  localStorage.setItem('notes', JSON.stringify(notes.value))
  setActiveNote(id)
}


  onMounted(fetchNotes)

  return {
    notes,
    fetchNotes,
    saveNotes,
    updateNote, 
    createNote
  }
}