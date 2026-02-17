import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Table, Reservation, TimeSlot } from '@/types'

export const useRestaurantStore = defineStore('restaurant', () => {
  const tables = ref<Table[]>([
    { id: 1, label: 'Mesa 1', capacity: 2, position: { x: 50, y: 50 } },
    { id: 2, label: 'Mesa 2', capacity: 4, position: { x: 200, y: 50 } },
    { id: 3, label: 'Mesa 3', capacity: 4, position: { x: 350, y: 50 } },
    { id: 4, label: 'Mesa 4', capacity: 6, position: { x: 50, y: 200 } },
    { id: 5, label: 'Mesa 5', capacity: 2, position: { x: 200, y: 200 } },
    { id: 6, label: 'Mesa 6', capacity: 8, position: { x: 350, y: 200 } }
  ])

  const reservations = ref<Reservation[]>([])
  const activeTimeSlot = ref<TimeSlot>('13:00')
  const selectedTableId = ref<number | null>(null)

  const isTableAvailable = (tableId: number, timeSlot: TimeSlot): boolean => {
    return !reservations.value.some(
      r => r.tableId === tableId && r.timeSlot === timeSlot
    )
  }

  const addReservation = (reservation: Omit<Reservation, 'id'>): boolean => {
    if (!isTableAvailable(reservation.tableId, reservation.timeSlot)) {
      return false
    }

    const table = tables.value.find(t => t.id === reservation.tableId)
    if (!table || reservation.peopleCount > table.capacity) {
      return false
    }

    reservations.value.push({
      ...reservation,
      id: `${Date.now()}-${Math.random()}`
    })
    return true
  }

  const setTimeSlot = (slot: TimeSlot) => {
    activeTimeSlot.value = slot
    selectedTableId.value = null
  }

  const selectTable = (tableId: number | null) => {
    selectedTableId.value = tableId
  }

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
