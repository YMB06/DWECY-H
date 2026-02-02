import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ReservaForm from '@/components/ReservaForm.vue'

describe('ReservaForm', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(ReservaForm)
  })

  it('should render form with all required fields', () => {
    expect(wrapper.find('#nombreCompleto').exists()).toBe(true)
    expect(wrapper.find('#nifNie').exists()).toBe(true)
    expect(wrapper.find('#telefono').exists()).toBe(true)
    expect(wrapper.find('#email').exists()).toBe(true)
    expect(wrapper.find('#tipoEvento').exists()).toBe(true)
    expect(wrapper.find('#fechaEvento').exists()).toBe(true)
    expect(wrapper.find('#horaInicio').exists()).toBe(true)
    expect(wrapper.find('#numeroAsistentes').exists()).toBe(true)
    expect(wrapper.find('#numeroAsistentesRange').exists()).toBe(true)
  })

  it('should have proper accessibility attributes', () => {
    const nombreInput = wrapper.find('#nombreCompleto')
    expect(nombreInput.attributes('aria-describedby')).toBe('nombreCompleto-error')
    expect(nombreInput.attributes('required')).toBeDefined()

    const submitButton = wrapper.find('.submit-btn')
    expect(submitButton.exists()).toBe(true)
  })

  it('should sync number and range inputs', async () => {
    const numberInput = wrapper.find('#numeroAsistentes')
    const rangeInput = wrapper.find('#numeroAsistentesRange')

    await numberInput.setValue(100)
    expect(wrapper.vm.formData.numeroAsistentes).toBe(100)

    await rangeInput.setValue(200)
    expect(wrapper.vm.formData.numeroAsistentes).toBe(200)
  })

  it('should validate required fields', async () => {
    const submitButton = wrapper.find('.submit-btn')
    expect(submitButton.attributes('disabled')).toBeDefined()

    // Llenar campos requeridos
    await wrapper.find('#nombreCompleto').setValue('Juan Pérez')
    await wrapper.find('#nifNie').setValue('12345678Z')
    await wrapper.find('#telefono').setValue('612345678')
    await wrapper.find('#email').setValue('juan@example.com')
    await wrapper.find('#tipoEvento').setValue('Boda')
    
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 10)
    await wrapper.find('#fechaEvento').setValue(futureDate.toISOString().split('T')[0])
    await wrapper.find('#horaInicio').setValue('10:00')

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isFormValid).toBe(true)
  })

  it('should show validation errors', async () => {
    const nombreInput = wrapper.find('#nombreCompleto')
    await nombreInput.setValue('AB')
    await nombreInput.trigger('blur')

    await wrapper.vm.$nextTick()
    expect(wrapper.find('#nombreCompleto-error').exists()).toBe(true)
    expect(wrapper.find('#nombreCompleto-error').text()).toContain('Solo letras, espacios y tildes')
  })

  it('should clear errors when field is corrected', async () => {
    const nombreInput = wrapper.find('#nombreCompleto')
    
    // Introducir valor inválido
    await nombreInput.setValue('AB')
    await nombreInput.trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#nombreCompleto-error').exists()).toBe(true)

    // Corregir valor
    await nombreInput.setValue('Juan Pérez')
    await nombreInput.trigger('input')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#nombreCompleto-error').exists()).toBe(false)
  })

  it('should reset form when reset button is clicked', async () => {
    // Llenar algunos campos
    await wrapper.find('#nombreCompleto').setValue('Juan Pérez')
    await wrapper.find('#email').setValue('juan@example.com')
    
    expect(wrapper.vm.formData.nombreCompleto).toBe('Juan Pérez')
    expect(wrapper.vm.formData.email).toBe('juan@example.com')

    // Hacer clic en reset
    await wrapper.find('.reset-btn').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.formData.nombreCompleto).toBe('')
    expect(wrapper.vm.formData.email).toBe('')
  })

  it('should validate NIF letter correctly', async () => {
    const nifInput = wrapper.find('#nifNie')
    
    // NIF con letra incorrecta
    await nifInput.setValue('12345678A')
    await nifInput.trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#nifNie-error').text()).toContain('Letra de control del NIF incorrecta')

    // NIF con letra correcta
    await nifInput.setValue('12345678Z')
    await nifInput.trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#nifNie-error').exists()).toBe(false)
  })

  it('should validate phone number format', async () => {
    const telefonoInput = wrapper.find('#telefono')
    
    // Teléfono inválido
    await telefonoInput.setValue('512345678')
    await telefonoInput.trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#telefono-error').exists()).toBe(true)

    // Teléfono válido
    await telefonoInput.setValue('612345678')
    await telefonoInput.trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#telefono-error').exists()).toBe(false)
  })

  it('should validate date range', async () => {
    const fechaInput = wrapper.find('#fechaEvento')
    
    // Fecha en el pasado
    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - 1)
    await fechaInput.setValue(pastDate.toISOString().split('T')[0])
    await fechaInput.trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#fechaEvento-error').exists()).toBe(true)

    // Fecha válida
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 10)
    await fechaInput.setValue(futureDate.toISOString().split('T')[0])
    await fechaInput.trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#fechaEvento-error').exists()).toBe(false)
  })

  it('should validate time range', async () => {
    const horaInput = wrapper.find('#horaInicio')
    
    // Hora muy temprana
    await horaInput.setValue('06:00')
    await horaInput.trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#horaInicio-error').exists()).toBe(true)

    // Hora válida
    await horaInput.setValue('10:00')
    await horaInput.trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#horaInicio-error').exists()).toBe(false)
  })

  it('should validate number of attendees range', async () => {
    const numeroInput = wrapper.find('#numeroAsistentes')
    
    // Número muy bajo
    await numeroInput.setValue(5)
    await numeroInput.trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#numeroAsistentes-error').exists()).toBe(true)

    // Número válido
    await numeroInput.setValue(100)
    await numeroInput.trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#numeroAsistentes-error').exists()).toBe(false)
  })

  it('should show success message after valid submission', async () => {
    // Llenar todos los campos con valores válidos
    await wrapper.find('#nombreCompleto').setValue('Juan Pérez')
    await wrapper.find('#nifNie').setValue('12345678Z')
    await wrapper.find('#telefono').setValue('612345678')
    await wrapper.find('#email').setValue('juan@example.com')
    await wrapper.find('#tipoEvento').setValue('Boda')
    
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 10)
    await wrapper.find('#fechaEvento').setValue(futureDate.toISOString().split('T')[0])
    await wrapper.find('#horaInicio').setValue('10:00')
    await wrapper.find('#numeroAsistentes').setValue(100)

    // Enviar formulario
    await wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.success-message').exists()).toBe(true)
    expect(wrapper.find('.success-message').text()).toContain('¡Reserva enviada correctamente!')
  })
})