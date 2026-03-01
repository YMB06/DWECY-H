<template>
  <div class="job-list">
    <div class="list-header">
      <h2>📋 Mis Candidaturas ({{ jobs.length }})</h2>
      <button @click="$emit('add-new')" class="btn-add">
        ➕ Nueva Candidatura
      </button>
    </div>

    <div v-if="loading" class="loading">Cargando...</div>
    
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else-if="jobs.length === 0" class="empty">
      <p>No hay candidaturas registradas</p>
      <button @click="$emit('add-new')" class="btn-primary">
        Crear primera candidatura
      </button>
    </div>
    
    <div v-else class="jobs-grid">
      <JobCard
        v-for="job in jobs"
        :key="job.id"
        :job="job"
        @update-status="(status) => $emit('update-status', job.id, status)"
        @delete="$emit('delete', job.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Job } from '@/types/job'
import JobCard from './JobCard.vue'

defineProps<{
  jobs: Job[]
  loading: boolean
  error: string | null
}>()

defineEmits<{
  'add-new': []
  'update-status': [id: number, status: string]
  delete: [id: number]
}>()
</script>

<style scoped>
.job-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h2 {
  color: #2d3748;
  font-size: 2rem;
}

.btn-add {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-add:hover {
  background: #5a67d8;
  transform: scale(1.05);
}

.loading, .error, .empty {
  text-align: center;
  padding: 3rem;
  color: #4a5568;
}

.error {
  color: #e53e3e;
}

.empty p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}
</style>
