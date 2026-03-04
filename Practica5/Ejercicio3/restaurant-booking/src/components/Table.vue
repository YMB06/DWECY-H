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
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s, background 0.3s;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.table:focus {
  outline: 4px solid var(--color-primary);
  outline-offset: 4px;
}

.table.available {
  background: #d4edda;
  border-color: var(--color-primary);
  color: #155724;
}

.table.available:hover {
  background: #c3e6cb;
  transform: scale(1.05);
}

.table.occupied {
  background: #f8d7da;
  border-color: var(--color-secondary);
  color: #721c24;
  cursor: not-allowed;
  opacity: 0.7;
}

.table.selected {
  background: #cce5ff;
  border-color: var(--color-primary);
  color: #004085;
  transform: scale(1.1);
}

.label {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.capacity {
  font-size: 0.8rem;
}
</style>
