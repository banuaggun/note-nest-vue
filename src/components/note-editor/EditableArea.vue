<template>
  <div class="editable-area">
    <div
      class="editable title"
      contenteditable="true"
      ref="titleRef"
      @input="updateTitle"
      placeholder="Başlık yazın..."
    ></div>

    <div
      class="editable content"
      contenteditable="true"
      ref="contentRef"
      @input="updateContent"
      placeholder="İçerik yazın..."
    ></div>
  </div>
</template>

<script setup>
import { ref, watch, defineExpose, nextTick } from 'vue'

const props = defineProps({ note: Object })

const titleRef = ref(null)
const contentRef = ref(null)

watch(
  () => props.note,
  async (note) => {
    await nextTick() // DOM render edilsin

    if (titleRef.value) {
      titleRef.value.innerHTML = note?.title || ''
    }

    if (contentRef.value) {
      contentRef.value.innerHTML = note?.content || ''
    }
  },
  { immediate: true }
)

defineExpose({
  titleRef,
  contentRef
})
</script>


<style scoped>
.editable-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.editable {
  border: 1px solid #ccc;
  padding: 0.5rem;
  min-height: 40px;
  border-radius: 4px;
  background-color: #fff;
}
.title {
  font-size: 1.2rem;
  font-weight: bold;
}
.content {
  min-height: 120px;
}
</style>
