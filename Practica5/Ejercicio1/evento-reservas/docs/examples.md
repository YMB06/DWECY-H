# Ejemplos de Uso

Ejemplos prácticos de cómo usar y extender los componentes del formulario.

## Uso Básico

### Formulario Completo

```vue
<template>
  <div class="app">
    <ReservaForm />
  </div>
</template>

<script setup lang="ts">
import ReservaForm from '@/components/ReservaForm.vue'
</script>

<style>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
```

## Componentes Individuales

### FormInput - Input de Texto

```vue
<template>
  <div>
    <FormInput
      id="nombre"
      label="Nombre Completo"
      v-model="nombre"
      :required="true"
      :has-error="hasError"
      :error-message="errorMessage"
      @input="handleInput"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormInput from '@/components/FormInput.vue'

const nombre = ref('')
const hasError = ref(false)
const errorMessage = ref('')

const handleInput = (value: string) => {
  // Limpiar error al escribir
  hasError.value = false
  errorMessage.value = ''
}

const handleBlur = (value: string) => {
  // Validar al perder foco
  if (value.length < 3) {
    hasError.value = true
    errorMessage.value = 'El nombre debe tener al menos 3 caracteres'
  }
}
</script>
```

### FormCheckbox - Grupo de Checkboxes

```vue
<template>
  <div>
    <FormCheckbox
      group-id="servicios"
      group-label="Servicios Adicionales"
      :options="serviciosOptions"
      v-model="serviciosSeleccionados"
      :required="true"
      :has-error="hasError"
      :error-message="errorMessage"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormCheckbox from '@/components/FormCheckbox.vue'

const serviciosSeleccionados = ref<string[]>([])
const hasError = ref(false)
const errorMessage = ref('')

const serviciosOptions = [
  { id: 'catering', label: 'Servicio de Catering' },
  { id: 'decoracion', label: 'Decoración' },
  { id: 'fotografia', label: 'Fotografía' },
  { id: 'musica', label: 'Música y Sonido' }
]

const handleChange = (selected: string[]) => {
  if (selected.length === 0) {
    hasError.value = true
    errorMessage.value = 'Debe seleccionar al menos un servicio'
  } else {
    hasError.value = false
    errorMessage.value = ''
  }
}
</script>
```

### FormRadio - Grupo de Radio Buttons

```vue
<template>
  <div>
    <FormRadio
      group-id="presupuesto"
      group-label="Rango de Presupuesto"
      :options="presupuestoOptions"
      v-model="presupuestoSeleccionado"
      :required="true"
      :has-error="hasError"
      :error-message="errorMessage"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormRadio from '@/components/FormRadio.vue'

const presupuestoSeleccionado = ref('')
const hasError = ref(false)
const errorMessage = ref('')

const presupuestoOptions = [
  { id: 'bajo', label: 'Económico', description: 'Hasta 1000€' },
  { id: 'medio', label: 'Estándar', description: '1000€ - 3000€' },
  { id: 'alto', label: 'Premium', description: 'Más de 3000€' }
]

const handleChange = (value: string) => {
  if (!value) {
    hasError.value = true
    errorMessage.value = 'Debe seleccionar un rango de presupuesto'
  } else {
    hasError.value = false
    errorMessage.value = ''
  }
}
</script>
```

## Uso de Composables

### useFormState - Gestión de Estado

```vue
<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <FormInput
        id="email"
        label="Email"
        v-model="formData.email"
        :has-error="hasError('email')"
        :error-message="getFieldError('email')"
        @blur="validateEmail"
      />
      
      <button type="submit" :disabled="!isFormValid">
        Enviar
      </button>
    </form>
    
    <div v-if="showSuccess" class="success">
      ¡Formulario enviado correctamente!
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormState } from '@/composables/useFormState'
import { validateField } from '@/utils/validation'
import FormInput from '@/components/FormInput.vue'

const {
  formData,
  hasError,
  getFieldError,
  addError,
  clearFieldError,
  isFormValid,
  showSuccess,
  resetForm
} = useFormState()

const validateEmail = () => {
  const result = validateField('email', formData.value.email)
  if (!result.isValid) {
    addError('email', result.errors[0].message)
  } else {
    clearFieldError('email')
  }
}

const handleSubmit = () => {
  if (isFormValid.value) {
    console.log('Enviando:', formData.value)
    showSuccess.value = true
    setTimeout(() => {
      resetForm()
    }, 2000)
  }
}
</script>
```

### useValidation - Validación con Debounce

