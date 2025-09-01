<template>
  <div class="heading-button-group">
    <button
      v-for="level in 6"
      :key="level"
      class="btn"
      @click="emit('format', `h${level}`)"
      :class="{ active: isFormatActive[`h${level}`] }"
      :aria-label="`Heading ${level}`"
    >
      <component :is="iconMap[`h${level}`]" />
    </button>
  </div>
</template>

<script setup>
import IconH1 from "../icons/editor/IconH1.vue";
import IconH2 from "../icons/editor/IconH2.vue";
import IconH3 from "../icons/editor/IconH3.vue";
import IconH4 from "../icons/editor/IconH4.vue";
import IconH5 from "../icons/editor/IconH5.vue";
import IconH6 from "../icons/editor/IconH6.vue";

const emit = defineEmits(["format"]);

defineProps({
  isFormatActive: {
    type: Object,
    required: true
  }
});

// İkonları eşleştir
const iconMap = {
  h1: IconH1,
  h2: IconH2,
  h3: IconH3,
  h4: IconH4,
  h5: IconH5,
  h6: IconH6
};
</script>

<style scoped>
.heading-button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.btn {
  background-color: ivory;
  border: 1px solid #dcdcdc;
  color: black;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.active {
  background-color: limegreen;
  color: black;
}

svg {
  width: 20px;
  height: 20px;
}
</style>
