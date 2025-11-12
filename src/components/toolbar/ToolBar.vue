<template>
  <div class="toolbar">
    <div class="toolbar-header-tags">
      <HeadingControls :note="note" @update="handleUpdate" />
    </div>

    <div class="toolbar-text-style-tags">
      <TextStyleControls
        :isBold="isBold"
        :isItalic="isItalic"
        :isUnderline="isUnderline"
        @applyStyle="handleStyle"
      />
    </div>

    <div class="toolbar-color">
      <label for="color">Color: </label>
      <input type="color" v-model="selectedColor" @change="handleColorChange" />
    </div> 

    <div class="toolbar-list-tags">
      <ListControls :activeListType="props.activeListType" @applyList="handleList" />
    </div>

    <div class="toolbar-spellcheck">
      <SpellcheckToggle />
    </div>

    <div class="toolbar-fontfamily">
      <FontFamily @applyFont="(font) => emit('applyFont', font)" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TextStyleControls from "./TextStyleControls.vue";
import SpellcheckToggle from "./SpellcheckToggle.vue";
import FontFamily from "./FontFamily.vue";
import HeadingControls from "./HeadingControls.vue";
import ListControls from "./ListControls.vue";

const props = defineProps({
  isBold: Boolean,
  isItalic: Boolean,
  isUnderline: Boolean, 
  activeListType:String
});

const emit = defineEmits(["style", "applyColor", "applyFont", "applyList"]);

const selectedColor = ref("#000000");

function handleStyle(styleType) {
  emit("style", styleType);
}

function handleColorChange() {
  emit("applyColor", selectedColor.value);
}
 
function handleUpdate(updatedNote) {
  emit("update", updatedNote);
} 

function handleList(type) {
  emit("applyList", type);
} 

</script>

<style scoped>
.toolbar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
