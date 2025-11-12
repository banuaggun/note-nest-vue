<template>
  <div class="note-editor">
    <Toolbar
      :isBold="isBold"
      :isItalic="isItalic"
      :isUnderline="isUnderline" 
      :activeListType="activeListType" 
      @style="applyStyle"
      @applyColor="handleApplyColor"
      @applyFont="handleApplyFont"
      @update="updateNote" 
      @applyList="handleApplyList"
    />

    <EditableArea ref="editable" :note="note" />

    <label>
      Etiketler (virgülle ayır):
      <input v-model="tags" type="text" />
    </label>

    <div class="actions">
      <button @click="handleSubmit">
        {{ note?.id ? "Güncelle" : "Oluştur" }}
      </button>
      <button @click="$emit('cancel')">İptal</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import Toolbar from "../toolbar/Toolbar.vue";
import EditableArea from "./EditableArea.vue";
import { useNotes } from "../../composables/useNotes";
import { useTextFormatting } from "../../composables/functions/useTextFormatting";
import { useTextColor } from "../../composables/functions/useTextColor";
import { toggleListType } from "../../composables/functions/useTextFormatting";
import {
  fontFamily,
  setFontFamily,
} from "../../composables/functions/useFontFamily";

const props = defineProps({ note: Object });
const { isBold, isItalic, isUnderline, toggleStyle } = useTextFormatting();
const { setColor } = useTextColor(); 

const emit = defineEmits(["save", "cancel"]);

const editable = ref(null);
const tags = ref(""); 

const activeListType = computed(() => editable.value?.activeListType || null)


watch(
  () => props.note,
  (note) => {
    tags.value = note?.tags?.join(", ") || "";
  },
  { immediate: true }
);  

function updateNote(updatedNote) {
  selectedNote.value = updatedNote
}

function applyStyle(style) {
  toggleStyle(style); 
}

function handleApplyColor(color) {
  setColor(color);
  editable.value?.resetCurrentElement();
  editable.value?.applyColorToSelection(color);
}

function handleApplyFont(font) {
  setFontFamily(font);
  editable.value?.resetCurrentElement();
  editable.value?.applyFontToSelection(font);
}

function handleApplyList(type) {
  const selection = window.getSelection();
  const li = selection?.anchorNode?.closest("li");

  if (activeListType.value === type) {
    // Aynı tipe tekrar basınca listeden çık
   // activeListType.value = null; 
   toggleListType(null);

    if (li) {
      const parentList = li.parentElement;
      const fragment = document.createDocumentFragment();

      // <li> içindeki içeriği al
      while (li.firstChild) {
        fragment.appendChild(li.firstChild);
      }

      // Listeyi kaldır, içeriği parent’a ekle
      parentList.parentElement.insertBefore(fragment, parentList.nextSibling);

      // Eğer listede başka <li> yoksa listeyi tamamen kaldır
      if (parentList.children.length === 1) {
        parentList.remove();
      }

      // Cursor’u içeriğin sonuna taşı
      const range = document.createRange();
      range.selectNodeContents(fragment);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    editable.value?.resetCurrentElement();
  } else {
    // Listeye gir
    toggleListType(type);
    editable.value?.applyListToSelection(type);
    editable.value?.resetCurrentElement();
  }
}




function handleSubmit() {
  if (!editable.value) return;
  const noteData = {
    title: editable.value.titleRef?.innerHTML.trim() || "",
    content: editable.value.contentRef?.innerHTML.trim() || "",
    tags: tags.value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
  };

  if (props.note?.id) {
    noteData.id = props.note.id;
  }

  emit("save", noteData);
}
</script>

<style scoped>
.note-editor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
</style>
