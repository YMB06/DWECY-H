import { defineStore } from 'pinia'
import { ref } from 'vue'
import { imageService } from '@/services/imageService'

export const useSpriteStore = defineStore('sprite', () => {
  const spriteUrl = ref<string | null>(null)
  const loading = ref(false)
  const progress = ref(0)
  const error = ref<string | null>(null)
  const abortController = ref<AbortController | null>(null)

  const generateSprite = async (prompt: string) => {
    loading.value = true
    error.value = null
    progress.value = 0
    abortController.value = new AbortController()

    try {
      const blob = await imageService.generateSprite(
        prompt,
        (p) => (progress.value = p),
        abortController.value.signal
      )
      
      if (spriteUrl.value) {
        URL.revokeObjectURL(spriteUrl.value)
      }
      
      spriteUrl.value = URL.createObjectURL(blob)
    } catch (e: unknown) {
      if (e instanceof Error && e.name === 'CanceledError') {
        error.value = 'Generación cancelada'
      } else {
        const axiosError = e as { response?: { status: number; data: unknown } }
        if (axiosError.response) {
          const status = axiosError.response.status
          let data = axiosError.response.data
          if (data instanceof Blob) {
            const text = await data.text()
            try { data = JSON.parse(text) } catch { data = text }
          }
          console.error('API Error', status, data)
          if (status === 503) {
            error.value = 'Modelo cargando, espera unos segundos e inténtalo de nuevo'
          } else if (status === 401) {
            error.value = 'API key inválida. Revisa VITE_HF_API_KEY en .env.local'
          } else {
            error.value = `Error ${status}: ${JSON.stringify(data)}`
          }
        } else {
          error.value = 'Error de red'
          console.error(e)
        }
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

  const clearSprite = () => {
    if (spriteUrl.value) {
      URL.revokeObjectURL(spriteUrl.value)
    }
    spriteUrl.value = null
    error.value = null
    progress.value = 0
  }

  return {
    spriteUrl,
    loading,
    progress,
    error,
    generateSprite,
    cancelGeneration,
    clearSprite
  }
})
