<template>
  <div class="progress-indicator">
    <div class="progress-header">
      <h3>Progreso del Formulario</h3>
      <span class="progress-percentage">{{ progressPercentage }}%</span>
    </div>
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="{ width: `${progressPercentage}%` }"
        :class="{ complete: progressPercentage === 100 }"
      ></div>
    </div>
    <div class="progress-details">
      <span class="completed-fields">{{ completedFields }} de {{ totalFields }} campos completados</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ReservaFormData } from '@/types/reservation'

interface Props {
  formData: ReservaFormData
  hasErrors: boolean
}

const props = defineProps<Props>()

const fieldChecks = computed(() => {
  const checks = [
    { name: 'nombreCompleto', valid: props.formData.nombreCompleto.trim().length >= 3 },
    { name: 'nifNie', valid: props.formData.nifNie.trim().length >= 9 },
    { name: 'telefono', valid: props.formData.telefono.trim().length === 9 },
    { name: 'email', valid: props.formData.email.includes('@') && props.formData.email.includes('.') },
    { name: 'tipoEvento', valid: props.formData.tipoEvento !== '' },
    { name: 'fechaEvento', valid: props.formData.fechaEvento !== '' },
    { name: 'horaInicio', valid: props.formData.horaInicio !== '' },
    { name: 'numeroAsistentes', valid: props.formData.numeroAsistentes >= 10 && props.formData.numeroAsistentes <= 500 },
    { name: 'serviciosCatering', valid: props.formData.serviciosCatering.length > 0 },
    { name: 'presupuesto', valid: props.formData.presupuesto !== '' },
    { name: 'comentarios', valid: props.formData.comentarios.length <= 500 },
    { name: 'aceptaTerminos', valid: props.formData.aceptaTerminos }
  ]
  return checks
})

const completedFields = computed(() => {
  return fieldChecks.value.filter(check => check.valid).length
})

const totalFields = computed(() => {
  return fieldChecks.value.length
})

const progressPercentage = computed(() => {
  if (totalFields.value === 0) return 0
  const percentage = Math.round((completedFields.value / totalFields.value) * 100)
  return props.hasErrors ? Math.max(0, percentage - 10) : percentage
})
</script>