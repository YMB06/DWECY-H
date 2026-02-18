<template>
  <div class="reserva-form">
    <div class="form-header">
      <h1>Formulario de Reserva de Eventos</h1>
      <button @click="toggleTheme" class="theme-toggle" :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'">
        {{ isDark ? '☀️' : '🌙' }}
      </button>
    </div>
    
    <ProgressIndicator 
      :form-data="formData" 
      :has-errors="errors.length > 0"
    />
    
    <form @submit.prevent="handleSubmit" novalidate>
      <!-- Datos Personales -->
      <fieldset>
        <legend>Datos Personales</legend>
        
        <FormInput
          id="nombreCompleto"
          v-model="formData.nombreCompleto"
          label="Nombre Completo"
          :required="true"
          :has-error="hasError('nombreCompleto')"
          :error-message="getFieldError('nombreCompleto')"
          @input="handleInputWithDebounce('nombreCompleto', $event)"
          @blur="handleBlur('nombreCompleto', $event)"
        />

        <FormInput
          id="nifNie"
          v-model="formData.nifNie"
          label="NIF/NIE"
          :required="true"
          :has-error="hasError('nifNie')"
          :error-message="getFieldError('nifNie')"
          @input="handleInputWithDebounce('nifNie', $event)"
          @blur="handleBlur('nifNie', $event)"
        />

        <FormInput
          id="telefono"
          v-model="formData.telefono"
          label="Teléfono Móvil"
          type="tel"
          :required="true"
          :has-error="hasError('telefono')"
          :error-message="getFieldError('telefono')"
          @input="handleInputWithDebounce('telefono', $event)"
          @blur="handleBlur('telefono', $event)"
        />

        <FormInput
          id="email"
          v-model="formData.email"
          label="Email"
          type="email"
          :required="true"
          :has-error="hasError('email')"
          :error-message="getFieldError('email')"
          @input="handleInputWithDebounce('email', $event)"
          @blur="handleBlur('email', $event)"
        />
      </fieldset>

      <!-- Detalles del Evento -->
      <fieldset>
        <legend>Detalles del Evento</legend>
        
        <div class="form-group">
          <label for="tipoEvento">Tipo de Evento *</label>
          <div class="input-wrapper">
            <select
              id="tipoEvento"
              v-model="formData.tipoEvento"
              :class="{ error: hasError('tipoEvento'), valid: isFieldValid('tipoEvento') }"
              @change="handleSelectChange('tipoEvento', $event)"
              aria-describedby="tipoEvento-error"
              required
            >
              <option value="">Seleccione un tipo</option>
              <option value="Boda">Boda</option>
              <option value="Cumpleaños">Cumpleaños</option>
              <option value="Corporativo">Corporativo</option>
              <option value="Conferencia">Conferencia</option>
              <option value="Otro">Otro</option>
            </select>
            <span v-if="showValidationIcon('tipoEvento')" class="validation-icon">
              {{ isFieldValid('tipoEvento') ? '✓' : '✗' }}
            </span>
          </div>
          <div v-if="hasError('tipoEvento')" id="tipoEvento-error" class="error-message" role="alert">
            {{ getFieldError('tipoEvento') }}
          </div>
        </div>

        <FormInput
          id="fechaEvento"
          v-model="formData.fechaEvento"
          label="Fecha del Evento"
          type="date"
          :required="true"
          :has-error="hasError('fechaEvento')"
          :error-message="getFieldError('fechaEvento')"
          :min="minDate"
          :max="maxDate"
          @input="handleInputWithDebounce('fechaEvento', $event)"
          @blur="handleBlur('fechaEvento', $event)"
        />

        <FormInput
          id="horaInicio"
          v-model="formData.horaInicio"
          label="Hora de Inicio"
          type="time"
          :required="true"
          :has-error="hasError('horaInicio')"
          :error-message="getFieldError('horaInicio')"
          min="08:00"
          max="23:00"
          @input="handleInputWithDebounce('horaInicio', $event)"
          @blur="handleBlur('horaInicio', $event)"
        />

        <div class="form-group">
          <label for="numeroAsistentes">Número de Asistentes *</label>
          <div class="number-inputs">
            <input
              id="numeroAsistentes"
              v-model.number="formData.numeroAsistentes"
              type="number"
              min="10"
              max="500"
              :class="{ error: hasError('numeroAsistentes'), valid: isFieldValid('numeroAsistentes') }"
              @blur="handleNumberBlur"
              @input="handleNumberInput"
              aria-describedby="numeroAsistentes-error"
              required
            />
            <input
              id="numeroAsistentesRange"
              v-model.number="formData.numeroAsistentes"
              type="range"
              min="10"
              max="500"
              @input="handleRangeInput"
              aria-label="Selector de número de asistentes"
            />
            <span class="range-value">{{ formData.numeroAsistentes }}</span>
            <span v-if="showValidationIcon('numeroAsistentes')" class="validation-icon">
              {{ isFieldValid('numeroAsistentes') ? '✓' : '✗' }}
            </span>
          </div>
          <div v-if="hasError('numeroAsistentes')" id="numeroAsistentes-error" class="error-message" role="alert">
            {{ getFieldError('numeroAsistentes') }}
          </div>
        </div>
      </fieldset>

      <!-- Servicios Adicionales -->
      <fieldset>
        <legend>Servicios Adicionales</legend>
        
        <FormCheckbox
          group-id="serviciosCatering"
          group-label="Opciones de Catering"
          :options="cateringOptions"
          v-model="formData.serviciosCatering"
          :required="true"
          :has-error="hasError('serviciosCatering')"
          :error-message="getFieldError('serviciosCatering')"
          @change="handleCateringChange"
        />

        <FormRadio
          group-id="presupuesto"
          group-label="Presupuesto Aproximado"
          :options="presupuestoOptions"
          v-model="formData.presupuesto"
          :required="true"
          :has-error="hasError('presupuesto')"
          :error-message="getFieldError('presupuesto')"
          @change="handlePresupuestoChange"
        />

        <div class="form-group">
          <label for="comentarios">Comentarios Adicionales</label>
          <div class="textarea-wrapper">
            <textarea
              id="comentarios"
              v-model="formData.comentarios"
              :class="{ error: hasError('comentarios'), valid: isFieldValid('comentarios') }"
              maxlength="500"
              rows="4"
              placeholder="Escriba aquí cualquier comentario adicional..."
              @input="handleTextareaInput"
              @blur="handleTextareaBlur"
              aria-describedby="comentarios-error comentarios-count"
            ></textarea>
            <span v-if="showValidationIcon('comentarios')" class="validation-icon">
              {{ isFieldValid('comentarios') ? '✓' : '✗' }}
            </span>
          </div>
          <div id="comentarios-count" class="character-count">
            {{ comentariosLength }}/500 caracteres
          </div>
          <div v-if="hasError('comentarios')" id="comentarios-error" class="error-message" role="alert">
            {{ getFieldError('comentarios') }}
          </div>
        </div>

        <div class="form-group">
          <div class="checkbox-item terms">
            <input
              id="aceptaTerminos"
              v-model="formData.aceptaTerminos"
              type="checkbox"
              :class="{ error: hasError('aceptaTerminos') }"
              @change="handleTermsChange"
              aria-describedby="aceptaTerminos-error"
              required
            />
            <label for="aceptaTerminos">
              Acepto los términos y condiciones *
            </label>
          </div>
          <div v-if="hasError('aceptaTerminos')" id="aceptaTerminos-error" class="error-message" role="alert">
            {{ getFieldError('aceptaTerminos') }}
          </div>
        </div>
      </fieldset>

      <div class="form-actions">
        <button type="submit" :disabled="!isFormValid" class="submit-btn">
          Enviar Reserva
        </button>
        <button type="button" @click="handleReset" class="reset-btn">
          Limpiar Formulario
        </button>
      </div>
    </form>

    <ReservationSummary :form-data="formData" />

    <!-- Mensaje de éxito -->
    <div v-if="showSuccess" class="success-message" role="alert">
      ¡Reserva enviada correctamente!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { CateringOption, PresupuestoOption } from '@/types/reservation'
