import api from './api'

export const aiService = {
  async generateDiagram(prompt: string, signal?: AbortSignal): Promise<string> {
    const response = await api.post(
      '/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'Eres un experto en diagramas Mermaid. Responde ÚNICAMENTE con código Mermaid válido, sin explicaciones ni markdown. Solo el código del diagrama.'
          },
          {
            role: 'user',
            content: `Genera un diagrama Mermaid para: ${prompt}`
          }
        ],
        temperature: 0.7
      },
      {
        signal,
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        }
      }
    )

    return response.data.choices[0]?.message?.content || ''
  }
}
