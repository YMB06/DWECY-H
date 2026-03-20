export const imageService = {
  async generateSprite(
    prompt: string,
    onProgress?: (progress: number) => void,
    signal?: AbortSignal
  ): Promise<Blob> {
    const response = await fetch(
      'https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-2-1',
      {
        method: 'POST',
        signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_HF_API_KEY}`
        },
        body: JSON.stringify({ inputs: prompt })
      }
    )

    if (!response.ok) {
      const text = await response.text()
      let message: string
      try { message = JSON.stringify(JSON.parse(text)) } catch { message = text }
      throw Object.assign(new Error(message), { response: { status: response.status, data: message } })
    }

    const contentLength = response.headers.get('content-length')
    if (!response.body || !contentLength || !onProgress) {
      return response.blob()
    }

    const total = parseInt(contentLength)
    const reader = response.body.getReader()
    const chunks: Uint8Array[] = []
    let loaded = 0

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
      loaded += value.length
      onProgress(Math.round((loaded * 100) / total))
    }

    return new Blob(chunks)
  }
}
