<template>
  <div class="editable-area">
    <div
      class="editable title"
      contenteditable="true"
      ref="titleRef"
      @input="updateTitle"
      @keydown="handleKeydown"
      placeholder="Başlık yazın..." 
    ></div>

    <div
      class="editable content"
      contenteditable="true"
      ref="contentRef"
      :spellcheck="isSpellcheckEnabled"
      @input="updateContent"
      @beforeinput="handleBeforeInput"
      @keydown="handleKeydown"
      placeholder="İçerik yazın..."
    ></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick, defineExpose } from "vue";
import { useTextFormatting } from "../../composables/functions/useTextFormatting";
import { useHeadingMode } from "../../composables/functions/useHeadingMode";
import { useEditorFormatting } from "../../composables/based/useEditorFormatting";
import { activeColor } from "../../composables/functions/useTextColor";
import { useSpellcheck } from "../../composables/functions/useSpellcheck";
import { useFontFamily } from "../../composables/functions/useFontFamily";

const props = defineProps({
  note: {
    type: Object,
    default: () => ({ title: "", content: "" }),
  },
}); 

const titleRef = ref(null);
const contentRef = ref(null);
const { isBold, isItalic, isUnderline } = useTextFormatting();
const { isSpellcheckEnabled } = useSpellcheck();
const { activeHeading } = useHeadingMode();
const { fontFamily } = useFontFamily();
const currentHeadingElement = ref(null); 
const selectedNote = defineModel();


const { onBeforeinput, resetCurrentElement, activeListType, applyListToSelection } =
  useEditorFormatting({ 
    note:props.note, 
    editable: titleRef || contentRef,
    isBold,
    isItalic,
    isUnderline,
    onContentInput: updateContent,
    activeHeading,
    selectedNote: props.note, 
    currentHeadingElement
    });


function updateTitle() {
  if (!props.note) return;
  props.note.title = titleRef.value?.innerHTML || "";
}

function updateContent() {
  if (!props.note) return;
  props.note.content = contentRef.value?.innerHTML || "";
}

function applyColorToSelection(color) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);

  if (selection.isCollapsed) {
    activeColor.value = color;
    resetCurrentElement();
    return;
  }

  const selectedContent = range.cloneContents();
  const span = document.createElement("span");
  span.appendChild(selectedContent);
  span.style.color = color;

  range.deleteContents();
  range.insertNode(span);

  const newRange = document.createRange();
  newRange.selectNodeContents(span);
  newRange.collapse(false);
  selection.removeAllRanges();
  selection.addRange(newRange);

  updateContent();
}

function applyFontToSelection(font) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const anchorNode = selection.anchorNode;
  const isInTitle = titleRef.value.contains(anchorNode);

  if (selection.isCollapsed) {
    fontFamily.value = font;

    const span = document.createElement("span");
    span.style.fontFamily = font;
    span.appendChild(document.createTextNode("\u200B"));

    range.insertNode(span);

    const newRange = document.createRange();
    newRange.setStart(span, 1);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);

    resetCurrentElement();
    return;
  }

  const selectedContent = range.cloneContents();
  const span = document.createElement("span");
  span.appendChild(selectedContent);
  span.style.fontFamily = font;

  range.deleteContents();
  range.insertNode(span);

  const newRange = document.createRange();
  newRange.selectNodeContents(span);
  newRange.collapse(false);
  selection.removeAllRanges();
  selection.addRange(newRange);

  if (isInTitle) {
    updateTitle();
  } else {
    updateContent();
  }
}

