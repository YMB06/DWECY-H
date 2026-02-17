<template>
  <div class="time-slot-selector">
    <h2>Selecciona un horario</h2>
    <div class="slots">
      <button
        v-for="slot in timeSlots"
        :key="slot"
        :class="{ active: activeTimeSlot === slot }"
        @click="selectSlot(slot)"
        :aria-label="`Horario ${slot}`"
        :aria-pressed="activeTimeSlot === slot"
      >
        {{ slot }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRestaurantStore } from '@/stores/restaurant'
import type { TimeSlot } from '@/types'

const store = useRestaurantStore()
const { activeTimeSlot } = storeToRefs(store)

const timeSlots: TimeSlot[] = ['13:00', '14:00', '15:00', '20:00', '21:00']

const selectSlot = (slot: TimeSlot) => {
  store.setTimeSlot(slot)
}
</script>

<style scoped>
.time-slot-selector {
  text-align: center;
  margin-bottom: 2rem;
}

h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.slots {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

button {
  padding: 1rem 2rem;
  border: 2px solid #42b983;
  background: white;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  background: #f0f9ff;
  transform: translateY(-2px);
}

button:focus {
  outline: 3px solid #42b983;
  outline-offset: 2px;
}

button.active {
  background: #42b983;
  color: white;
}
</style>