```vue
<template>
  <div>
    <FormInput
      id="telefono"
      label="Teléfono"
      v-model="telefono"
      :has-error="hasError('telefono')"
      :error-message="getFieldError('telefono')"
      @input="handleInput"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useValidation } from '@/composables/useValidation'
import FormInput from '@/components/FormInput.vue'

const telefono = ref('')
const errors = ref<ValidationError[]>([])

const { validateWithDebounce, validateOnBlur } = useValidation()

const hasError = (field: string) => 
  errors.value.some(error => error.field === field)

const getFieldError = (field: string) => 
  errors.value.find(error => error.field === field)?.message || ''

const addError = (field: string, message: string) => {
  clearFieldError(field)
  errors.value.push({ field, message })
}

const clearFieldError = (field: string) => {
  errors.value = errors.value.filter(error => error.field !== field)
}

const handleInput = (value: string) => {
  validateWithDebounce('telefono', value, addError, clearFieldError)
}

const handleBlur = (value: string) => {
  validateOnBlur('telefono', value, addError, clearFieldError)
}
</script>
```

### useLocalStorage - Persistencia

```vue
<template>
  <div>
    <form>
      <FormInput
        id="nombre"
        label="Nombre"
        v-model="formData.nombre"
      />
      
      <button type="button" @click="guardarBorrador">
        Guardar Borrador
      </button>
      
      <button type="button" @click="cargarBorrador">
        Cargar Borrador
      </button>
      
      <button type="button" @click="limpiarBorrador">
        Limpiar Borrador
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import FormInput from '@/components/FormInput.vue'

const formData = ref({
  nombre: '',
  email: '',
  telefono: ''
})

const { saveDraft, loadDraft, clearDraft } = useLocalStorage()

// Guardar automáticamente cada cambio
watch(formData, (newData) => {
  saveDraft(newData)
}, { deep: true })

const guardarBorrador = () => {
  saveDraft(formData.value)
  alert('Borrador guardado')
}

const cargarBorrador = () => {
  const draft = loadDraft()
  if (draft) {
    Object.assign(formData.value, draft)
    alert('Borrador cargado')
  } else {
    alert('No hay borrador guardado')
  }
}

const limpiarBorrador = () => {
  clearDraft()
  formData.value = { nombre: '', email: '', telefono: '' }
  alert('Borrador eliminado')
}
</script>
```

## Validaciones Personalizadas

### Validación Condicional

```vue
<template>
  <div>
    <FormInput
      id="edad"
      label="Edad"
      type="number"
      v-model="edad"
      :has-error="hasError('edad')"
      :error-message="getFieldError('edad')"
      @blur="validateEdad"
    />
    
    <FormInput
      v-if="esMenorDeEdad"
      id="tutorLegal"
      label="Tutor Legal"
      v-model="tutorLegal"
      :required="true"
      :has-error="hasError('tutorLegal')"
      :error-message="getFieldError('tutorLegal')"
      @blur="validateTutorLegal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FormInput from '@/components/FormInput.vue'

const edad = ref('')
const tutorLegal = ref('')
const errors = ref<ValidationError[]>([])

const esMenorDeEdad = computed(() => {
  const edadNum = parseInt(edad.value)
  return edadNum > 0 && edadNum < 18
})

const validateEdad = () => {
  const edadNum = parseInt(edad.value)
  
  if (isNaN(edadNum) || edadNum < 1 || edadNum > 120) {
    addError('edad', 'La edad debe estar entre 1 y 120 años')
  } else {
    clearFieldError('edad')
    
    // Si ya no es menor de edad, limpiar tutor legal
    if (!esMenorDeEdad.value) {
      tutorLegal.value = ''
      clearFieldError('tutorLegal')
    }
  }
}

const validateTutorLegal = () => {
  if (esMenorDeEdad.value && !tutorLegal.value.trim()) {
    addError('tutorLegal', 'El tutor legal es obligatorio para menores de edad')
  } else {
    clearFieldError('tutorLegal')
  }
}
</script>
```

### Validación Asíncrona

```vue
<template>
  <div>
    <FormInput
      id="username"
      label="Nombre de Usuario"
      v-model="username"
      :has-error="hasError('username')"
      :error-message="getFieldError('username')"
      @blur="validateUsername"
    />
    
    <div v-if="isValidating" class="loading">
      Verificando disponibilidad...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormInput from '@/components/FormInput.vue'

const username = ref('')
const isValidating = ref(false)
const errors = ref<ValidationError[]>([])

const checkUsernameAvailability = async (username: string): Promise<boolean> => {
  // Simular llamada a API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simular que algunos nombres no están disponibles
      const unavailable = ['admin', 'user', 'test']
      resolve(!unavailable.includes(username.toLowerCase()))
    }, 1000)
  })
}

const validateUsername = async () => {
  if (!username.value.trim()) {
    addError('username', 'El nombre de usuario es obligatorio')
    return
  }
  
  if (username.value.length < 3) {
    addError('username', 'El nombre de usuario debe tener al menos 3 caracteres')
    return
  }
  
  isValidating.value = true
  clearFieldError('username')
  
  try {
    const isAvailable = await checkUsernameAvailability(username.value)
    
    if (!isAvailable) {
      addError('username', 'Este nombre de usuario no está disponible')
    }
  } catch (error) {
    addError('username', 'Error al verificar disponibilidad')
  } finally {
    isValidating.value = false
  }
}
</script>
```