/*
function applyListToSelection(type) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);

  const list = document.createElement(type); // ul veya ol
  const li = document.createElement("li");

  const selectedContent = range.cloneContents();
  if (selectedContent.textContent.trim()) {
    li.appendChild(selectedContent);
  } else {
    li.appendChild(document.createTextNode("")); // boş satır
  }

  list.appendChild(li);

  // ✅ Seçili içeriği silip listeyi tam yerine ekle
  range.deleteContents();
  range.insertNode(list);

  // Cursor’u <li> içine taşı
  const newRange = document.createRange();
  newRange.selectNodeContents(li);
  newRange.collapse(false);
  selection.removeAllRanges();
  selection.addRange(newRange);

  updateContent();
}
*/
/*
function handleKeydown(e) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);

  if (e.key === " ") {
    const space = document.createTextNode("\u00A0");
    e.preventDefault();
    range.insertNode(space);
    range.setStartAfter(space);
    selection.removeAllRanges();
    selection.addRange(range);
    return;
  }

  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();

    let element;

    if (activeHeading.value) {
      element = range.startContainer.closest(activeHeading.value);
      if (!element) {
        element = document.createElement(activeHeading.value);
        range.insertNode(element);
      }
    } else {
      element = document.createElement("span");
      range.insertNode(element);
    }

    if (isBold.value) element.style.fontWeight = "bold";
    if (isItalic.value) element.style.fontStyle = "italic";
    if (isUnderline.value) element.style.textDecoration = "underline";
    if (activeColor.value) element.style.color = activeColor.value;
    if (fontFamily.value) element.style.fontFamily = fontFamily.value;

    element.appendChild(document.createTextNode(e.key));

    const newRange = document.createRange();
    newRange.setStartAfter(element.lastChild);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
  
}

*/

function getClosestFromRange(range, selector) {
  const start = range.startContainer;
  const baseEl = start.nodeType === 3 ? start.parentElement : start;
  return baseEl ? baseEl.closest(selector) : null;
}


function handleKeydown(e) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);

  // Space → NBSP
  if (e.key === " ") {
    e.preventDefault();
    const space = document.createTextNode("\u00A0");
    range.insertNode(space);
    range.setStartAfter(space);
    selection.removeAllRanges();
    selection.addRange(range);
    return;
  }

  // Tek karakter yazımı
  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();

    let element;

    if (activeHeading.value) {
      element = getClosestFromRange(range, activeHeading.value);
      if (!element) {
        element = document.createElement(activeHeading.value);
        // Range içeriğine node eklerken caret’i doğru konumlamak önemli:
        range.insertNode(element);
        const move = document.createRange();
        move.selectNodeContents(element);
        move.collapse(false);
        selection.removeAllRanges();
        selection.addRange(move);
      }
    } else {
      element = document.createElement("span");
      range.insertNode(element);
      const move = document.createRange();
      move.selectNodeContents(element);
      move.collapse(false);
      selection.removeAllRanges();
      selection.addRange(move);
    }

    // Stil uygula veya toggle off ise normalleştir 
     if (isBold.value) element.style.fontWeight = "bold";
    if (isItalic.value) element.style.fontStyle = "italic";
    if (isUnderline.value) element.style.textDecoration = "underline";
    if (activeColor.value) element.style.color = activeColor.value;
    if (fontFamily.value) element.style.fontFamily = fontFamily.value; 
 
    element.appendChild(document.createTextNode(e.key));

    const newRange = document.createRange();
    newRange.setStartAfter(element.lastChild);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);

    updateContent();
  }
}


/*
function handleBeforeInput(e) {
  if (typeof onBeforeinput === "function") {
    onBeforeinput(e);
  }

  if (e.inputType !== "insertText" || !e.data) return;

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;
  const range = selection.getRangeAt(0);

  let element;

  // Eğer heading aktifse, mevcut heading node’u bul
  if (activeHeading.value) {
    element = range.startContainer.closest(activeHeading.value);

    // Eğer yoksa yeni heading oluştur
    if (!element) {
      element = document.createElement(activeHeading.value);
      range.insertNode(element);

      // Cursor’u heading içine taşı
      const newRange = document.createRange();
      newRange.selectNodeContents(element);
      newRange.collapse(false);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  } else {
    element = document.createElement("span");
    range.insertNode(element);
  }

  // Stil uygula
  if (isBold.value) element.style.fontWeight = "bold";
  if (isItalic.value) element.style.fontStyle = "italic";
  if (isUnderline.value) element.style.textDecoration = "underline";
  if (activeColor.value) element.style.color = activeColor.value;
  if (fontFamily.value) element.style.fontFamily = fontFamily.value;

  // Harfi heading içine ekle
  element.appendChild(document.createTextNode(e.data));
  e.preventDefault();

  // Cursor’u sona taşı
  const newRange = document.createRange();
  newRange.setStartAfter(element.lastChild);
  newRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(newRange);

  updateContent();
}
*/
/*
function handleBeforeInput(e) {
  if (typeof onBeforeinput === "function") {
    onBeforeinput(e);
  }

  // Liste içinde yazarken normal davran: custom insertText’i atla
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const container = selection.getRangeAt(0).startContainer;
    const inListItem = container.nodeType === 1
      ? container.closest('li')
      : container.parentElement?.closest('li');

    if (inListItem) {
      // Liste içinde, tarayıcıya bırak (contenteditable default)
      return;
    }
  }

  if (e.inputType !== "insertText" || !e.data) return;

  const range = selection.getRangeAt(0);

  let element;
  if (activeHeading.value) {
    element = range.startContainer.closest(activeHeading.value);
    if (!element) {
      element = document.createElement(activeHeading.value);
      range.insertNode(element);
      const newRange = document.createRange();
      newRange.selectNodeContents(element);
      newRange.collapse(false);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  } else {
    element = document.createElement("span");
    range.insertNode(element);
  }

  if (isBold.value) element.style.fontWeight = "bold";
  if (isItalic.value) element.style.fontStyle = "italic";
  if (isUnderline.value) element.style.textDecoration = "underline";
  if (activeColor.value) element.style.color = activeColor.value;
  if (fontFamily.value) element.style.fontFamily = fontFamily.value;

  element.appendChild(document.createTextNode(e.data));
  e.preventDefault();

  const newRange = document.createRange();
  newRange.setStartAfter(element.lastChild);
  newRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(newRange);

  updateContent();
}
*/

