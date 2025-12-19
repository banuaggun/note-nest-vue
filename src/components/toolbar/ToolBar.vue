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
    <div class="toolbar-spellcheck">
      <SpellcheckToggle @applySpellcheck="(val) => emit('applySpellcheck', val)" />
    </div>

    <div class="toolbar-header-tags">
      <HeadingControls @applyHeading="(level) => emit('applyHeading', level)" />
    </div>

    <div class="toolbar-color">
      <i class="ph ph-palette"></i>
      <input type="color" v-model="selectedColor" @input="handleColorChange" />
    </div>

    <div class="toolbar-fontfamily">
      <FontFamily @applyFont="(font) => emit('applyFont', font)" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { editable } from "../../composables/based/useEditorState";
import TextStyleControls from "./TextStyleControls.vue";
import SpellcheckToggle from "./SpellcheckToggle.vue";
import FontFamily from "./FontFamily.vue";
import HeadingControls from "./HeadingControls.vue";
import { useTextFormatting } from "../../composables/functions/useTextFormatting";

const props = defineProps({
  styles: {
    type: Object,
    required: false,
  },
  note: Object,
  isBold: Boolean,
  isItalic: Boolean,
  isUnderline: Boolean,
  activeListType: String,
  saveSelection: Function,
});

const { isBold, isItalic, isUnderline, toggleStyle } = useTextFormatting();

const emit = defineEmits([
  "style",
  "applyColor",
  "applyFont",
  "applyList",
  "applyStyle",
  "applyHeading",
  "applySpellcheck",
]);

const selectedColor = ref("#000000");

function handleStyle(styleType) {
  toggleStyle(styleType); // state is updated
  emit("applyStyle", styleType); // The parent is notified.
}

function handleColorChange() {
  emit("applyColor", selectedColor.value);
}
</script>

<style scoped>
.toolbar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;

  background: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.toolbar > button {
  padding: 0.3rem 0.6rem;
  font-size: 1rem;
  cursor: pointer;
}

.toolbar-color {
  display: flex;
  align-items: center;
}
.toolbar-color i {
  font-size: 28px;
}
.toolbar input[type="color"] {
  width: 32px;
  height: 32px;
  border: none;
  cursor: pointer;
  background-color: transparent;
}

@media only screen and (min-width: 1026px) {
  .toolbar {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0;
    margin: 0px;
    gap: initial;
  }
}
</style>
