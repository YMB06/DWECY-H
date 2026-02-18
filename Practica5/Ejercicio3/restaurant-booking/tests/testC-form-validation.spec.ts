import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ReservationForm from '../src/components/ReservationForm.vue'
import { useRestaurantStore } from '../src/stores/restaurant'

describe('Test C: Validación de Formulario - ReservationForm.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should prevent submission when people count exceeds table capacity', async () => {
    const store = useRestaurantStore()
    
    // 1. Seleccionar una mesa con capacidad para 2 personas
    store.selectTable(1) // Mesa 1 tiene capacidad para 2 personas

    const wrapper = mount(ReservationForm)

    // Verificar que el formulario es visible
    expect(wrapper.find('form').exists()).toBe(true)

    // 2. Rellenar el formulario con 5 comensales (excede capacidad)
    await wrapper.find('#name').setValue('Juan Pérez')
    await wrapper.find('#email').setValue('juan@example.com')
    await wrapper.find('#people').setValue(5)

    // 3. Simular el envío del formulario
    await wrapper.find('form').trigger('submit')

    // 4. Expectativa: El evento NO debe haberse emitido
    expect(wrapper.emitted('submit')).toBeFalsy()

    // Debe aparecer un mensaje de error en el DOM
    const errorMessage = wrapper.find('#people-error')
    expect(errorMessage.exists()).toBe(true)
    expect(errorMessage.text()).toContain('Debe ser entre 1 y 2')
  })

  it('should allow submission when people count is within table capacity', async () => {
    const store = useRestaurantStore()
    
    // Seleccionar mesa con capacidad para 4 personas
    store.selectTable(2) // Mesa 2 tiene capacidad para 4 personas

    const wrapper = mount(ReservationForm)

    // Rellenar el formulario correctamente
    await wrapper.find('#name').setValue('María García')
    await wrapper.find('#email').setValue('maria@example.com')
    await wrapper.find('#people').setValue(3)

    // Enviar el formulario
    await wrapper.find('form').trigger('submit')

    // Debe emitirse el evento submit con success: true
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')?.[0]).toEqual([true])
  })

  it('should validate required fields', async () => {
    const store = useRestaurantStore()
    store.selectTable(1)

    const wrapper = mount(ReservationForm)

    // Intentar enviar sin llenar campos
    await wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()

    // No debe emitirse el evento
    expect(wrapper.emitted('submit')).toBeFalsy()

    // Debe aparecer error de nombre
    expect(wrapper.find('#name-error').exists()).toBe(true)
  })

  it('should not render form when no table is selected', () => {
    const wrapper = mount(ReservationForm)

    // Sin mesa seleccionada, el formulario no debe renderizarse
    expect(wrapper.find('form').exists()).toBe(false)
  })

  it('should validate email format', async () => {
    const store = useRestaurantStore()
    store.selectTable(1)

    const wrapper = mount(ReservationForm)

    await wrapper.find('#name').setValue('Juan Pérez')
    await wrapper.find('#email').setValue('invalid-email')
    await wrapper.find('#people').setValue(2)

    await wrapper.find('form').trigger('submit')

    // No debe emitirse el evento por email inválido
    expect(wrapper.emitted('submit')).toBeFalsy()
    expect(wrapper.find('#email-error').exists()).toBe(true)
  })

  it('should reset form after successful submission', async () => {
    const store = useRestaurantStore()
    store.selectTable(1)

    const wrapper = mount(ReservationForm)

    await wrapper.find('#name').setValue('Juan Pérez')
    await wrapper.find('#email').setValue('juan@example.com')
    await wrapper.find('#people').setValue(2)

    await wrapper.find('form').trigger('submit')

    // Después del envío exitoso, la mesa se deselecciona
    expect(store.selectedTableId).toBeNull()
  })
})