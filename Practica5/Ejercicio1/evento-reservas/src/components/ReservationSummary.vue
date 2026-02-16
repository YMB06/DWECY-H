<template>
  <div v-if="hasValidData" class="reservation-summary">
    <h2>Resumen de Reserva</h2>
    
    <div class="summary-section" v-if="personalData.length > 0">
      <h3>Datos Personales</h3>
      <ul>
        <li v-for="item in personalData" :key="item.label">
          <strong>{{ item.label }}:</strong> {{ item.value }}
        </li>
      </ul>
    </div>

    <div class="summary-section" v-if="eventData.length > 0">
      <h3>Detalles del Evento</h3>
      <ul>
        <li v-for="item in eventData" :key="item.label">
          <strong>{{ item.label }}:</strong> {{ item.value }}
        </li>
      </ul>
    </div>

    <div class="summary-section" v-if="servicesData.length > 0">
      <h3>Servicios Adicionales</h3>
      <ul>
        <li v-for="item in servicesData" :key="item.label">
          <strong>{{ item.label }}:</strong> {{ item.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ReservaFormData } from '@/types/reservation'

interface Props {
  formData: ReservaFormData
}

const props = defineProps<Props>()

const personalData = computed(() => {
  const data = []
  if (props.formData.nombreCompleto.trim()) {
    data.push({ label: 'Nombre', value: props.formData.nombreCompleto })
  }
  if (props.formData.nifNie.trim()) {
    data.push({ label: 'NIF/NIE', value: props.formData.nifNie })
  }
  if (props.formData.telefono.trim()) {
    data.push({ label: 'Teléfono', value: props.formData.telefono })
  }
  if (props.formData.email.trim()) {
    data.push({ label: 'Email', value: props.formData.email })
  }
  return data
})

const eventData = computed(() => {
  const data = []
  if (props.formData.tipoEvento) {
    data.push({ label: 'Tipo de Evento', value: props.formData.tipoEvento })
  }
  if (props.formData.fechaEvento) {
    const fecha = new Date(props.formData.fechaEvento).toLocaleDateString('es-ES')
    data.push({ label: 'Fecha', value: fecha })
  }
  if (props.formData.horaInicio) {
    data.push({ label: 'Hora', value: props.formData.horaInicio })
  }
  if (props.formData.numeroAsistentes >= 10) {
    data.push({ label: 'Asistentes', value: `${props.formData.numeroAsistentes} personas` })
  }
  return data
})

const servicesData = computed(() => {
  const data = []
  if (props.formData.serviciosCatering.length > 0) {
    const servicios = props.formData.serviciosCatering.map(s => {
      const labels: Record<string, string> = {
        vegetariano: 'Menú vegetariano',
        vegano: 'Menú vegano',
        barraLibre: 'Barra libre',
        infantil: 'Catering infantil',
        cafe: 'Servicio de café'
      }
      return labels[s] || s
    }).join(', ')
    data.push({ label: 'Catering', value: servicios })
  }
  if (props.formData.presupuesto) {
    const presupuestos: Record<string, string> = {
      economico: 'Económico (< 2000€)',
      estandar: 'Estándar (2000€ - 5000€)',
      premium: 'Premium (5000€ - 10000€)',
      luxury: 'Luxury (> 10000€)'
    }
    data.push({ label: 'Presupuesto', value: presupuestos[props.formData.presupuesto] })
  }
  if (props.formData.comentarios.trim()) {
    data.push({ label: 'Comentarios', value: props.formData.comentarios })
  }
  return data
})

const hasValidData = computed(() => {
  return personalData.value.length > 0 || eventData.value.length > 0 || servicesData.value.length > 0
})
</script>