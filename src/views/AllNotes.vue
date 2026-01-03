<template>
  <section class="all-notes">
    <div class="all-notes-header" v-if="!isMobile || !isEditorOpen">
      <h2>All Notes</h2>
      <button @click="startCreate" class="create-note">Create a New Note</button>
    </div>

    <div class="all-notes-area">
      <div v-if="(!isEditorOpen || !isMobile) && activeNotes.length === 0" class="empty-message">
        <EmptyState 
          title="No notes yet" 
          description="Create your first note to get started" 
          :image="createsNote" />
      </div>

      <!-- The list is only available if the editor is closed. -->
      <div class="list-panel" v-if="!isEditorOpen || !isMobile">
        <NoteList :notes="activeNotes" @edit="startEdit" @delete="handleDelete" @archive="handleArchive"
          @unarchive="handleUnarchive" @restore="handleRestore" @delete-permanent="handleDeletePermanent" />
      </div>

      <!-- Editor only if editor is open -->
      <div class="editor-panel" v-if="isEditorOpen">
        <NoteEditor :note="editingNote" @save="handleSave" @cancel="handleCancel" />
      </div>

      <div v-if="!isEditorOpen && !isMobile && activeNotes.length > 0" class="placeholder"> 
        <EmptyState title="Select a note or create a new note." description="You can edit it here." :image="createsNote" />
      </div>
    </div>
  </section>
</template>

<script setup>
import createsNote from "../assets/image/createNote.svg"; 
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useNotes } from "../composables/useNotes";
import { useToast } from "../composables/useToast";
import NoteList from "../components/notes/NoteList.vue";
import NoteEditor from "../components/note-editor/NoteEditor.vue";
import EmptyState from "../components/empty-states/EmptyState.vue";

// Get the toast function
const { showToast } = useToast();

// Define props and emit for v-model
const props = defineProps({ isEditorOpen: Boolean });
const emit = defineEmits(["update:isEditorOpen"]);

const {
  activeNotes,
  createNote,
  updateNote,
  archiveNote,
  deleteNote,
  deleteNotePermanently,
  restoreNote,
} = useNotes();

const selectedNote = defineModel();
const titleRef = ref(null);
const contentRef = ref(null);

const editingNote = ref(null);
const isMobile = ref(window.innerWidth <= 1025);

function updateIsMobile() {
  isMobile.value = window.innerWidth <= 1025;
}

onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});

function startCreate() {
  editingNote.value = { title: "", content: "" };
  emit("update:isEditorOpen", true);
}

function startEdit(note) {
  editingNote.value = note;
  emit("update:isEditorOpen", true);
}

function handleCancel() {
  showToast("Action canceled");
  closeEditor();
}

function closeEditor() {
  editingNote.value = null;
  emit("update:isEditorOpen", false);
}

watch(
  () => selectedNote.value || props.note,
  async (note) => {
    await nextTick();
    if (titleRef.value) titleRef.value.innerHTML = note?.title || "";
    if (contentRef.value) contentRef.value.innerHTML = note?.content || "";
  },
  { immediate: true }
);

function handleSave(noteData) {
  if (noteData.id != null) {
    updateNote(noteData);
    showToast("Note updated");
  } else {
    const newNote = createNote(noteData);
    editingNote.value = newNote;
    showToast("Note created");
  }
  closeEditor();
}

function handleDelete(id) {
  deleteNote(id);
  showToast("Note moved to trash");
}

function handleDeletePermanent(id) {
  deleteNotePermanently(id);
  showToast("Note permanently deleted");
}

function handleArchive(id) {
  archiveNote(id);
  showToast("Note archived");
}

function handleUnarchive(id) {
  archiveNote(id);
  showToast("Note unarchived");
}

function handleRestore(id) {
  restoreNote(id);
  showToast("Note restored");
}
</script>

<style scoped>
.all-notes {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; 
  background-color: var(--bg-color);
} 

.all-notes-area > .empty-message{
  min-width:100%; 
  overflow-x: hidden !important;
  height:100%; 
  display:flex; 
  flex-direction:column;
  align-items: center; 
  justify-content:  center;
}

.all-notes-header {
  position: fixed;
  left: 0;
  width: 100%;
  height: 60px;
  background: var(--bg-color);
  border-bottom: 1px solid yellowgreen;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
}

.all-notes-header h2{
  color:var(--text-color);
}

.create-note {
  background-color: #9dbebc;
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
  background-color: #78a5a3;
}

.all-notes-area {
  width: 100%;
}

.list-panel {
  margin-top: 60px;
}

.editor-panel {
  width: 100%;
  height: auto;
}

.empty-message {
  text-align: center;
  padding: 40px 0;
  color: #888;
  font-size: 1.1rem;
} 

@media only screen and (min-width:760px){
   .all-notes-header{
    padding:0 48px;
  }
}
 
@media only screen and (min-width: 1026px) {
  .all-notes-area {
    display: flex;
    flex-direction: row;
    height: calc(100vh - 60px);
  } 

  .list-panel {
    width: 30%;
    border-right: 1px solid #ddd;
    overflow-y: auto;
    margin-top: 60px;
  }

  .editor-panel,
  .placeholder {
    width: 70%;
    padding: 20px;
    overflow-y: auto;
    margin-top: 60px;
  }

  .placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #777;
    font-size: 1.1rem;
    text-align: center;
  }
}
</style>
