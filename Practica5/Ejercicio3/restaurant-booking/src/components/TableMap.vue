<template>
  <div class="table-map">
    <h2>Plano del Restaurante</h2>
    <div class="map-container">
      <Table
        v-for="table in tables"
        :key="table.id"
        :table="table"
        :status="getTableStatus(table.id)"
        @click="handleTableClick"
      />
    </div>
    <div class="legend">
      <span class="legend-item available">🟢 Libre</span>
      <span class="legend-item occupied">🔴 Ocupada</span>
      <span class="legend-item selected">🔵 Seleccionada</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRestaurantStore } from '@/stores/restaurant'
import Table from './Table.vue'
import type { TableStatus } from '@/types'

const store = useRestaurantStore()
const { tables, activeTimeSlot, selectedTableId } = storeToRefs(store)

const getTableStatus = (tableId: number): TableStatus => {
  if (selectedTableId.value === tableId) return 'selected'
  if (!store.isTableAvailable(tableId, activeTimeSlot.value)) return 'occupied'
  return 'available'
}

const handleTableClick = (tableId: number) => {
  if (selectedTableId.value === tableId) {
    store.selectTable(null)
  } else {
    store.selectTable(tableId)
  }
}
</script>

<style scoped>
.table-map {
  margin-bottom: 2rem;
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.map-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  aspect-ratio: 4 / 3;
  margin: 0 auto;
  background: var(--color-card);
  border: 2px solid #dee2e6;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-image: radial-gradient(#e9ecef 1px, transparent 1px);
  background-size: 20px 20px;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.legend-item {
  font-size: 0.9rem;
  font-weight: 600;
}
</style>
