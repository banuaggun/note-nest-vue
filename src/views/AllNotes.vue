<template>
  <section class="all-notes">
    <div class="all-notes-header" v-if="!isEditorOpen">
      <h2>All Notes</h2>
      <button @click="startCreate" class="create-note">
        Create a New Note
      </button>
    </div>

    <div class="all-notes-area">
      <div
        v-if="(!isEditorOpen || !isMobile) && activeNotes.length === 0"
        class="empty-message"
      >
        <EmptyState
          title="No notes yet"
          description="Create your first note to get started"
          :image="image"
        />
      </div>

      <!-- The list is only available if the editor is closed. -->
      <div class="list-panel" v-if="!isEditorOpen || !isMobile">
        <NoteList
          :notes="activeNotes"
          @edit="startEdit"
          @delete="handleDelete"
          @archive="handleArchive"
          @unarchive="handleUnarchive"
          @restore="handleRestore"
          @delete-permanent="handleDeletePermanent"
        />
      </div>

      <!-- Editor only if editor is open -->
      <div class="editor-panel" v-if="isEditorOpen">
        <NoteEditor
          :note="editingNote"
          @save="handleSave"
          @cancel="handleCancel"
        />
      </div>

      <div v-if="!isEditorOpen && !isMobile" class="placeholder">
        <p>Select a note or create a new one. You can edit it here.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import image from "../assets/image/logo-icon.svg";
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
  margin-top: 100px;
  width: 100%;
}

.editor-panel {
  width: 100%;
  height: 800px;
}
.empty-message {
  text-align: center;
  padding: 40px 0;
  color: #888;
  font-size: 1.1rem;
}
</style>
