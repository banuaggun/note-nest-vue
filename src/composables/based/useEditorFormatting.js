import { ref } from "vue";
import { activeColor } from "../../composables/functions/useTextColor";

export function useEditorFormatting({
  editable,
  selectedNote,
  activeHeading,
  isBold,
  isItalic,
  isUnderline,
  currentHeadingElement,
  onContentInput,
}) {

  function applyStyleToSelection(styleType) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    if (selection.isCollapsed) {
      if (styleType === "bold") isBold.value = !isBold.value;
      if (styleType === "italic") isItalic.value = !isItalic.value;
      if (styleType === "underline") isUnderline.value = !isUnderline.value;
      return;
    }

    const selectedContent = range.cloneContents();
    const span = document.createElement("span");
    span.appendChild(selectedContent);

    if (styleType === "bold") span.style.fontWeight = "bold";
    if (styleType === "italic") span.style.fontStyle = "italic";
    if (styleType === "underline") span.style.textDecoration = "underline";
    if (activeColor.value) span.style.color = activeColor.value;

    range.deleteContents();
    range.insertNode(span);

    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    newRange.collapse(false);
    selection.removeAllRanges();
    selection.addRange(newRange);

    if (typeof onContentInput === "function") {
      onContentInput({ target: editable.value });
    }
  }

  function resetCurrentElement() {
    currentHeadingElement.value = null;
  }

  function setCaretToEnd() {
    const el = editable.value;
    if (!el) return;
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  return {
    applyStyleToSelection,
    setCaretToEnd, 
    resetCurrentElement, 
  };
}
