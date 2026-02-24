<template>
  <div class="hud">
    <div class="stat">
      <span class="label">📦 Cajas:</span>
      <span class="value">{{ score }}</span>
    </div>
    <div class="stat">
      <span class="label">⏱️ Tiempo:</span>
      <span class="value">{{ formattedTime }}</span>
    </div>
    <button @click="$emit('restart')" class="restart-btn">
      🔄 Reiniciar
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  score: number
  time: number
}>()

defineEmits<{
  restart: []
}>()

const formattedTime = computed(() => {
  const minutes = Math.floor(props.time / 60)
  const seconds = props.time % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})
</script>

<style scoped>
.hud {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  border-radius: 12px;
  color: white;
  font-family: monospace;
  z-index: 10;
}

.stat {
  display: flex;
  gap: 0.5rem;
  font-size: 1.2rem;
}

.label {
  font-weight: bold;
}

.value {
  color: #ffff00;
  font-weight: bold;
}

.restart-btn {
  padding: 0.5rem 1rem;
  background: #ff6600;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.restart-btn:hover {
  background: #ff8833;
  transform: scale(1.05);
}

.restart-btn:focus {
  outline: 3px solid white;
  outline-offset: 2px;
}
</style>
