import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRestaurantStore } from '../src/stores/restaurant'

describe('Test A: Lógica de Negocio - Evitar Overbooking', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should prevent double booking for the same table and time slot', () => {
    const store = useRestaurantStore()

    // 1. Reservar Mesa 1 a las 14:00
    const firstReservation = store.addReservation({
      tableId: 1,
      timeSlot: '14:00',
      customerName: 'Juan Pérez',
      customerEmail: 'juan@example.com',
      peopleCount: 2
    })

    expect(firstReservation).toBe(true)
    expect(store.reservations).toHaveLength(1)

    // 2. Intentar reservar Mesa 1 a las 14:00 de nuevo
    const secondReservation = store.addReservation({
      tableId: 1,
      timeSlot: '14:00',
      customerName: 'María García',
      customerEmail: 'maria@example.com',
      peopleCount: 2
    })

    // 3. Expectativa: Debe devolver false y no aumentar el contador
    expect(secondReservation).toBe(false)
    expect(store.reservations).toHaveLength(1)
    expect(store.reservations[0].customerName).toBe('Juan Pérez')
  })

  it('should allow booking the same table at different time slots', () => {
    const store = useRestaurantStore()

    // Reservar Mesa 1 a las 14:00
    const firstReservation = store.addReservation({
      tableId: 1,
      timeSlot: '14:00',
      customerName: 'Juan Pérez',
      customerEmail: 'juan@example.com',
      peopleCount: 2
    })

    // Reservar Mesa 1 a las 21:00 (diferente horario)
    const secondReservation = store.addReservation({
      tableId: 1,
      timeSlot: '21:00',
      customerName: 'María García',
      customerEmail: 'maria@example.com',
      peopleCount: 2
    })

    expect(firstReservation).toBe(true)
    expect(secondReservation).toBe(true)
    expect(store.reservations).toHaveLength(2)
  })

  it('should check table availability correctly', () => {
    const store = useRestaurantStore()

    // Mesa 1 está libre inicialmente
    expect(store.isTableAvailable(1, '14:00')).toBe(true)

    // Reservar Mesa 1 a las 14:00
    store.addReservation({
      tableId: 1,
      timeSlot: '14:00',
      customerName: 'Juan Pérez',
      customerEmail: 'juan@example.com',
      peopleCount: 2
    })

    // Mesa 1 ya no está disponible a las 14:00
    expect(store.isTableAvailable(1, '14:00')).toBe(false)

    // Pero sí está disponible a las 21:00
    expect(store.isTableAvailable(1, '21:00')).toBe(true)
  })
})