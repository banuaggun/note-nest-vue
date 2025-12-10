<template>
  <section class="all-notes">
    <div class="all-notes-header" v-if="!isEditorOpen">
      <h2>All Notes</h2>
      <button @click="startCreate" class="create-note">
        Create a New Note
      </button>
    </div>

    <div class="all-notes-area">
      <!-- Liste sadece editor kapalıysa -->
      <div class="list-panel" v-if="!isEditorOpen || !isMobile">
        <NoteList
          :notes="activeNotes"
          @edit="startEdit"
          @delete="deleteNote"
          @archive="archiveNote"
        />
      </div>

      <!-- Editor sadece editor açıksa -->
      <div class="editor-panel" v-if="isEditorOpen">
        <NoteEditor
          :note="editingNote"
          @save="handleSave"
          @cancel="closeEditor"
        />
      </div>

      <div v-if="!isEditorOpen && !isMobile" class="placeholder">
        <p>
          Bir not seçin ya da yeni bir not oluşturun. Burada düzenleme
          yapabilirsiniz.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useNotes } from "../composables/useNotes";
import NoteList from "../components/notes/NoteList.vue";
import NoteEditor from "../components/note-editor/NoteEditor.vue";

// v-model için props ve emit tanımla
const props = defineProps({ isEditorOpen: Boolean });
const emit = defineEmits(["update:isEditorOpen"]);

const { activeNotes, createNote, updateNote, archiveNote, deleteNote } = useNotes();  
const selectedNote = defineModel(); 
const titleRef = ref(null);
const contentRef = ref(null);

const editingNote = ref(null);
const isMobile = ref(window.innerWidth <= 641);

function updateIsMobile() {
  isMobile.value = window.innerWidth <= 641;
}

onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});

function startCreate() {
  //editingNote.value = null; 
    editingNote.value = { title: "", content: "" }; 
  emit("update:isEditorOpen", true); // App.vue’deki state’i aç
}

function startEdit(note) {
  editingNote.value = note;
  emit("update:isEditorOpen", true);
}

function closeEditor() {
  editingNote.value = null;
  emit("update:isEditorOpen", false); // App.vue’deki state’i kapat
}

watch(
  () => selectedNote.value || props.note,
  async (note) => {
    await nextTick();
    if (titleRef.value) {
      titleRef.value.innerHTML = note?.title || "";
    }
    if (contentRef.value) {
      contentRef.value.innerHTML = note?.content || "";
    }
  },
  { immediate: true }
);

function handleSave(noteData) {
  if (noteData.id != null) {
    updateNote(noteData); 
  } else { 
     const newNote = createNote(noteData);
    editingNote.value = newNote;
    //createNote(noteData);
  }
  closeEditor();
}
</script>

<style scoped>
.all-notes {
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.all-notes-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: var(--bg-color);
  border-bottom: 1px solid yellowgreen;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  margin-top: 40px;
}

.create-note {
  background-color: #9DBEBC;
  color: #242424;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  outline: none;
  font-weight: 600;
  letter-spacing: 0.2px;
}
.create-note:hover,
.create-note.active {
  background-color: #78A5A3;
}

.all-notes-area {
  margin-top: 100px;
  width: 100%;
}

.editor-panel {
  width: 100%;
  height: 800px;
}
</style>
