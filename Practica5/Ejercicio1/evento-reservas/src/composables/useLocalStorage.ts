import { ref, watch, onMounted } from 'vue'
import type { ReservaFormData } from '@/types/reservation'

export function useLocalStorage() {
  const STORAGE_KEY = 'reserva-form-draft'
  const THEME_KEY = 'reserva-form-theme'

  const saveDraft = (formData: ReservaFormData): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    } catch (error) {
      console.warn('No se pudo guardar el borrador:', error)
    }
  }

  const loadDraft = (): ReservaFormData | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch (error) {
      console.warn('No se pudo cargar el borrador:', error)
      return null
    }
  }

  const clearDraft = (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.warn('No se pudo limpiar el borrador:', error)
    }
  }

  const saveTheme = (theme: string): void => {
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch (error) {
      console.warn('No se pudo guardar el tema:', error)
    }
  }

  const loadTheme = (): string => {
    try {
      return localStorage.getItem(THEME_KEY) || 'light'
    } catch (error) {
      console.warn('No se pudo cargar el tema:', error)
      return 'light'
    }
  }

  return {
    saveDraft,
    loadDraft,
    clearDraft,
    saveTheme,
    loadTheme
  }
}

export function useTheme() {
  const { saveTheme, loadTheme } = useLocalStorage()
  const isDark = ref(false)

  const toggleTheme = (): void => {
    isDark.value = !isDark.value
    const theme = isDark.value ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    saveTheme(theme)
  }

  const initTheme = (): void => {
    const savedTheme = loadTheme()
    isDark.value = savedTheme === 'dark'
    document.documentElement.setAttribute('data-theme', savedTheme)
  }

  onMounted(() => {
    initTheme()
  })

  return {
    isDark,
    toggleTheme,
    initTheme
  }
}