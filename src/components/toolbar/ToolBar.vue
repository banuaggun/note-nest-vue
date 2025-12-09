<template>
  <div class="toolbar">
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
      <input type="color" v-model="selectedColor" @input="handleColorChange" />
    </div> 

    <div class="toolbar-header-tags">
      <HeadingControls :note="note" @update="handleUpdate" />
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
import { activeListType, toggleListType } from "../../composables/functions/useTextFormatting"; 
import { editable } from "../../composables/based/useEditorState";
import TextStyleControls from "./TextStyleControls.vue";
import SpellcheckToggle from "./SpellcheckToggle.vue";
import FontFamily from "./FontFamily.vue";
import HeadingControls from "./HeadingControls.vue";
import ListControls from "./ListControls.vue"; 
import {useTextFormatting} from "../../composables/functions/useTextFormatting";

const props = defineProps({  
  styles: {
    type: Object,
    required: false
  }, 
  note:Object, 
  isBold: Boolean,
  isItalic: Boolean,
  isUnderline: Boolean, 
  activeListType:String, 
  saveSelection: Function
});

const { isBold, isItalic, isUnderline, toggleStyle } = useTextFormatting();

const emit = defineEmits(["style", "applyColor", "applyFont", "applyList", "applyStyle"]);

const selectedColor = ref("#000000");

function handleStyle(styleType) {
  toggleStyle(styleType);   // state güncellenir
  emit("applyStyle", styleType); // parent’a haber verilir
}

/*
function handleStyle(styleType) {
  emit("applyStyle", styleType);
}
*/

function handleColorChange() {
  emit("applyColor", selectedColor.value);
}
 
function handleUpdate(updatedNote) {
  emit("update", updatedNote);
} 

function handleList(type) {
  emit("applyList", type);
} 

function handleApplyList(type) {
  toggleListType(type);
  editable.value?.__vueParentComponent?.exposed?.resetCurrentElement();
}

</script>

<style scoped>
.toolbar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  width:100%;
  margin:0px auto;
  border:1px solid black;
  padding:0 8px 0 8px;
} 
.toolbar > button {
  padding: 0.3rem 0.6rem;
  font-size: 1rem;
  cursor: pointer;
} 
.toolbar > button.active, .toolbar button:focus {
  background-color: #007bff;
  color: white;
  border-radius: 4px;
}
:deep(.toolbar button.active) {
  background-color: #007bff;
  color: white;
  border-radius: 4px;
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
