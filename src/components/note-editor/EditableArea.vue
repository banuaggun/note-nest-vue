<template>
  <div class="editable-area">
    <div
      class="editable title"
      contenteditable="true"
      ref="titleRef"
      @input="updateTitle($event)"
      placeholder="Başlık yazın..."
    ></div>

    <div
      class="editable content"
      contenteditable="true"
      ref="contentRef"
      @input="updateContent($event)"
      placeholder="İçerik yazın..."
    ></div>
  </div>
</template>

<script setup>
import { ref, watch, defineExpose } from "vue";

const props = defineProps({
  note: { type: Object, default: () => ({ id: undefined, title: "", content: "", tags: [] }) },
});

const titleRef = ref(null);
const contentRef = ref(null);
const noteLocal = ref({ title: "", content: "" });

watch(
  () => props.note,
  (n) => {
    if (!n) return;
    noteLocal.value = { title: n.title || "", content: n.content || "" };
    if (titleRef.value) titleRef.value.innerText = noteLocal.value.title;
    if (contentRef.value) contentRef.value.innerHTML = noteLocal.value.content;
  },
  { immediate: true }
);

function updateTitle(e) {
  noteLocal.value.title = e.target.innerText;
}
function updateContent(e) {
  noteLocal.value.content = e.target.innerHTML;
}

function applyStyle(styleType) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  const span = document.createElement("span");

  if (styleType === "bold") span.style.fontWeight = "bold";
  if (styleType === "italic") span.style.fontStyle = "italic";
  if (styleType === "underline") span.style.textDecoration = "underline";

  if (sel.isCollapsed) {
    span.appendChild(document.createTextNode("\u200B"));
    range.insertNode(span);
  } else {
    const frag = range.extractContents();
    span.appendChild(frag);
    range.insertNode(span);
  }

  if (titleRef.value.contains(sel.anchorNode)) {
    updateTitle({ target: titleRef.value });
  } else {
    updateContent({ target: contentRef.value });
  }
}

function applyColor(color) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  const span = document.createElement("span");
  span.style.color = color;

  if (sel.isCollapsed) {
    span.appendChild(document.createTextNode("\u200B"));
    range.insertNode(span);
  } else {
    const frag = range.extractContents();
    span.appendChild(frag);
    range.insertNode(span);
  }

  updateContent({ target: contentRef.value });
}

function applyFont(font) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  const span = document.createElement("span");
  span.style.fontFamily = font;

  if (sel.isCollapsed) {
    span.appendChild(document.createTextNode("\u200B"));
    range.insertNode(span);
  } else {
    const frag = range.extractContents();
    span.appendChild(frag);
    range.insertNode(span);
  }

  updateContent({ target: contentRef.value });
}

function applyList(type) {
  if (!contentRef.value) return;
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);

  const frag = range.extractContents();
  const li = document.createElement("li");
  li.appendChild(frag);

  const list = document.createElement(type === "ol" ? "ol" : "ul");
  list.appendChild(li);

  range.insertNode(list);
  updateContent({ target: contentRef.value });
}

defineExpose({
  titleRef, 
  contentRef, 
  noteLocal,
  updateTitle, 
  updateContent, 
  applyStyle,
  applyColor,
  applyFont,
  applyList,
});
</script>

<style scoped>
.editable-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.editable {
  border: 1px solid #ccc;
  padding: 0.5rem;
  min-height: 40px;
  border-radius: 4px;
  background-color: #fff;
}
.title {
  font-size: 1.2rem;
  font-weight: bold;
}
.content {
  min-height: 120px;
}
</style>
