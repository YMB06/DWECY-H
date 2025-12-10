<template>
  <nav class="navbar">
    <div class="nav-container">
      <h1 class="nav-title">Práctica 4 - DWECY</h1>
      <div class="nav-buttons">
        <button 
          v-for="exercise in exercises" 
          :key="exercise.id"
          @click="$emit('selectExercise', exercise.id)"
          :class="['nav-btn', { active: currentExercise === exercise.id }]"
        >
          {{ exercise.title }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  currentExercise: string
}>()

defineEmits<{
  selectExercise: [exerciseId: string]
}>()

const exercises = [
  { id: '4-1', title: '4-1 Juego Cartas' },
  { id: '4-2-cinema', title: '4-2 Sala Cine' },
  { id: '4-2-notifications', title: '4-2 Notificaciones' },
  { id: '4-3', title: '4-3 Gestor Horarios' },
  { id: '4-4', title: '4-4 Panel Control' }
]
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.nav-title {
  color: white;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.nav-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.nav-btn {
  padding: 8px 16px;
  border: 2px solid rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.1);
  color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.9rem;
}

.nav-btn:hover {
  background: rgba(255,255,255,0.2);
  border-color: rgba(255,255,255,0.5);
  transform: translateY(-1px);
}

.nav-btn.active {
  background: white;
  color: #667eea;
  border-color: white;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    text-align: center;
  }
  
  .nav-buttons {
    justify-content: center;
  }
}
</style>