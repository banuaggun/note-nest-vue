<template>
  <section class="deleted-notes">
    <div class="deleted-notes-header">
      <h2>Çöp Kutusu</h2>
    </div>
    <div class="deleted-notes-area">
<NoteList
      :notes="deletedNotes"
      @restore="restoreNote"
      @delete="deleteNotePermanently"
    />
    </div>
    
  </section>
</template>

<script setup>
import { useNotes } from '../composables/useNotes'
import NoteList from '../components/notes/NoteList.vue'

const { deletedNotes, archiveNote, deleteNotePermanently, restoreNote } = useNotes()

/*
function restoreNote(id) {
  archiveNote(id) // status: 'deleted' → 'archived' → 'active'
}
  */
</script>

<style scoped>
.deleted-notes {
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height:auto
}

.deleted-notes-header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; /* sabit yükseklik */
  background: white;
  border-bottom: 1px solid yellowgreen;
  display: flex;
  align-items: center;
  padding: 0 12px;
  margin-top:40px;
}

.deleted-notes-area{
  margin-top: 100px; 
}
</style>
