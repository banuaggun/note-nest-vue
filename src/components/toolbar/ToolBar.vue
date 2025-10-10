<script setup>
import { ref } from "vue";
import HeadingControls from "./HeadingControls.vue";
import TextStyleControls from "./TextStyleControls.vue";
import SpellcheckToggle from "./SpellcheckToggle.vue";
import ListControls from "./ListControls.vue";
import {
  activeListType,
  toggleListType,
} from "../../composables/functions/useTextFormatting";
import { editable } from "../../composables/based/useEditorState";
import FontFamily from "./FontFamily.vue";

const props = defineProps({
  note: Object,
  isBold: Boolean,
  isItalic: Boolean,
  isUnderline: Boolean,
  activeListType: String,
  saveSelection: Function,
});

const emit = defineEmits([
  "update",
  "applyStyle",
  "applyColor",
  "applyList",
  "applyFont",
]);

const selectedColor = ref("#000000");

function handleUpdate(updatedNote) {
  emit("update", updatedNote);
}

function handleStyle(styleType) {
  emit("applyStyle", styleType);
}

function handleColorChange() {
  emit("applyColor", selectedColor.value);
}

function handleList(type) {
  emit("applyList", type);
}

function handleApplyList(type) {
  toggleListType(type);
  editable.value?.__vueParentComponent?.exposed?.resetCurrentElement();
}
</script>

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
    <div class="toolbar-spellcheck">
      <SpellcheckToggle />
    </div>
    <div class="toolbar-list-tags">
      <ListControls
        :activeListType="props.activeListType"
        @applyList="handleList"
      />
    </div>
    <div class="toolbar-color">
      <label for="color">Color: </label>
      <input type="color" v-model="selectedColor" @change="handleColorChange" />
    </div>

    <div class="toolbar-fontfamily">
      <FontFamily @applyFont="(font) => emit('applyFont', font)" />
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  column-gap: 24px;
  row-gap: 8px;
}

.toolbar-color {
  display: flex;
  align-items: center;
}
.toolbar input[type="color"] {
  width: 32px;
  height: 32px;
  border: none;
  cursor: pointer;
  background-color: transparent;
}

</style>
