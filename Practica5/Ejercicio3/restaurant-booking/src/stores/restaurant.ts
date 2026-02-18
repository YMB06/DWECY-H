import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Table, Reservation, TimeSlot } from '@/types'

/**
 * Store de Pinia para gestionar el estado del restaurante
 * Maneja mesas, reservas, franjas horarias y selección de mesas
 */
export const useRestaurantStore = defineStore('restaurant', () => {
  // Estado: Lista de mesas del restaurante con capacidad y posición
  const tables = ref<Table[]>([
    { id: 1, label: 'Mesa 1', capacity: 2, position: { x: 50, y: 50 } },
    { id: 2, label: 'Mesa 2', capacity: 4, position: { x: 200, y: 50 } },
    { id: 3, label: 'Mesa 3', capacity: 4, position: { x: 350, y: 50 } },
    { id: 4, label: 'Mesa 4', capacity: 6, position: { x: 50, y: 200 } },
    { id: 5, label: 'Mesa 5', capacity: 2, position: { x: 200, y: 200 } },
    { id: 6, label: 'Mesa 6', capacity: 8, position: { x: 350, y: 200 } }
  ])

  // Estado: Lista de reservas realizadas
  const reservations = ref<Reservation[]>([])
  
  // Estado: Franja horaria actualmente seleccionada
  const activeTimeSlot = ref<TimeSlot>('13:00')
  
  // Estado: ID de la mesa seleccionada (null si no hay selección)
  const selectedTableId = ref<number | null>(null)

  /**
   * Verifica si una mesa está disponible en una franja horaria
   * @param tableId - ID de la mesa
   * @param timeSlot - Franja horaria
   * @returns true si la mesa está libre
   */
  const isTableAvailable = (tableId: number, timeSlot: TimeSlot): boolean => {
    return !reservations.value.some(
      r => r.tableId === tableId && r.timeSlot === timeSlot
    )
  }

  /**
   * Añade una nueva reserva si la mesa está disponible y tiene capacidad
   * @param reservation - Datos de la reserva (sin ID)
   * @returns true si la reserva se creó exitosamente
   */
  const addReservation = (reservation: Omit<Reservation, 'id'>): boolean => {
    // Verificar disponibilidad
    if (!isTableAvailable(reservation.tableId, reservation.timeSlot)) {
      return false
    }

    // Verificar capacidad de la mesa
    const table = tables.value.find(t => t.id === reservation.tableId)
    if (!table || reservation.peopleCount > table.capacity) {
      return false
    }

    // Crear reserva con ID único
    reservations.value.push({
      ...reservation,
      id: `${Date.now()}-${Math.random()}`
    })
    return true
  }

  /**
   * Cambia la franja horaria activa y limpia la selección de mesa
   */
  const setTimeSlot = (slot: TimeSlot) => {
    activeTimeSlot.value = slot
    selectedTableId.value = null // Limpiar selección al cambiar horario
  }

  /**
   * Selecciona o deselecciona una mesa
   */
  const selectTable = (tableId: number | null) => {
    selectedTableId.value = tableId
  }

  // Computed: Obtiene el objeto completo de la mesa seleccionada
  const selectedTable = computed(() => 
    tables.value.find(t => t.id === selectedTableId.value) || null
  )

  return {
    tables,
    reservations,
    activeTimeSlot,
    selectedTableId,
    selectedTable,
    isTableAvailable,
    addReservation,
    setTimeSlot,
    selectTable
  }
})
