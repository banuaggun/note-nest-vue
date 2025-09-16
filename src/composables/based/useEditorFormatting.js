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
  if (event.inputType !== 'insertText') return

  const text = event.data
  const selection = window.getSelection()
  const range = selection.getRangeAt(0)

  let targetElement

  const tag = activeHeading.value || 'span'

  // Eğer mevcut heading varsa ve tag eşleşiyorsa, ona ekle
  if (
    currentHeadingElement.value &&
    currentHeadingElement.value.tagName.toLowerCase() === tag
  ) {
    targetElement = currentHeadingElement.value
    targetElement.textContent += text
  } else {
    // Yeni bir heading elementi oluştur
    targetElement = document.createElement(tag)
    targetElement.textContent = text

    if (isBold.value) targetElement.style.fontWeight = 'bold'
    if (isItalic.value) targetElement.style.fontStyle = 'italic'
    if (isUnderline.value) targetElement.style.textDecoration = 'underline'
    if (activeColor.value) targetElement.style.color = activeColor.value

    range.deleteContents()
    range.insertNode(targetElement)

    // Heading elementi referansını sakla
    currentHeadingElement.value = targetElement
  }

  const newRange = document.createRange()
  newRange.selectNodeContents(targetElement)
  newRange.collapse(false)
  selection.removeAllRanges()
  selection.addRange(newRange)

  event.preventDefault()
  onContentInput({ target: editable.value })
}


function applyStyleToSelection(styleType) {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)

    if (selection.isCollapsed) {
      if (styleType === 'bold') isBold.value = !isBold.value
      if (styleType === 'italic') isItalic.value = !isItalic.value
      if (styleType === 'underline') isUnderline.value = !isUnderline.value
      return
    }

    const selectedContent = range.cloneContents()
    const span = document.createElement('span')
    span.appendChild(selectedContent)

    if (styleType === 'bold') span.style.fontWeight = 'bold'
    if (styleType === 'italic') span.style.fontStyle = 'italic'
    if (styleType === 'underline') span.style.textDecoration = 'underline'

    range.deleteContents()
    range.insertNode(span)

    const newRange = document.createRange()
    newRange.selectNodeContents(span)
    newRange.collapse(false)
    selection.removeAllRanges()
    selection.addRange(newRange)

    if (typeof onContentInput === 'function') {
      onContentInput({ target: editable.value })
    }
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
    setCaretToEnd
  }
}