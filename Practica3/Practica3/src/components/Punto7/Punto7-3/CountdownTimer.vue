<template>
  <div class="countdown-container">
    <div v-if="!isFinished" class="countdown">
      <div class="time-unit">
        <span class="number">{{ formatNumber(days) }}</span>
        <span class="label">Días</span>
      </div>
      <div class="time-unit">
        <span class="number">{{ formatNumber(hours) }}</span>
        <span class="label">Horas</span>
      </div>
      <div class="time-unit">
        <span class="number">{{ formatNumber(minutes) }}</span>
        <span class="label">Minutos</span>
      </div>
      <div class="time-unit">
        <span class="number">{{ formatNumber(seconds) }}</span>
        <span class="label">Segundos</span>
      </div>
    </div>
    <div v-else class="finished">
      ¡El evento ha comenzado!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Props {
  targetDate: Date;
}

const props = defineProps<Props>();

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const isFinished = ref(false);

let timerId: number;

function updateCountdown() {
  const now = new Date();
  const distance = props.targetDate.getTime() - now.getTime();
  
  if (distance <= 0) {
    clearInterval(timerId);
    isFinished.value = true;
    return;
  }
  
  days.value = Math.floor(distance / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  seconds.value = Math.floor((distance % (1000 * 60)) / 1000);
}

function formatNumber(value: number): string {
  return String(value).padStart(2, '0');
}

onMounted(() => {
  updateCountdown();
  timerId = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(timerId);
});
</script>

<style scoped>
.countdown-container {
  text-align: center;
  margin: 20px 0;
}

.countdown {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.time-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
  min-width: 80px;
}

.number {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.label {
  font-size: 0.9rem;
  color: #666;
  margin-top: 5px;
}

.finished {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4caf50;
  padding: 20px;
  background: #f0f8f0;
  border-radius: 8px;
}
</style>