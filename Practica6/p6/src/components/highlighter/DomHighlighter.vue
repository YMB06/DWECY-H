<script setup lang="ts">
import { ref } from 'vue'

const currentColor = ref<string>('yellow')
const contentArea = ref<HTMLElement | null>(null)

const highlightSelection = () => {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  const range = selection.getRangeAt(0)
  if (!contentArea.value?.contains(range.commonAncestorContainer)) return

  const span = document.createElement('span')
  span.className = `highlight-${currentColor.value}`

  try {
    range.surroundContents(span)
  } catch {
    const fragment = range.extractContents()
    span.appendChild(fragment)
    range.insertNode(span)
  }

  selection.removeAllRanges()
}

const removeHighlight = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.classList.contains('highlight-yellow') &&
      !target.classList.contains('highlight-green') &&
      !target.classList.contains('highlight-pink')) return

  const parent = target.parentNode
  if (!parent) return

  while (target.firstChild) {
    parent.insertBefore(target.firstChild, target)
  }
  parent.removeChild(target)
}
</script>

<template>
  <div class="highlighter-app">
    <div class="toolbar">
      <button
        @click="currentColor = 'yellow'"
        :class="{ active: currentColor === 'yellow' }"
        aria-label="Color Amarillo"
      >
        🟡
      </button>
      <button
        @click="currentColor = 'green'"
        :class="{ active: currentColor === 'green' }"
        aria-label="Color Verde"
      >
        🟢
      </button>
      <button
        @click="currentColor = 'pink'"
        :class="{ active: currentColor === 'pink' }"
        aria-label="Color Rosa"
      >
        🌸
      </button>
      <button @click="highlightSelection">Subrayar Selección</button>
    </div>

    <div ref="contentArea" class="text-content" @dblclick="removeHighlight">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Intenta seleccionar este texto y pulsa el botón de
        subrayar.
      </p>
    </div>
  </div>
</template>

<style scoped>
.highlighter-app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.toolbar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.toolbar button {
  padding: 0.5rem 1rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;
}

.toolbar button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.toolbar button.active {
  border-color: #667eea;
  background: #f0f4ff;
}

.text-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.8;
  font-size: 1.1rem;
  user-select: text;
}

:global(.highlight-yellow) {
  background-color: yellow;
}

:global(.highlight-green) {
  background-color: lightgreen;
}

:global(.highlight-pink) {
  background-color: lightpink;
}
</style>
