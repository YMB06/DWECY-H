<template>
  <form @submit.prevent="handleSubmit" class="job-form">
    <h3>{{ isEdit ? 'Editar' : 'Nueva' }} Candidatura</h3>
    
    <div class="form-group">
      <label for="empresa">Empresa *</label>
      <input
        id="empresa"
        v-model="formData.empresa"
        type="text"
        required
        placeholder="Ej: Google"
      />
    </div>

    <div class="form-group">
      <label for="puesto">Puesto *</label>
      <input
        id="puesto"
        v-model="formData.puesto"
        type="text"
        required
        placeholder="Ej: Frontend Developer"
      />
    </div>

    <div class="form-group">
      <label for="estado">Estado *</label>
      <select id="estado" v-model="formData.estado" required>
        <option value="CV Enviado">CV Enviado</option>
        <option value="Entrevista Técnica">Entrevista Técnica</option>
        <option value="Entrevista RRHH">Entrevista RRHH</option>
        <option value="Oferta Recibida">Oferta Recibida</option>
        <option value="Rechazado">Rechazado</option>
      </select>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn-primary">
        {{ isEdit ? 'Actualizar' : 'Crear' }}
      </button>
      <button type="button" @click="$emit('cancel')" class="btn-secondary">
        Cancelar
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { Job, JobStatus } from '@/types/job'

const props = defineProps<{
  job?: Job
  isEdit?: boolean
}>()

const emit = defineEmits<{
  submit: [data: { empresa: string; puesto: string; estado: JobStatus }]
  cancel: []
}>()

const formData = reactive({
  empresa: props.job?.empresa || '',
  puesto: props.job?.puesto || '',
  estado: (props.job?.estado || 'CV Enviado') as JobStatus
})

watch(() => props.job, (newJob) => {
  if (newJob) {
    formData.empresa = newJob.empresa
    formData.puesto = newJob.puesto
    formData.estado = newJob.estado
  }
})

const handleSubmit = () => {
  emit('submit', { ...formData })
}
</script>

<style scoped>
.job-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
}

h3 {
  margin-bottom: 1.5rem;
  color: #2d3748;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #4a5568;
}

input, select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
}

input:focus, select:focus {
  outline: none;
  border-color: #667eea;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-primary, .btn-secondary {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a67d8;
}

.btn-secondary {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background: #cbd5e0;
}
</style>
