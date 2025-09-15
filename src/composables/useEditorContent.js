export function useEditorContent(editable, selectedNote) {
  function formatContent(note) {
    const titleHTML = `<h1>${note.title || ''}</h1>`
    const contentHTML = note.content?.replace(/\n/g, '<br/>') || ''
    return `${titleHTML}\n${contentHTML}`
  }

  function onContentInput(event) {
    const html = event.target.innerHTML
    const titleMatch = html.match(/<h1>(.*?)<\/h1>/)

    if (titleMatch) {
      selectedNote.value.title = titleMatch[1]
      selectedNote.value.content = html.replace(titleMatch[0], '').trim()
    } else {
      selectedNote.value.content = html.trim()
    }
  }

  return { formatContent, onContentInput }
}
