import { ref, computed } from "vue";

const notes = ref(
  JSON.parse(localStorage.getItem("notes-data")) || []
);

//const activeNoteId = ref(
  //Number(localStorage.getItem("active-note-id")) || null
//);

const activeNoteId = ref(null) // artık localStorage'dan yüklenmiyor


export default function useNotes() {
  const updateStorage = () => {
    localStorage.setItem("notes-data", JSON.stringify(notes.value));
    //localStorage.setItem("active-note-id", activeNoteId.value ?? "");
  };

  const createNote = () => {
    //const id = Math.floor(Math.random() * 1000);

    const id = Date.now() + Math.floor(Math.random() * 1000);

    notes.value.unshift({
      id: id,
      title: "Untitled",
      content: "",
      updated: Date.now(),
      timestamp: new Date().toISOString(),
      tags: [],
    });

    activeNoteId.value = id;
    updateStorage();
  };

  const activeNote = computed(() => {
    if (!activeNoteId.value) return null;
    return notes.value.find((note) => note.id === activeNoteId.value) || null;
  });

  const allNotes = computed(() =>
    notes.value.sort((a, b) => b.updated - a.updated)
  );

  const setActiveNoteId = (id) => {
    activeNoteId.value = id;
    updateStorage();
  };

  const updateNote = (field, value) => {
    if (activeNote.value) {
      activeNote.value[field] = value;
      activeNote.value.updated = Date.now();
      updateStorage();
    }
  };

  const loadNotesFromJson = () => {
    const storedNotes = JSON.parse(localStorage.getItem("notes-data")) || [];
    //const storedActiveId = localStorage.getItem("active-note-id");

    notes.value = storedNotes;
    //activeNoteId.value = storedActiveId ? Number(storedActiveId) : null;
    activeNoteId.value = null;
  };

  const removeNote = () => {
    const index = notes.value.findIndex(
      (note) => note.id === activeNote.value?.id
    );

    notes.value = notes.value.filter(
      (note) => note.id !== activeNote.value?.id
    );

    updateStorage();

    if (notes.value.length > 0) {
      const newIndex = Math.min(index, notes.value.length - 1);
      setActiveNoteId(notes.value[newIndex].id);
    } else {
      activeNoteId.value = null;
      updateStorage();
    }
  };

  return {
    createNote,
    setActiveNoteId,
    updateNote,
    removeNote,
    allNotes,
    activeNote,
    loadNotesFromJson,
  };
}
