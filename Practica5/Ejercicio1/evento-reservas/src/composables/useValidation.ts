import { ref } from 'vue'
import { validateField, validateNumberRange } from '@/utils/validation'
import type { ValidationError } from '@/types/reservation'

export function useValidation() {
  const debounceTimers = ref<Record<string, NodeJS.Timeout>>({})

  const validateWithDebounce = (
    field: string,
    value: string | number,
    addError: (field: string, message: string) => void,
    clearFieldError: (field: string) => void,
    delay = 500
  ): void => {
    clearTimeout(debounceTimers.value[field])
    
    debounceTimers.value[field] = setTimeout(() => {
      clearFieldError(field)
      
      let result
      if (field === 'numeroAsistentes') {
        result = validateNumberRange(value as number, 10, 500)
      } else if (field === 'serviciosCatering') {
        const services = value as string[]
        result = {
          isValid: services.length > 0,
          errors: services.length === 0 ? [{ field, message: 'Debe seleccionar al menos un servicio de catering' }] : []
        }
      } else if (field === 'presupuesto') {
        result = {
          isValid: (value as string).trim() !== '',
          errors: (value as string).trim() === '' ? [{ field, message: 'Debe seleccionar un rango de presupuesto' }] : []
        }
      } else if (field === 'comentarios') {
        const text = (value as string).trim()
        const isValid = text.length <= 500
        result = {
          isValid,
          errors: !isValid ? [{ field, message: 'Los comentarios no pueden exceder 500 caracteres' }] : []
        }
      } else if (field === 'aceptaTerminos') {
        result = {
          isValid: value as boolean,
          errors: !(value as boolean) ? [{ field, message: 'Debe aceptar los términos y condiciones' }] : []
        }
      } else {
        result = validateField(field, value as string)
      }
      
      if (!result.isValid) {
        result.errors.forEach(error => addError(error.field, error.message))
      }
    }, delay)
  }

  const validateOnBlur = (
    field: string,
    value: string | number | boolean | string[],
    addError: (field: string, message: string) => void,
    clearFieldError: (field: string) => void
  ): void => {
    clearFieldError(field)
    
    let result
    if (field === 'numeroAsistentes') {
      result = validateNumberRange(value as number, 10, 500)
    } else if (field === 'serviciosCatering') {
      const services = value as string[]
      result = {
        isValid: services.length > 0,
        errors: services.length === 0 ? [{ field, message: 'Debe seleccionar al menos un servicio de catering' }] : []
      }
    } else if (field === 'presupuesto') {
      result = {
        isValid: (value as string).trim() !== '',
        errors: (value as string).trim() === '' ? [{ field, message: 'Debe seleccionar un rango de presupuesto' }] : []
      }
    } else if (field === 'comentarios') {
      const text = (value as string).trim()
      const isValid = text.length <= 500
      result = {
        isValid,
        errors: !isValid ? [{ field, message: 'Los comentarios no pueden exceder 500 caracteres' }] : []
      }
    } else if (field === 'aceptaTerminos') {
      result = {
        isValid: value as boolean,
        errors: !(value as boolean) ? [{ field, message: 'Debe aceptar los términos y condiciones' }] : []
      }
    } else {
      result = validateField(field, value as string)
    }
    
    if (!result.isValid) {
      result.errors.forEach(error => addError(error.field, error.message))
    }
  }

  const scrollToFirstError = (errors: ValidationError[]): void => {
    if (errors.length > 0) {
      const firstErrorField = errors[0].field
      const element = document.getElementById(firstErrorField)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        element.focus()
      }
    }
  }

  return {
    validateWithDebounce,
    validateOnBlur,
    scrollToFirstError
  }
}