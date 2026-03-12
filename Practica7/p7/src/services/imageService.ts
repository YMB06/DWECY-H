import api from './api'
import type { AxiosProgressEvent } from 'axios'

export const imageService = {
  async generateSprite(
    prompt: string,
    onProgress?: (progress: number) => void,
    signal?: AbortSignal
  ): Promise<Blob> {
    const response = await api.post(
      '/stabilityai/stable-diffusion-2-1',
      { inputs: prompt },
      {
        signal,
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_HF_API_KEY}`
        },
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total && onProgress) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            onProgress(progress)
          }
        }
      }
    )

    return response.data
  }
}
