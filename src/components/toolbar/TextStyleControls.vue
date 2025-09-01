<template>
  <div class="button-group">
    <button
      class="btn"
      @click="emit('format', 'bold')"
      :class="{ active: isFormatActive.bold }"
      aria-label="Bold"
    >
      <IconBold />
    </button>

    <button class="btn"
      @click="emit('format', 'italic')"
      :class="{ active: isFormatActive.italic }"
    >
      <IconItalic />
    </button>
    <button class="btn"
      @click="emit('format', 'underline')"
      :class="{ active: isFormatActive.underline }"
    >
      <IconUnderline />
    </button>
  </div>
</template>

<script setup>
//import { ref } from "vue";
import IconBold from "../icons/editor/IconBold.vue";
import IconItalic from "../icons/editor/IconItalic.vue";
import IconUnderline from "../icons/editor/IconUnderline.vue";

const emit = defineEmits(["format"]);

defineProps({
  isFormatActive: {
    type: Object,
    required: true
  }
});

/*
const isFormatActive = ref({
  bold: false,
  italic: false,
  underline: false,
});
*/

</script>

<style scoped>
.btn {
  background-color: ivory;
  border: 1px solid #dcdcdc;
  color: black;
  margin-right:8px;
}

.active {
  background-color: limegreen;
  color: black;
}

</style>
