import { activeColor } from '../../composables/functions/useTextColor'

export function useEditorFormatting({
  editable,
  selectedNote,
  activeHeading,
  isBold,
  isItalic,
  isUnderline,
  currentHeadingElement,
  onContentInput
}) {

function onBeforeInput(event) {

  if (event.inputType === 'insertParagraph') {
    currentHeadingElement.value = null;
    return;
  }

  if (event.inputType !== 'insertText') return;

  const text = event.data;
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  let targetElement;
  const tag = activeHeading.value || 'span';

  if (
    currentHeadingElement.value &&
    currentHeadingElement.value.tagName.toLowerCase() === tag
  ) {
    targetElement = currentHeadingElement.value;
    targetElement.textContent += text;

    // Stil güncellemesi eklendi
    if (!tag.startsWith('h')) {
  targetElement.style.fontWeight = isBold.value ? 'bold' : 'normal';
}


    targetElement.style.fontStyle = isItalic.value ? 'italic' : 'normal';
    targetElement.style.textDecoration = isUnderline.value ? 'underline' : 'none';
    targetElement.style.color = activeColor.value || '#000000';
  } else {
    targetElement = document.createElement(tag);
    targetElement.textContent = text;

    if (isBold.value) targetElement.style.fontWeight = 'bold';
    if (isItalic.value) targetElement.style.fontStyle = 'italic';
    if (isUnderline.value) targetElement.style.textDecoration = 'underline';
    if (activeColor.value) targetElement.style.color = activeColor.value;

    range.deleteContents();
    range.insertNode(targetElement);
    currentHeadingElement.value = targetElement;
  }

  const newRange = document.createRange();
  newRange.selectNodeContents(targetElement);
  newRange.collapse(false);
  selection.removeAllRanges();
  selection.addRange(newRange);

  event.preventDefault();
  onContentInput({ target: editable.value });
}



function applyStyleToSelection(styleType) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);

  if (selection.isCollapsed) {
    if (styleType === 'bold') isBold.value = !isBold.value;
    if (styleType === 'italic') isItalic.value = !isItalic.value;
    if (styleType === 'underline') isUnderline.value = !isUnderline.value;
    return;
  }

  const selectedContent = range.cloneContents();
  const span = document.createElement('span');
  span.appendChild(selectedContent);

  if (styleType === 'bold') span.style.fontWeight = 'bold';
  if (styleType === 'italic') span.style.fontStyle = 'italic';
  if (styleType === 'underline') span.style.textDecoration = 'underline';
  if (activeColor.value) span.style.color = activeColor.value;

  range.deleteContents();
  range.insertNode(span);

  const newRange = document.createRange();
  newRange.selectNodeContents(span);
  newRange.collapse(false);
  selection.removeAllRanges();
  selection.addRange(newRange);

  if (typeof onContentInput === 'function') {
    onContentInput({ target: editable.value });
  }
}

function resetCurrentElement() {
  currentHeadingElement.value = null;
}


  function setCaretToEnd() {
    const el = editable.value
    if (!el) return
    const range = document.createRange()
    const sel = window.getSelection()
    range.selectNodeContents(el)
    range.collapse(false)
    sel.removeAllRanges()
    sel.addRange(range)
  }

  return {
    onBeforeInput,
    applyStyleToSelection,
    setCaretToEnd, 
    resetCurrentElement
  }
}