import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CalendarEvent from '../../../Punto7/Punto7-4/calendarEvent.vue'
import type { calendarEvent } from '../../../../types/calendarEvent'

describe('CalendarEvent', () => {
  it('renderiza la estructura del calendario correctamente', () => {
    // Febrero 2024 tuvo 29 días y empezó en Jueves
    const wrapper = mount(CalendarEvent, {
      props: {
        year: 2024,
        month: 1, // Febrero (0-indexado)
        events: []
      }
    })

    // Verificar número total de celdas (35 o 42)
    const cells = wrapper.findAll('.calendar-cell')
    expect(cells.length).toBe(35)

    // Verificar que la primera celda del mes actual contiene "1" y está en la posición correcta
    const currentMonthCells = cells.filter(cell => !cell.classes('is-not-current-month'))
    expect(currentMonthCells[0].find('.day-number').text()).toBe('1')
    
    // Verificar que la última celda del mes contiene "29"
    expect(currentMonthCells[currentMonthCells.length - 1].find('.day-number').text()).toBe('29')
  })

  it('renderiza eventos correctamente', () => {
    const mockEvents: calendarEvent[] = [
      {
        date: new Date(2024, 1, 15), // 15 de febrero 2024
        title: 'Evento de prueba',
        type: 'busy'
      },
      {
        date: new Date(2024, 1, 20), // 20 de febrero 2024
        title: 'Reunión importante',
        type: 'tentative'
      }
    ]

    const wrapper = mount(CalendarEvent, {
      props: {
        year: 2024,
        month: 1,
        events: mockEvents
      }
    })

    const cells = wrapper.findAll('.calendar-cell')
    
    // Buscar la celda del día 15 (que tiene evento)
    const day15Cell = cells.find(cell => 
      cell.find('.day-number').text() === '15' && 
      !cell.classes('is-not-current-month')
    )
    
    expect(day15Cell?.find('.event').exists()).toBe(true)
    expect(day15Cell?.find('.event').text()).toBe('Evento de prueba')

    // Verificar que el día 10 (sin eventos) no tiene elementos de evento
    const day10Cell = cells.find(cell => 
      cell.find('.day-number').text() === '10' && 
      !cell.classes('is-not-current-month')
    )
    
    expect(day10Cell?.find('.event').exists()).toBe(false)
  })

  it('aplica clases condicionales correctamente', () => {
    const mockEvents: calendarEvent[] = [
      {
        date: new Date(2024, 1, 15),
        title: 'Evento ocupado',
        type: 'busy'
      },
      {
        date: new Date(2024, 1, 20),
        title: 'Evento tentativo',
        type: 'tentative'
      },
      {
        date: new Date(2024, 1, 25),
        title: 'Día festivo',
        type: 'holiday'
      }
    ]

    const wrapper = mount(CalendarEvent, {
      props: {
        year: 2024,
        month: 1,
        events: mockEvents
      }
    })

    const cells = wrapper.findAll('.calendar-cell')
    
    // Verificar que las celdas de relleno tienen la clase is-not-current-month
    const paddingCells = cells.filter(cell => cell.classes('is-not-current-month'))
    expect(paddingCells.length).toBeGreaterThan(0)

    // Verificar clases de eventos por tipo
    const busyEvent = wrapper.find('.event-busy')
    expect(busyEvent.exists()).toBe(true)
    expect(busyEvent.text()).toBe('Evento ocupado')

    const tentativeEvent = wrapper.find('.event-tentative')
    expect(tentativeEvent.exists()).toBe(true)
    expect(tentativeEvent.text()).toBe('Evento tentativo')

    const holidayEvent = wrapper.find('.event-holiday')
    expect(holidayEvent.exists()).toBe(true)
    expect(holidayEvent.text()).toBe('Día festivo')
  })
})