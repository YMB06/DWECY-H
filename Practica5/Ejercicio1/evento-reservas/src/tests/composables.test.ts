import { describe, it, expect } from 'vitest'
import { useFormState } from '@/composables/useFormState'
import { useValidation } from '@/composables/useValidation'

describe('useFormState', () => {
  it('should initialize with default values', () => {
    const { formData, errors, showSuccess, isFormValid } = useFormState()
    
    expect(formData.value.nombreCompleto).toBe('')
    expect(formData.value.serviciosCatering).toEqual([])
    expect(formData.value.aceptaTerminos).toBe(false)
    expect(errors.value).toEqual([])
    expect(showSuccess.value).toBe(false)
    expect(isFormValid.value).toBe(false)
  })

  it('should manage errors correctly', () => {
    const { hasError, getFieldError, clearFieldError, addError } = useFormState()
    
    expect(hasError('test')).toBe(false)
    
    addError('test', 'Test error message')
    expect(hasError('test')).toBe(true)
    expect(getFieldError('test')).toBe('Test error message')
    
    clearFieldError('test')
    expect(hasError('test')).toBe(false)
  })

  it('should validate form completeness', () => {
    const { formData, isFormValid } = useFormState()
    
    // Llenar campos requeridos
    formData.value.nombreCompleto = 'Juan Pérez'
    formData.value.nifNie = '12345678Z'
    formData.value.telefono = '612345678'
    formData.value.email = 'juan@example.com'
    formData.value.tipoEvento = 'Boda'
    formData.value.fechaEvento = '2024-12-25'
    formData.value.horaInicio = '10:00'
    formData.value.presupuesto = 'economico'
    formData.value.serviciosCatering = ['vegetariano']
    formData.value.aceptaTerminos = true
    
    expect(isFormValid.value).toBe(true)
  })

  it('should reset form correctly', () => {
    const { formData, resetForm } = useFormState()
    
    formData.value.nombreCompleto = 'Test'
    formData.value.serviciosCatering = ['vegetariano']
    
    resetForm()
    
    expect(formData.value.nombreCompleto).toBe('')
    expect(formData.value.serviciosCatering).toEqual([])
  })
})

describe('useValidation', () => {
  it('should provide validation functions', () => {
    const { validateWithDebounce, validateOnBlur, scrollToFirstError } = useValidation()
    
    expect(typeof validateWithDebounce).toBe('function')
    expect(typeof validateOnBlur).toBe('function')
    expect(typeof scrollToFirstError).toBe('function')
  })

  it('should validate catering services', () => {
    const { validateOnBlur } = useValidation()
    const errors: any[] = []
    const addError = (field: string, message: string) => errors.push({ field, message })
    const clearFieldError = () => {}
    
    // Sin servicios seleccionados
    validateOnBlur('serviciosCatering', [], addError, clearFieldError)
    expect(errors.length).toBe(1)
    expect(errors[0].message).toContain('al menos un servicio')
    
    // Con servicios seleccionados
    errors.length = 0
    validateOnBlur('serviciosCatering', ['vegetariano'], addError, clearFieldError)
    expect(errors.length).toBe(0)
  })

  it('should validate comments length', () => {
    const { validateOnBlur } = useValidation()
    const errors: any[] = []
    const addError = (field: string, message: string) => errors.push({ field, message })
    const clearFieldError = () => {}
    
    // Comentario muy largo
    const longComment = 'a'.repeat(501)
    validateOnBlur('comentarios', longComment, addError, clearFieldError)
    expect(errors.length).toBe(1)
    expect(errors[0].message).toContain('500 caracteres')
    
    // Comentario válido
    errors.length = 0
    validateOnBlur('comentarios', 'Comentario válido', addError, clearFieldError)
    expect(errors.length).toBe(0)
  })

  it('should validate terms acceptance', () => {
    const { validateOnBlur } = useValidation()
    const errors: any[] = []
    const addError = (field: string, message: string) => errors.push({ field, message })
    const clearFieldError = () => {}
    
    // Términos no aceptados
    validateOnBlur('aceptaTerminos', false, addError, clearFieldError)
    expect(errors.length).toBe(1)
    expect(errors[0].message).toContain('términos y condiciones')
    
    // Términos aceptados
    errors.length = 0
    validateOnBlur('aceptaTerminos', true, addError, clearFieldError)
    expect(errors.length).toBe(0)
  })
})