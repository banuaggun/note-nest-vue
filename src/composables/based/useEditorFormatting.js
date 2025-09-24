import { ref } from 'vue'
import { activeColor } from '../../composables/functions/useTextColor'
import { activeListType } from '../functions/useTextFormatting'

const currentListItemElement = ref(null)

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
  function isCaretInsideLi() {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return false
    const container = selection.anchorNode?.parentElement
    return container?.tagName === 'LI'
  }

  function onBeforeInput(event) {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)

    // ENTER tuşu ile yeni <li> oluştur
    if (event.inputType === 'insertParagraph') {
      const container = selection.anchorNode?.parentElement

      if (container?.tagName === 'LI') {
        event.preventDefault()

        const newLi = document.createElement('li')
        newLi.appendChild(document.createTextNode('')) // boş metin
        container.parentElement.insertBefore(newLi, container.nextSibling)

        const newRange = document.createRange()
        newRange.setStart(newLi, 0)
        newRange.collapse(true)
        selection.removeAllRanges()
        selection.addRange(newRange)

        currentListItemElement.value = newLi

        onContentInput({ target: editable.value })
        return
      }

      currentHeadingElement.value = null
      currentListItemElement.value = null
    }

    // Metin giriliyorsa
    if (event.inputType === 'insertText') {
      event.preventDefault()
      const text = event.data
      let targetElement

      if (activeListType.value) {
        if (isCaretInsideLi()) {
          const container = selection.anchorNode.parentElement
          container.appendChild(document.createTextNode(text))
          currentListItemElement.value = container
          targetElement = container
        } else if (currentListItemElement.value) {
          currentListItemElement.value.appendChild(document.createTextNode(text))
          targetElement = currentListItemElement.value
        } else {
          let list = editable.value.querySelector(activeListType.value)
          if (!list) {
            list = document.createElement(activeListType.value)
            editable.value.appendChild(list)
          }

          const li = document.createElement('li')
          li.appendChild(document.createTextNode(text))
          list.appendChild(li)
          currentListItemElement.value = li
          targetElement = li

          const newRange = document.createRange()
          newRange.setStart(li, li.childNodes.length)
          newRange.collapse(true)
          selection.removeAllRanges()
          selection.addRange(newRange)
        }
      } else {
        const tag = activeHeading.value || 'span'
        if (
          currentHeadingElement.value &&
          currentHeadingElement.value.tagName.toLowerCase() === tag
        ) {
          currentHeadingElement.value.appendChild(document.createTextNode(text))
          targetElement = currentHeadingElement.value
        } else {
          targetElement = document.createElement(tag)
          targetElement.appendChild(document.createTextNode(text))
          range.deleteContents()
          range.insertNode(targetElement)
          currentHeadingElement.value = targetElement
        }
      }

      if (targetElement) {
        targetElement.style.fontWeight = isBold.value ? 'bold' : 'normal'
        targetElement.style.fontStyle = isItalic.value ? 'italic' : 'normal'
        targetElement.style.textDecoration = isUnderline.value ? 'underline' : 'none'
        targetElement.style.color = activeColor.value || '#000000'

        const newRange = document.createRange()
        newRange.setStart(targetElement, targetElement.childNodes.length)
        newRange.collapse(true)
        selection.removeAllRanges()
        selection.addRange(newRange)
      }

      onContentInput({ target: editable.value })
    }

    if (!activeListType.value) {
      currentListItemElement.value = null
    }
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
    if (activeColor.value) span.style.color = activeColor.value

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

  function resetCurrentElement() {
    currentHeadingElement.value = null
    currentListItemElement.value = null
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

  function applyListToSelection(type) {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    const selectedText = selection.toString()
    const lines = selectedText.split('\n').filter(line => line.trim() !== '')

    const list = document.createElement(type === 'ol' ? 'ol' : 'ul')

    if (lines.length > 1) {
      lines.forEach(line => {
        const li = document.createElement('li')
        li.textContent = line
        list.appendChild(li)
      })
    } else {
      const content = range.cloneContents()
      const li = document.createElement('li')
      li.appendChild(content)
      list.appendChild(li)
    }

    range.deleteContents()
    range.insertNode(list)

    const newRange = document.createRange()
    const lastLi = list.lastChild
    newRange.selectNodeContents(lastLi)
    newRange.collapse(false)

    selection.removeAllRanges()
    selection.addRange(newRange)

    onContentInput({ target: editable.value })
    activeListType.value = type
    currentListItemElement.value = lastLi
  }

  return {
    onBeforeInput,
    applyStyleToSelection,
    setCaretToEnd,
    applyListToSelection,
    resetCurrentElement,
    activeListType
  }
}