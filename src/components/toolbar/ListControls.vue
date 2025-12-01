<script setup>
const props = defineProps({
  activeListType: String,
});
const emit = defineEmits(["applyList"]);

function applyList(type) {
  emit("applyList", type);
}
</script>

<template>
  <div class="text-style-controls">
    <button
      :class="{ active: props.activeListType === 'ul' }"
      @click="applyList('ul')"
    >
      Bullet List
    </button>

    <button
      :class="{ active: props.activeListType === 'ol' }"
      @click="applyList('ol')"
    >
      Numbered List
    </button>
  </div>
</template>

<style scoped>
.text-style-controls{
  border:1px solid black;
  display: flex;
  width:max-content;
  gap:8px;
}

.text-style-controls button {
  padding: 4px 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  font-size:14px;
  color:#444;
  text-align: center;
}

.text-style-controls button:hover{
  color:#000;
  cursor:pointer;
  background-color: #BDBDEF;
}

.text-style-controls button.active{
  background-color: #9898e7;
  font-weight: bold;
  color:#000;
}

ul {
  list-style-type: disc;
}
ol {
  list-style-type: decimal;
}
</style>