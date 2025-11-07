<template>
  <div class="note-editor">
    <Toolbar @style="applyStyle" />

    <EditableArea ref="editable" :note="note" />

    <label>
      Etiketler (virgülle ayır):
      <input v-model="tags" type="text" />
    </label>

    <div class="actions">
      <button @click="handleSubmit">{{ note?.id ? 'Güncelle' : 'Oluştur' }}</button>
      <button @click="$emit('cancel')">İptal</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Toolbar from '../toolbar/Toolbar.vue'
import EditableArea from './EditableArea.vue'

const props = defineProps({ note: Object })
const emit = defineEmits(['save', 'cancel'])

const editable = ref(null)
const tags = ref('')

watch(
  () => props.note,
  (note) => {
    tags.value = note?.tags?.join(', ') || ''
  },
  { immediate: true }
)

function applyStyle(style) {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  const range = selection.getRangeAt(0)
  const span = document.createElement('span')

  switch (style) {
    case 'bold':
      span.style.fontWeight = 'bold'
      break
    case 'italic':
      span.style.fontStyle = 'italic'
      break
    case 'underline':
      span.style.textDecoration = 'underline'
      break
  }

  span.appendChild(range.extractContents())
  range.insertNode(span)
  selection.removeAllRanges()
  selection.addRange(range)
}

function handleSubmit() { 
  if (!editable.value) return
  const noteData = {
    title: editable.value.titleRef?.innerHTML.trim() || '',
    content: editable.value.contentRef?.innerHTML.trim() || '',
    tags: tags.value.split(',').map(tag => tag.trim()).filter(Boolean)
  }

  if (props.note?.id) {
    noteData.id = props.note.id
  }

  emit('save', noteData)
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
