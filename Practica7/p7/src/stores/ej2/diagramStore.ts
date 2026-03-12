import { defineStore } from 'pinia'
import { ref } from 'vue'
import { aiService } from '@/services/aiService'

export const useDiagramStore = defineStore('diagram', () => {
  const diagramCode = ref('')
  const loading = ref(false)
  const error = ref<string | null>(null)
  const abortController = ref<AbortController | null>(null)

  const generateDiagram = async (prompt: string) => {
    loading.value = true
    error.value = null
    abortController.value = new AbortController()

    try {
      const code = await aiService.generateDiagram(prompt, abortController.value.signal)
      diagramCode.value = code
    } catch (e: unknown) {
      if (e instanceof Error && e.name === 'CanceledError') {
        error.value = 'Generación cancelada'
      } else {
        error.value = 'Error al generar el diagrama'
        console.error(e)
      }
    } finally {
      loading.value = false
      abortController.value = null
    }
  }

  const cancelGeneration = () => {
    if (abortController.value) {
      abortController.value.abort()
    }
  }

  const clearDiagram = () => {
    diagramCode.value = ''
    error.value = null
  }

  return {
    diagramCode,
    loading,
    error,
    generateDiagram,
    cancelGeneration,
    clearDiagram
  }
})
