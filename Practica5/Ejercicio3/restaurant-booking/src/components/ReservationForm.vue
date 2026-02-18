<template>
  <div v-if="selectedTable" class="reservation-form">
    <h2>Reservar {{ selectedTable.label }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Nombre completo *</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          :aria-invalid="!!errors.name"
          :aria-describedby="errors.name ? 'name-error' : undefined"
        />
        <span v-if="errors.name" id="name-error" class="error">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email *</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          :aria-invalid="!!errors.email"
          :aria-describedby="errors.email ? 'email-error' : undefined"
        />
        <span v-if="errors.email" id="email-error" class="error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="people">Número de comensales *</label>
        <input
          id="people"
          v-model.number="formData.people"
          type="number"
          min="1"
          :max="selectedTable.capacity"
          required
          :aria-invalid="!!errors.people"
          :aria-describedby="errors.people ? 'people-error' : undefined"
        />
        <span v-if="errors.people" id="people-error" class="error">{{ errors.people }}</span>
        <small>Capacidad máxima: {{ selectedTable.capacity }} personas</small>
      </div>

      <button type="submit" class="submit-btn">Confirmar Reserva</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRestaurantStore } from '@/stores/restaurant'

const store = useRestaurantStore()
const { selectedTable, activeTimeSlot } = storeToRefs(store)

const formData = reactive({
  name: '',
  email: '',
  people: 1
})

const errors = reactive({
  name: '',
  email: '',
  people: ''
})

const emit = defineEmits<{
  submit: [success: boolean]
}>()

watch(selectedTable, () => {
  formData.name = ''
  formData.email = ''
  formData.people = 1
  errors.name = ''
  errors.email = ''
  errors.people = ''
})

const validate = (): boolean => {
  errors.name = ''
  errors.email = ''
  errors.people = ''

  if (!formData.name.trim()) {
    errors.name = 'El nombre es obligatorio'
    return false
  }

  if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Email inválido'
    return false
  }

  if (!selectedTable.value) return false

  if (formData.people < 1 || formData.people > selectedTable.value.capacity) {
    errors.people = `Debe ser entre 1 y ${selectedTable.value.capacity}`
    return false
  }

  return true
}

const handleSubmit = () => {
  if (!validate() || !selectedTable.value) return

  const success = store.addReservation({
    tableId: selectedTable.value.id,
    timeSlot: activeTimeSlot.value,
    customerName: formData.name,
    customerEmail: formData.email,
    peopleCount: formData.people
  })

  if (success) {
    store.selectTable(null)
    emit('submit', true)
  } else {
    emit('submit', false)
  }
}
</script>

<style scoped>
.reservation-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

input[aria-invalid="true"] {
  border-color: #dc3545;
}

.error {
  display: block;
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

small {
  display: block;
  color: #6c757d;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #359268;
}

.submit-btn:focus {
  outline: 3px solid #42b983;
  outline-offset: 2px;
}
</style>
