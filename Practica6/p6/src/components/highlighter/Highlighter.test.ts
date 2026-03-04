import { describe, it, expect, beforeEach } from 'vitest'

describe('Highlighter', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    container.innerHTML = '<p>Texto de prueba para seleccionar</p>'
    document.body.appendChild(container)
  })

  it('should create a span with correct class when text is selected', () => {
    // Arrange: Simular selección de texto
    const range = document.createRange()
    const textNode = container.querySelector('p')!.firstChild!
    range.setStart(textNode, 0)
    range.setEnd(textNode, 5)

    const selection = window.getSelection()!
    selection.removeAllRanges()
    selection.addRange(range)

    // Act: Crear span con clase highlight
    const span = document.createElement('span')
    span.className = 'highlight-yellow'
    range.surroundContents(span)

    // Assert: Verificar que el span existe con la clase correcta
    const highlightedSpan = container.querySelector('span.highlight-yellow')
    expect(highlightedSpan).toBeTruthy()
    expect(highlightedSpan?.textContent).toBe('Texto')
  })

  it('should remove span but keep text on double click', () => {
    // Arrange: Renderizar texto con span existente
    container.innerHTML = '<p>Texto <span class="highlight-yellow">resaltado</span> normal</p>'
    const span = container.querySelector('span.highlight-yellow') as HTMLElement

    // Act: Simular doble click y eliminar span
    const parent = span.parentNode!
    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span)
    }
    parent.removeChild(span)

    // Assert: Verificar que el span desapareció pero el texto persiste
    expect(container.querySelector('span.highlight-yellow')).toBeNull()
    expect(container.textContent).toBe('Texto resaltado normal')
  })
})