function handleBeforeInput(e) {
  if (typeof onBeforeinput === "function") {
    onBeforeinput(e);
  }

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  // Liste içinde ise custom insertText’i atla
  const container = selection.getRangeAt(0).startContainer;
  const inListItem = container.nodeType === 1
    ? container.closest("li")
    : container.parentElement?.closest("li");
  if (inListItem) return;

  if (e.inputType !== "insertText" || !e.data) return;

  const range = selection.getRangeAt(0);

  let element;
  if (activeHeading.value) {
    const closestHeading = getClosestFromRange(range, activeHeading.value);
    if (closestHeading) {
      element = closestHeading;
    } else {
      element = document.createElement(activeHeading.value);
      range.insertNode(element);
      const move = document.createRange();
      move.selectNodeContents(element);
      move.collapse(false);
      selection.removeAllRanges();
      selection.addRange(move);
    }
  } else {
    element = document.createElement("span");
    range.insertNode(element);
    const move = document.createRange();
    move.selectNodeContents(element);
    move.collapse(false);
    selection.removeAllRanges();
    selection.addRange(move);
  }

  // Stil uygula veya toggle off ise normalleştir
  element.style.fontWeight   = isBold.value ? "bold"      : "normal";
  element.style.fontStyle    = isItalic.value ? "italic"  : "normal";
  element.style.textDecoration = isUnderline.value ? "underline" : "none";
  if (activeColor.value) element.style.color = activeColor.value;
  if (fontFamily.value) element.style.fontFamily = fontFamily.value;

  // NBSP koruma (örn. e.data === " ")
  const text = e.data === " " ? "\u00A0" : e.data;
  element.appendChild(document.createTextNode(text));
  e.preventDefault();

  const newRange = document.createRange();
  newRange.setStartAfter(element.lastChild);
  newRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(newRange);

  updateContent();
}

onMounted(() => {
  nextTick(() => {
    if (selectedNote.value) {
      titleRef.value.innerText = selectedNote.value.title;
      contentRef.value.innerHTML = selectedNote.value.content;
      document.addEventListener("selectionchange", saveSelection);
    }
  });
});


watch(
  () => selectedNote.value || props.note,
  async (note) => {
    await nextTick();
    if (titleRef.value) {
      titleRef.value.innerText = note?.title || "";
    }
    if (contentRef.value) {
      contentRef.value.innerHTML = note?.content || "";
    }
  },
  { immediate: true }
);

/*
watch(
  () => selectedNote.value,
  (newNote) => {
    nextTick(() => {
      if (newNote) {
        titleEditable.value.innerText = newNote.title;
        contentEditable.value.innerHTML = newNote.content;
      }
    });
  },
  { immediate: true }
);
*/

defineExpose({
  titleRef,
  contentRef,
  applyColorToSelection,
  applyFontToSelection,
  applyListToSelection,
  activeListType,
  resetCurrentElement,
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

.editable ul,
.editable ol {
  display: block;
  margin-left: 1.5rem;
  padding-left: 1rem;
}

.editable ul {
  list-style-type: disc;
}

.editable ol {
  list-style-type: decimal;
} 

</style>