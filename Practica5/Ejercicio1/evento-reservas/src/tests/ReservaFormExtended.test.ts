import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ReservaForm from '@/components/ReservaForm.vue'

describe('ReservaForm Extended', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(ReservaForm)
  })

  it('should render all form sections', () => {
    expect(wrapper.find('legend').text()).toContain('Datos Personales')
    expect(wrapper.find('fieldset:nth-child(2) legend').text()).toContain('Detalles del Evento')
    expect(wrapper.find('fieldset:nth-child(3) legend').text()).toContain('Servicios Adicionales')
  })

  it('should render catering checkboxes', () => {
    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    expect(checkboxes.length).toBeGreaterThan(1) // Al menos catering + términos
    
    const cateringLabels = wrapper.findAll('.checkbox-item label')
    expect(cateringLabels.some((label: any) => label.text().includes('vegetariano'))).toBe(true)
    expect(cateringLabels.some((label: any) => label.text().includes('vegano'))).toBe(true)
  })

  it('should render budget radio buttons', () => {
    const radioButtons = wrapper.findAll('input[type="radio"]')
    expect(radioButtons.length).toBe(4) // 4 opciones de presupuesto
    
    const radioLabels = wrapper.findAll('.radio-item label')
    expect(radioLabels.some((label: any) => label.text().includes('Económico'))).toBe(true)
    expect(radioLabels.some((label: any) => label.text().includes('Premium'))).toBe(true)
  })

  it('should validate catering selection', async () => {
    const submitButton = wrapper.find('.submit-btn')
    expect(submitButton.attributes('disabled')).toBeDefined()

    // Seleccionar un servicio de catering
    const vegetarianoCheckbox = wrapper.find('#serviciosCatering-vegetariano')
    await vegetarianoCheckbox.setChecked(true)
    
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formData.serviciosCatering).toContain('vegetariano')
  })

  it('should validate budget selection', async () => {
    const economicoRadio = wrapper.find('#presupuesto-economico')
    await economicoRadio.setChecked(true)
    
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formData.presupuesto).toBe('economico')
  })

  it('should validate comments length', async () => {
    const textarea = wrapper.find('#comentarios')
    const longText = 'a'.repeat(501) // Más de 500 caracteres
    
    await textarea.setValue(longText)
    await textarea.trigger('blur')
    
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#comentarios-error').exists()).toBe(true)
    expect(wrapper.find('#comentarios-error').text()).toContain('500 caracteres')
  })

  it('should show character count for comments', async () => {
    const textarea = wrapper.find('#comentarios')
    await textarea.setValue('Test comment')
    
    await wrapper.vm.$nextTick()
    const charCount = wrapper.find('.character-count')
    expect(charCount.text()).toContain('12/500')
  })

  it('should validate terms acceptance', async () => {
    const termsCheckbox = wrapper.find('#aceptaTerminos')
    expect(wrapper.vm.formData.aceptaTerminos).toBe(false)
    
    await termsCheckbox.setChecked(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formData.aceptaTerminos).toBe(true)
  })

  it('should show validation icons', async () => {
    const nombreInput = wrapper.find('#nombreCompleto')
    await nombreInput.setValue('Juan Pérez')
    
    await wrapper.vm.$nextTick()
    const validationIcon = wrapper.find('.validation-icon')
    expect(validationIcon.exists()).toBe(true)
  })

  it('should require all mandatory fields for submission', async () => {
    // Llenar todos los campos obligatorios
    await wrapper.find('#nombreCompleto').setValue('Juan Pérez')
    await wrapper.find('#nifNie').setValue('12345678Z')
    await wrapper.find('#telefono').setValue('612345678')
    await wrapper.find('#email').setValue('juan@example.com')
    await wrapper.find('#tipoEvento').setValue('Boda')
    
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 10)
    await wrapper.find('#fechaEvento').setValue(futureDate.toISOString().split('T')[0])
    await wrapper.find('#horaInicio').setValue('10:00')
    
    // Servicios adicionales
    await wrapper.find('#serviciosCatering-vegetariano').setChecked(true)
    await wrapper.find('#presupuesto-economico').setChecked(true)
    await wrapper.find('#aceptaTerminos').setChecked(true)

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isFormValid).toBe(true)
  })

  it('should handle form reset correctly', async () => {
    // Llenar algunos campos
    await wrapper.find('#nombreCompleto').setValue('Juan Pérez')
    await wrapper.find('#serviciosCatering-vegetariano').setChecked(true)
    await wrapper.find('#comentarios').setValue('Test comment')
    
    expect(wrapper.vm.formData.nombreCompleto).toBe('Juan Pérez')
    expect(wrapper.vm.formData.serviciosCatering).toContain('vegetariano')
    expect(wrapper.vm.formData.comentarios).toBe('Test comment')

    // Reset form
    await wrapper.find('.reset-btn').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.formData.nombreCompleto).toBe('')
    expect(wrapper.vm.formData.serviciosCatering).toHaveLength(0)
    expect(wrapper.vm.formData.comentarios).toBe('')
  })

  it('should validate with debounce on input', async () => {
    const nombreInput = wrapper.find('#nombreCompleto')
    
    // Simular escritura rápida
    await nombreInput.setValue('AB')
    
    // No debería mostrar error inmediatamente
    expect(wrapper.find('#nombreCompleto-error').exists()).toBe(false)
    
    // Después del debounce (simulado con blur)
    await nombreInput.trigger('blur')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('#nombreCompleto-error').exists()).toBe(true)
  })
})