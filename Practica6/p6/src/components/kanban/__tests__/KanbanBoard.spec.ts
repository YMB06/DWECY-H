import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import KanbanBoard from '../KanbanBoard.vue'

describe('KanbanBoard', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(KanbanBoard)
  })

  it('renderiza correctamente las columnas', () => {
    expect(wrapper.find('.column.todo').exists()).toBe(true)
    expect(wrapper.find('.column.done').exists()).toBe(true)
  })

  it('muestra las tareas iniciales en las columnas correctas', () => {
    const todoCards = wrapper.findAll('.column.todo .card')
    const doneCards = wrapper.findAll('.column.done .card')

    expect(todoCards.length).toBe(2)
    expect(doneCards.length).toBe(1)
  })

  it('muestra el contador de tareas en cada columna', () => {
    const todoCount = wrapper.find('.column.todo .column-count')
    const doneCount = wrapper.find('.column.done .column-count')

    expect(todoCount.text()).toBe('2')
    expect(doneCount.text()).toBe('1')
  })

  it('las tarjetas tienen el atributo draggable', () => {
    const cards = wrapper.findAll('.card')
    cards.forEach((card: any) => {
      expect(card.attributes('draggable')).toBe('true')
    })
  })
})