import { useFormState } from '@/composables/useFormState'
import { useValidation } from '@/composables/useValidation'
import { useLocalStorage, useTheme } from '@/composables/useLocalStorage'
import FormInput from './FormInput.vue'
import FormCheckbox from './FormCheckbox.vue'
import FormRadio from './FormRadio.vue'
import ReservationSummary from './ReservationSummary.vue'
import ProgressIndicator from './ProgressIndicator.vue'

// Composables
const {
  formData,
  errors,
  showSuccess,
  hasError,
  getFieldError,
  clearFieldError,
  addError,
  isFormValid,
  resetForm
} = useFormState()

const {
  validateWithDebounce,
  validateOnBlur,
  scrollToFirstError
} = useValidation()

const { saveDraft, loadDraft, clearDraft } = useLocalStorage()
const { isDark, toggleTheme } = useTheme()

// Opciones de catering
const cateringOptions: CateringOption[] = [
  { id: 'vegetariano', label: 'Menú vegetariano' },
  { id: 'vegano', label: 'Menú vegano' },
  { id: 'barraLibre', label: 'Barra libre' },
  { id: 'infantil', label: 'Catering infantil' },
  { id: 'cafe', label: 'Servicio de café' }
]

// Opciones de presupuesto
const presupuestoOptions: PresupuestoOption[] = [
  { id: 'economico', label: 'Económico', description: '< 2000€' },
  { id: 'estandar', label: 'Estándar', description: '2000€ - 5000€' },
  { id: 'premium', label: 'Premium', description: '5000€ - 10000€' },
  { id: 'luxury', label: 'Luxury', description: '> 10000€' }
]

