import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Table from '../src/components/Table.vue'
import type { Table as TableType } from '../src/types'

describe('Test B: Visualización y Eventos - Table.vue', () => {
  const mockTable: TableType = {
    id: 5,
    label: 'Mesa 5',
    capacity: 4,
    position: { x: 100, y: 100 }
  }

  it('should display correct CSS class and aria-label when status is occupied', () => {
    // 1. Montar el componente con status="occupied"
    const wrapper = mount(Table, {
      props: {
        table: mockTable,
        status: 'occupied'
      }
    })

    // 2. Verificar que tiene la clase CSS de "ocupado"
    const button = wrapper.find('button')
    expect(button.classes()).toContain('occupied')

    // Verificar que el aria-label es correcto
    const ariaLabel = button.attributes('aria-label')
    expect(ariaLabel).toContain('Mesa 5')
    expect(ariaLabel).toContain('4 personas')
    expect(ariaLabel).toContain('Ocupada')
  })

  it('should emit click event with table ID when clicked', async () => {
    // 1. Montar el componente
    const wrapper = mount(Table, {
      props: {
        table: mockTable,
        status: 'available'
      }
    })

    // 3. Disparar evento click
    await wrapper.find('button').trigger('click')

    // 4. Verificar que se emitió el evento con el ID correcto
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0]).toEqual([5])
  })

  it('should not emit click event when status is occupied', async () => {
    const wrapper = mount(Table, {
      props: {
        table: mockTable,
        status: 'occupied'
      }
    })

    const button = wrapper.find('button')
    
    // Verificar que el botón está deshabilitado
    expect(button.attributes('disabled')).toBeDefined()

    // Intentar hacer click
    await button.trigger('click')

    // No debe emitir evento
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('should display correct visual state for available table', () => {
    const wrapper = mount(Table, {
      props: {
        table: mockTable,
        status: 'available'
      }
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('available')
    expect(button.attributes('aria-label')).toContain('Libre')
  })

  it('should display correct visual state for selected table', () => {
    const wrapper = mount(Table, {
      props: {
        table: mockTable,
        status: 'selected'
      }
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('selected')
    expect(button.attributes('aria-label')).toContain('Seleccionada')
  })

  it('should be keyboard accessible', () => {
    const wrapper = mount(Table, {
      props: {
        table: mockTable,
        status: 'available'
      }
    })

    const button = wrapper.find('button')
    
    // Verificar que es un elemento button (navegable por teclado)
    expect(button.element.tagName).toBe('BUTTON')
    
    // Verificar que no está deshabilitado
    expect(button.attributes('disabled')).toBeUndefined()
  })
})