<template>
  <button
    class="table"
    :class="status"
    :style="{ left: `${table.position.x}px`, top: `${table.position.y}px` }"
    :aria-label="`${table.label}, para ${table.capacity} personas, estado: ${statusText}`"
    :disabled="status === 'occupied'"
    @click="handleClick"
  >
    <span class="label">{{ table.label }}</span>
    <span class="capacity">👥 {{ table.capacity }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Table, TableStatus } from '@/types'

const props = defineProps<{
  table: Table
  status: TableStatus
}>()

const emit = defineEmits<{
  click: [tableId: number]
}>()

const statusText = computed(() => {
  switch (props.status) {
    case 'available': return 'Libre'
    case 'occupied': return 'Ocupada'
    case 'selected': return 'Seleccionada'
  }
})

const handleClick = () => {
  if (props.status !== 'occupied') {
    emit('click', props.table.id)
  }
}
</script>

<style scoped>
.table {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 12px;
  border: 3px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
}

.table:focus {
  outline: 4px solid #000;
  outline-offset: 4px;
}

.table.available {
  background: #d4edda;
  border-color: #28a745;
  color: #155724;
}

.table.available:hover {
  background: #c3e6cb;
  transform: scale(1.05);
}

.table.occupied {
  background: #f8d7da;
  border-color: #dc3545;
  color: #721c24;
  cursor: not-allowed;
  opacity: 0.7;
}

.table.selected {
  background: #cce5ff;
  border-color: #007bff;
  color: #004085;
  transform: scale(1.1);
}

.label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.capacity {
  font-size: 0.9rem;
}
</style>
