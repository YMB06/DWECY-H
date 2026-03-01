<template>
  <div class="job-card" :class="`status-${job.estado.toLowerCase().replace(/\s/g, '-')}`">
    <div class="job-header">
      <h3>{{ job.puesto }}</h3>
      <span class="status-badge">{{ job.estado }}</span>
    </div>
    
    <p class="company">🏢 {{ job.empresa }}</p>
    
    <div class="job-actions">
      <select 
        :value="job.estado" 
        @change="$emit('update-status', ($event.target as HTMLSelectElement).value)"
        class="status-select"
      >
        <option value="CV Enviado">CV Enviado</option>
        <option value="Entrevista Técnica">Entrevista Técnica</option>
        <option value="Entrevista RRHH">Entrevista RRHH</option>
        <option value="Oferta Recibida">Oferta Recibida</option>
        <option value="Rechazado">Rechazado</option>
      </select>
      
      <button @click="$emit('delete')" class="btn-delete" title="Eliminar">
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Job } from '@/types/job'

defineProps<{
  job: Job
}>()

defineEmits<{
  'update-status': [status: string]
  delete: []
}>()
</script>

<style scoped>
.job-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #667eea;
  transition: transform 0.3s;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.job-card.status-rechazado {
  border-left-color: #e53e3e;
  opacity: 0.7;
}

.job-card.status-oferta-recibida {
  border-left-color: #48bb78;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
}

h3 {
  color: #2d3748;
  margin: 0;
  font-size: 1.2rem;
}

.status-badge {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.company {
  color: #4a5568;
  margin-bottom: 1rem;
}

.job-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.status-select {
  flex: 1;
  padding: 0.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
}

.status-select:focus {
  outline: none;
  border-color: #667eea;
}

.btn-delete {
  padding: 0.5rem 1rem;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-delete:hover {
  background: #c53030;
}
</style>
