import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRestaurantStore } from '../restaurant'

describe('Restaurant Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with 6 tables', () => {
    const store = useRestaurantStore()
    expect(store.tables).toHaveLength(6)
  })

  it('checks table availability correctly', () => {
    const store = useRestaurantStore()
    expect(store.isTableAvailable(1, '13:00')).toBe(true)
  })

  it('adds reservation successfully', () => {
    const store = useRestaurantStore()
    const result = store.addReservation({
      tableId: 1,
      timeSlot: '13:00',
      customerName: 'Juan Pérez',
      customerEmail: 'juan@test.com',
      peopleCount: 2
    })
    expect(result).toBe(true)
    expect(store.reservations).toHaveLength(1)
  })

  it('prevents double booking', () => {
    const store = useRestaurantStore()
    store.addReservation({
      tableId: 1,
      timeSlot: '13:00',
      customerName: 'Juan',
      customerEmail: 'juan@test.com',
      peopleCount: 2
    })
    const result = store.addReservation({
      tableId: 1,
      timeSlot: '13:00',
      customerName: 'María',
      customerEmail: 'maria@test.com',
      peopleCount: 2
    })
    expect(result).toBe(false)
  })

  it('validates capacity', () => {
    const store = useRestaurantStore()
    const result = store.addReservation({
      tableId: 1,
      timeSlot: '13:00',
      customerName: 'Juan',
      customerEmail: 'juan@test.com',
      peopleCount: 10
    })
    expect(result).toBe(false)
  })

  it('changes time slot', () => {
    const store = useRestaurantStore()
    store.setTimeSlot('21:00')
    expect(store.activeTimeSlot).toBe('21:00')
  })
})
