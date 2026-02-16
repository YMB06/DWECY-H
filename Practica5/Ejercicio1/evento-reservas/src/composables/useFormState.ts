import { ref, computed } from 'vue'
import type { ReservaFormData, ValidationError } from '@/types/reservation'

export function useFormState() {
  const formData = ref<ReservaFormData>({
    nombreCompleto: '',
    nifNie: '',
    telefono: '',
    email: '',
    tipoEvento: '',
    fechaEvento: '',
    horaInicio: '',
    numeroAsistentes: 50,
    serviciosCatering: [],
    presupuesto: '',
    comentarios: '',
    aceptaTerminos: false
  })

  const errors = ref<ValidationError[]>([])
  const showSuccess = ref(false)

  const hasError = (field: string): boolean => {
    return errors.value.some(error => error.field === field)
  }

  const getFieldError = (field: string): string => {
    const error = errors.value.find(error => error.field === field)
    return error?.message || ''
  }

  const clearFieldError = (field: string): void => {
    errors.value = errors.value.filter(error => error.field !== field)
  }

  const addError = (field: string, message: string): void => {
    clearFieldError(field)
    errors.value.push({ field, message })
  }

  const isFormValid = computed((): boolean => {
    const requiredFields = [
      'nombreCompleto', 'nifNie', 'telefono', 'email', 
      'tipoEvento', 'fechaEvento', 'horaInicio', 'presupuesto'
    ]
    
    const hasRequiredFields = requiredFields.every(field => {
      const value = formData.value[field as keyof ReservaFormData]
      return typeof value === 'string' ? value.trim() !== '' : value !== null
    })

    const hasCateringService = formData.value.serviciosCatering.length > 0
    const acceptsTerms = formData.value.aceptaTerminos

    return errors.value.length === 0 && hasRequiredFields && hasCateringService && acceptsTerms
  })

  const resetForm = (): void => {
    formData.value = {
      nombreCompleto: '',
      nifNie: '',
      telefono: '',
      email: '',
      tipoEvento: '',
      fechaEvento: '',
      horaInicio: '',
      numeroAsistentes: 50,
      serviciosCatering: [],
      presupuesto: '',
      comentarios: '',
      aceptaTerminos: false
    }
    errors.value = []
    showSuccess.value = false
  }

  return {
    formData,
    errors,
    showSuccess,
    hasError,
    getFieldError,
    clearFieldError,
    addError,
    isFormValid,
    resetForm
  }
}