## Temas y Personalización

### Tema Personalizado

```vue
<template>
  <div class="custom-theme">
    <div class="theme-controls">
      <button @click="setTheme('light')">Claro</button>
      <button @click="setTheme('dark')">Oscuro</button>
      <button @click="setTheme('custom')">Personalizado</button>
    </div>
    
    <ReservaForm />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ReservaForm from '@/components/ReservaForm.vue'

const setTheme = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'light'
  setTheme(savedTheme)
})
</script>

<style>
[data-theme="custom"] {
  --primary-color: #8b5cf6;
  --primary-hover: #7c3aed;
  --success-color: #10b981;
  --error-color: #f59e0b;
  --bg-color: #fef3c7;
  --white: #fffbeb;
}

.theme-controls {
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
}

.theme-controls button {
  padding: 0.5rem 1rem;
  border: 2px solid var(--primary-color);
  background: var(--white);
  color: var(--primary-color);
  border-radius: 4px;
  cursor: pointer;
}

.theme-controls button:hover {
  background: var(--primary-color);
  color: var(--white);
}
</style>
```

## Extensiones Avanzadas

### Formulario Multi-paso

```vue
<template>
  <div class="multi-step-form">
    <div class="steps-indicator">
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        :class="{ active: currentStep === index, completed: index < currentStep }"
        class="step"
      >
        {{ step.title }}
      </div>
    </div>
    
    <component 
      :is="currentStepComponent" 
      v-model="formData"
      @next="nextStep"
      @prev="prevStep"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Step1Personal from './steps/Step1Personal.vue'
import Step2Event from './steps/Step2Event.vue'
import Step3Services from './steps/Step3Services.vue'

const currentStep = ref(0)
const formData = ref({})

const steps = [
  { title: 'Datos Personales', component: Step1Personal },
  { title: 'Detalles del Evento', component: Step2Event },
  { title: 'Servicios', component: Step3Services }
]

const currentStepComponent = computed(() => {
  return steps[currentStep.value].component
})

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>

<style>
.steps-indicator {
  display: flex;
  margin-bottom: 2rem;
}

.step {
  flex: 1;
  padding: 1rem;
  text-align: center;
  border-bottom: 3px solid #e5e7eb;
  color: #6b7280;
}

.step.active {
  border-bottom-color: var(--primary-color);
  color: var(--primary-color);
  font-weight: 600;
}

.step.completed {
  border-bottom-color: var(--success-color);
  color: var(--success-color);
}
</style>
```

### Validación en Tiempo Real con Indicadores Visuales

```vue
<template>
  <div class="enhanced-form">
    <div class="form-progress">
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          :style="{ width: `${completionPercentage}%` }"
        ></div>
      </div>
      <span>{{ completionPercentage }}% completado</span>
    </div>
    
    <FormInput
      v-for="field in fields"
      :key="field.id"
      :id="field.id"
      :label="field.label"
      :type="field.type"
      v-model="formData[field.id]"
      :has-error="hasError(field.id)"
      :error-message="getFieldError(field.id)"
      @input="handleInput(field.id, $event)"
    >
      <template #suffix>
        <div class="field-status">
          <span v-if="isFieldValid(field.id)" class="valid">✓</span>
          <span v-else-if="hasError(field.id)" class="invalid">✗</span>
          <span v-else class="pending">○</span>
        </div>
      </template>
    </FormInput>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useValidation } from '@/composables/useValidation'
import FormInput from '@/components/FormInput.vue'

const formData = ref({})
const errors = ref([])

const fields = [
  { id: 'nombre', label: 'Nombre', type: 'text' },
  { id: 'email', label: 'Email', type: 'email' },
  { id: 'telefono', label: 'Teléfono', type: 'tel' }
]

const { validateWithDebounce } = useValidation()

const completionPercentage = computed(() => {
  const validFields = fields.filter(field => isFieldValid(field.id)).length
  return Math.round((validFields / fields.length) * 100)
})

const isFieldValid = (fieldId: string) => {
  return formData.value[fieldId] && 
         formData.value[fieldId].trim() !== '' && 
         !hasError(fieldId)
}

const handleInput = (fieldId: string, value: string) => {
  validateWithDebounce(fieldId, value, addError, clearFieldError)
}
</script>

<style>
.form-progress {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.field-status {
  margin-left: 0.5rem;
}

.valid { color: var(--success-color); }
.invalid { color: var(--error-color); }
.pending { color: #6b7280; }
</style>
```

Estos ejemplos muestran cómo usar y extender los componentes del formulario para crear experiencias de usuario ricas y personalizadas.