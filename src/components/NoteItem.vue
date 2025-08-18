<template>
  <div class="note-item">
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>

    <small class="timestamp">{{
      new Date(props.note.timestamp).toLocaleString()
    }}</small>

    <!--
      <small :datetime="date">{{ date }}</small>
    -->
    <div class="tags">
      <span class="tag" v-for="tag in props.note.tags" :key="tag">{{
        tag
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  note: Object,
});

const title = computed(() =>
  props.note.title.substring(0, Math.min(120, props.note.title.length))
);

const content = computed(() => {
  if (!props.note.content) {
    return "No additional text";
  } else {
    return props.note.content.substring(
      0,
      Math.min(150, props.note.content.length)
    );
  }
});

const isToday = (date) => {
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const date = computed(() => {
  const rawDate = props.note.updated || props.note.timestamp;
  const date = new Date(rawDate);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().substring(2);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
});
</script>

<style scoped>
.note-item {
  background: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}
.timestamp {
  display: block;
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.85rem;
}
.tags {
  margin-top: 0.5rem;
}
.tag {
  display: inline-block;
  background-color: #eef;
  color: #336;
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}
</style>
