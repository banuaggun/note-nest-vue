<script setup>
import { ref } from 'vue'
import HeadingControls from "./HeadingControls.vue";
import TextStyleControls from "./TextStyleControls.vue";
import SpellcheckToggle from "./SpellcheckToggle.vue";
import ListControls from './ListControls.vue';
import { activeListType } from '../../composables/functions/useTextFormatting';
import { toggleListType } from '../../composables/functions/useTextFormatting'

const props = defineProps({
  note: Object,
  isBold: Boolean,
  isItalic: Boolean,
  isUnderline: Boolean, 
  activeListType: String
})

const emit = defineEmits(["update", "applyStyle", "applyColor", "applyList"])

const selectedColor = ref("#000000")

function handleUpdate(updatedNote) {
  emit("update", updatedNote)
}

function handleStyle(styleType) {
  emit("applyStyle", styleType)
}

function handleColorChange() {
  emit("applyColor", selectedColor.value)
}

function handleList(type) {
  emit("applyList", type)
}


function handleApplyList(type) {
  toggleListType(type); // Liste modunu aç/kapat
  editableRef.value?.resetCurrentElement();
}
</script>


<template>
  <div class="toolbar">
    <HeadingControls :note="note" @update="handleUpdate" />
    <TextStyleControls
      :isBold="isBold"
      :isItalic="isItalic"
      :isUnderline="isUnderline"
      @applyStyle="handleStyle"
    />
<ListControls :activeListType="props.activeListType" @applyList="handleList" />

    <!-- Renk seçici -->
    <input type="color" v-model="selectedColor" @change="handleColorChange" />

    <SpellcheckToggle />
  </div>
</template>

<style scoped>
.toolbar input[type="color"] {
  margin-left: 8px;
  width: 32px;
  height: 32px;
  border: none;
  cursor: pointer;
}
</style>