<template>
  <div v-if="diagramCode" class="diagram-viewer">
    <div class="viewer-header">
      <h3>📊 Diagrama Generado</h3>
      <div class="actions">
        <button @click="exportSVG" class="btn-export">💾 Exportar SVG</button>
        <button @click="exportPNG" class="btn-export">🖼️ Exportar PNG</button>
        <button @click="clearDiagram" class="btn-clear">🗑️ Limpiar</button>
      </div>
    </div>

    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useDiagramStore } from '@/stores/ej2/diagramStore'
import mermaid from 'mermaid'

const diagramStore = useDiagramStore()
const { diagramCode } = diagramStore
const mermaidContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  mermaid.initialize({ startOnLoad: false, theme: 'default' })
})

watch(diagramCode, async (newCode) => {
  if (newCode && mermaidContainer.value) {
    try {
      mermaidContainer.value.innerHTML = ''
      const { svg } = await mermaid.render('mermaid-diagram', newCode)
      mermaidContainer.value.innerHTML = svg
    } catch (error) {
      console.error('Error rendering diagram:', error)
      mermaidContainer.value.innerHTML = '<p class="error">Error al renderizar el diagrama</p>'
    }
  }
})

const exportSVG = () => {
  const svg = mermaidContainer.value?.querySelector('svg')
  if (!svg) return

  const svgData = new XMLSerializer().serializeToString(svg)
  const blob = new Blob([svgData], { type: 'image/svg+xml' })
  downloadFile(blob, 'diagram.svg')
}

const exportPNG = async () => {
  const svg = mermaidContainer.value?.querySelector('svg')
  if (!svg) return

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const svgData = new XMLSerializer().serializeToString(svg)
  const img = new Image()
  const blob = new Blob([svgData], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)

  img.onload = () => {
    canvas.width = img.width
    canvas.height = img.height
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)

    canvas.toBlob((pngBlob) => {
      if (pngBlob) {
        downloadFile(pngBlob, 'diagram.png')
      }
      URL.revokeObjectURL(url)
    })
  }

  img.src = url
}

const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

const clearDiagram = () => {
  diagramStore.clearDiagram()
  if (mermaidContainer.value) {
    mermaidContainer.value.innerHTML = ''
  }
}
</script>

<style scoped>
.diagram-viewer {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.viewer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

h3 {
  color: #2d3748;
  margin: 0;
}

.actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-export,
.btn-clear {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-export {
  background: #48bb78;
  color: white;
}

.btn-export:hover {
  background: #38a169;
}

.btn-clear {
  background: #e53e3e;
  color: white;
}

.btn-clear:hover {
  background: #c53030;
}

.mermaid-container {
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: #f7fafc;
  border-radius: 8px;
  overflow: auto;
}

.mermaid-container :deep(svg) {
  max-width: 100%;
  height: auto;
}

.error {
  color: #e53e3e;
  text-align: center;
}
</style>
