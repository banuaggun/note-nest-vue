import { ref, computed } from 'vue'

//const notes = ref([])

const notes = ref(
  JSON.parse(localStorage.getItem('notes-data')) || []
)

const activeNoteId = ref(null)

export default function useNotes(){

  const updateStorage = () => localStorage.setItem('notes-data', JSON.stringify(notes.value))

  const createNote = () => {

    const id = Math.floor(Math.random()*1000)

    notes.value.unshift({
      id:id,
      title:'Untitled',
      body:'',
      updated: Date.now()
    })

    activeNoteId.value = id

    updateStorage()
  }

  const activeNote = computed(() => notes.value.find(note => note.id === activeNoteId.value))


  const allNotes = computed(() => notes.value.sort((a, b) => b.updated - a.updated))

  const setActiveNoteId = id => activeNoteId.value = id

  const updateNote = () => {
    activeNote.value.updated = Date.now()
    updateStorage()
  }

  const removeNote = () => {
    const index = notes.value.findIndex(note => note.id === activeNote.value.id)

    notes.value = notes.value.filter(note => note.id !== activeNote.value.id)

    updateStorage()

    let newIndex = 0

    if(index <= notes.value.length - 1){
      newIndex = index
    }else if(index > notes.value.length + 1){
      newIndex = index - 1
    }

    if(newIndex >= 0){
      setActiveNoteId(notes.value[newIndex].id)
    }
  }

  return{
    createNote, 
    setActiveNoteId,
    updateNote,
    removeNote,
    allNotes, 
    activeNote
  }
}