// Fechas límite
const minDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date.toISOString().split('T')[0]
})

const maxDate = computed(() => {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 1)
  return date.toISOString().split('T')[0]
})

// Validación visual
const isFieldValid = (field: string): boolean => {
  if (hasError(field)) return false
  
  const value = formData.value[field as keyof typeof formData.value]
  
  if (field === 'serviciosCatering') {
    return (value as string[]).length > 0
  }
  if (field === 'numeroAsistentes') {
    return value >= 10 && value <= 500
  }
  if (field === 'comentarios') {
    return (value as string).length <= 500
  }
  if (field === 'aceptaTerminos') {
    return value as boolean
  }
  
  return typeof value === 'string' ? value.trim() !== '' : Boolean(value)
}

const showValidationIcon = (field: string): boolean => {
  const value = formData.value[field as keyof typeof formData.value]
  if (typeof value === 'string') {
    return value.trim() !== ''
  }
  if (Array.isArray(value)) {
    return value.length > 0
  }
  return Boolean(value)
}

const comentariosLength = computed(() => {
  return formData.value.comentarios.trim().length
})

// Manejadores de eventos
const handleInputWithDebounce = (field: string, value: string): void => {
  validateWithDebounce(field, value, addError, clearFieldError)
}

const handleBlur = (field: string, value: string): void => {
  validateOnBlur(field, value, addError, clearFieldError)
}

const handleSelectChange = (field: string, event: Event): void => {
  const target = event.target as HTMLSelectElement
  validateOnBlur(field, target.value, addError, clearFieldError)
}

const handleNumberInput = (): void => {
  clearFieldError('numeroAsistentes')
  validateWithDebounce('numeroAsistentes', formData.value.numeroAsistentes, addError, clearFieldError)
}

const handleNumberBlur = (): void => {
  validateOnBlur('numeroAsistentes', formData.value.numeroAsistentes, addError, clearFieldError)
}

const handleRangeInput = (): void => {
  clearFieldError('numeroAsistentes')
}

const handleCateringChange = (services: string[]): void => {
  validateOnBlur('serviciosCatering', services, addError, clearFieldError)
}

const handlePresupuestoChange = (value: string): void => {
  validateOnBlur('presupuesto', value, addError, clearFieldError)
}

const handleTextareaInput = (): void => {
  validateWithDebounce('comentarios', formData.value.comentarios, addError, clearFieldError)
}

const handleTextareaBlur = (): void => {
  validateOnBlur('comentarios', formData.value.comentarios, addError, clearFieldError)
}

const handleTermsChange = (): void => {
  validateOnBlur('aceptaTerminos', formData.value.aceptaTerminos, addError, clearFieldError)
}

const validateAllFields = (): boolean => {
  const fields = [
    'nombreCompleto', 'nifNie', 'telefono', 'email', 'tipoEvento',
    'fechaEvento', 'horaInicio', 'numeroAsistentes', 'serviciosCatering',
    'presupuesto', 'comentarios', 'aceptaTerminos'
  ]
  
  fields.forEach(field => {
    const value = formData.value[field as keyof typeof formData.value]
    validateOnBlur(field, value, addError, clearFieldError)
  })
  
  return errors.value.length === 0
}

const handleSubmit = (): void => {
  if (validateAllFields()) {
    console.log('Datos de reserva:', formData.value)
    clearDraft()
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  } else {
    scrollToFirstError(errors.value)
  }
}

const handleReset = (): void => {
  resetForm()
  clearDraft()
}

// Persistencia automática
watch(formData, (newData) => {
  saveDraft(newData)
}, { deep: true })

onMounted(() => {
  // Establecer fecha mínima por defecto
  if (!formData.value.fechaEvento) {
    formData.value.fechaEvento = minDate.value
  }
  
  // Cargar borrador si existe
  const draft = loadDraft()
  if (draft) {
    Object.assign(formData.value, draft)
  }
})

// Expose properties for testing
defineExpose({
  formData,
  isFormValid,
  errors,
  showSuccess
})
</script>