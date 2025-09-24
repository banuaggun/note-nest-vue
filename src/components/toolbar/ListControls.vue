<script setup>
const props = defineProps({
  activeListType: String
})
const emit = defineEmits(["applyList"]);

function applyList(type) {
  emit("applyList", type);
}
</script>

<template>
  <div class="list-controls">
  <button
  :class="{ active: props.activeListType === 'ul' }"
  @click="applyList('ul')"
>• Liste</button>

<button
  :class="{ active: props.activeListType === 'ol' }"
  @click="applyList('ol')"
>1. Liste</button>


  </div>
</template>

<style scoped>
.list-controls button {
  margin-right: 6px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}
.list-controls button.active {
  background-color: #cce;
  font-weight: bold;
}

ul{
  list-style-type: disc;
}
ol{
  list-style-type: decimal;
}
</style>