# API de Componentes

Documentación detallada de todos los componentes y sus interfaces.

## ReservaForm.vue

Componente principal que contiene todo el formulario de reserva.

### Props
Ninguna. Es un componente raíz.

### Eventos
Ninguno. Maneja el estado internamente.

### Slots
Ninguno.

### Ejemplo de Uso
```vue
<template>
  <ReservaForm />
</template>

<script setup>
import ReservaForm from '@/components/ReservaForm.vue'
</script>
```

---

## FormInput.vue

Componente reutilizable para inputs de texto con validación.

### Props

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `id` | `string` | ✅ | - | ID único del input |
| `label` | `string` | ✅ | - | Texto del label |
| `type` | `string` | ❌ | `'text'` | Tipo de input HTML |
| `modelValue` | `string` | ✅ | - | Valor del input |
| `required` | `boolean` | ❌ | `false` | Si el campo es obligatorio |
| `hasError` | `boolean` | ❌ | `false` | Si tiene errores |
| `errorMessage` | `string` | ❌ | `''` | Mensaje de error |
| `showValidationIcon` | `boolean` | ❌ | `true` | Mostrar icono de validación |

### Eventos

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `update:modelValue` | `string` | Actualiza el valor |
| `input` | `string` | Se dispara al escribir |
| `blur` | `string` | Se dispara al perder foco |

### Slots
Ninguno.

### Ejemplo de Uso
```vue
<FormInput
  id="nombre"
  label="Nombre Completo"
  v-model="formData.nombre"
  :required="true"
  :has-error="hasError('nombre')"
  :error-message="getError('nombre')"
  @blur="validateField('nombre', $event)"
/>
```

---

## FormCheckbox.vue

Componente para grupos de checkboxes.

### Props

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `groupId` | `string` | ✅ | - | ID del grupo |
| `groupLabel` | `string` | ❌ | - | Label del grupo |
| `options` | `CheckboxOption[]` | ✅ | - | Opciones disponibles |
| `modelValue` | `string[]` | ✅ | - | Valores seleccionados |
| `required` | `boolean` | ❌ | `false` | Si es obligatorio |
| `hasError` | `boolean` | ❌ | `false` | Si tiene errores |
| `errorMessage` | `string` | ❌ | `''` | Mensaje de error |

### Tipos

```typescript
interface CheckboxOption {
  id: string
  label: string
}
```

### Eventos

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `update:modelValue` | `string[]` | Actualiza selección |
| `change` | `string[]` | Cambio en selección |

### Ejemplo de Uso
```vue
<FormCheckbox
  group-id="catering"
  group-label="Servicios de Catering"
  :options="cateringOptions"
  v-model="formData.servicios"
  :required="true"
  @change="validateCatering"
/>
```

---

## FormRadio.vue

Componente para grupos de radio buttons.

### Props

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `groupId` | `string` | ✅ | - | ID del grupo |
| `groupLabel` | `string` | ❌ | - | Label del grupo |
| `options` | `RadioOption[]` | ✅ | - | Opciones disponibles |
| `modelValue` | `string` | ✅ | - | Valor seleccionado |
| `required` | `boolean` | ❌ | `false` | Si es obligatorio |
| `hasError` | `boolean` | ❌ | `false` | Si tiene errores |
| `errorMessage` | `string` | ❌ | `''` | Mensaje de error |

### Tipos

```typescript
interface RadioOption {
  id: string
  label: string
  description?: string
}
```

### Eventos

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `update:modelValue` | `string` | Actualiza selección |
| `change` | `string` | Cambio en selección |

### Ejemplo de Uso
```vue
<FormRadio
  group-id="presupuesto"
  group-label="Rango de Presupuesto"
  :options="presupuestoOptions"
  v-model="formData.presupuesto"
  :required="true"
  @change="validatePresupuesto"
/>
```

---

## ReservationSummary.vue

Componente que muestra un resumen de los datos válidos del formulario.

### Props

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `formData` | `ReservaFormData` | ✅ | - | Datos del formulario |

### Tipos

```typescript
interface ReservaFormData {
  nombreCompleto: string
  nifNie: string
  telefono: string
  email: string
  tipoEvento: string
  fechaEvento: string
  horaInicio: string
  numeroAsistentes: number
  serviciosCatering: string[]
  presupuesto: string
  comentarios: string
  aceptaTerminos: boolean
}
```

### Eventos
Ninguno.

### Slots
Ninguno.

### Ejemplo de Uso
```vue
<ReservationSummary :form-data="formData" />
```

---

## ProgressIndicator.vue

Componente que muestra el progreso de completado del formulario.

### Props

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `formData` | `ReservaFormData` | ✅ | - | Datos del formulario |
| `hasErrors` | `boolean` | ✅ | - | Si hay errores |

### Eventos
Ninguno.

### Slots
Ninguno.

### Computed Properties

- `progressPercentage`: Porcentaje de completado (0-100)
- `completedFields`: Número de campos completados
- `totalFields`: Total de campos en el formulario

### Ejemplo de Uso
```vue
<ProgressIndicator 
  :form-data="formData" 
  :has-errors="errors.length > 0"
/>
```

---

## Composables

### useFormState()

Gestiona el estado del formulario.

#### Retorna

```typescript
interface FormState {
  formData: Ref<ReservaFormData>
  errors: Ref<ValidationError[]>
  showSuccess: Ref<boolean>
  hasError: (field: string) => boolean
  getFieldError: (field: string) => string
  clearFieldError: (field: string) => void
  addError: (field: string, message: string) => void
  isFormValid: ComputedRef<boolean>
  resetForm: () => void
}
```

#### Ejemplo de Uso
```typescript
const {
  formData,
  errors,
  hasError,
  getFieldError,
  isFormValid,
  resetForm
} = useFormState()
```

### useValidation()

Proporciona funciones de validación.

#### Retorna

```typescript
interface Validation {
  validateWithDebounce: (
    field: string,
    value: string | number,
    addError: Function,
    clearError: Function,
    delay?: number
  ) => void
  validateOnBlur: (
    field: string,
    value: string | number | boolean | string[],
    addError: Function,
    clearError: Function
  ) => void
  scrollToFirstError: (errors: ValidationError[]) => void
}
```

#### Ejemplo de Uso
```typescript
const {
  validateWithDebounce,
  validateOnBlur,
  scrollToFirstError
} = useValidation()

// Validar con debounce
validateWithDebounce('email', email, addError, clearError)

// Validar inmediatamente
validateOnBlur('nombre', nombre, addError, clearError)
```

### useLocalStorage()

Maneja la persistencia local.

#### Retorna

```typescript
interface LocalStorage {
  saveDraft: (formData: ReservaFormData) => void
  loadDraft: () => ReservaFormData | null
  clearDraft: () => void
  saveTheme: (theme: string) => void
  loadTheme: () => string
}
```

#### Ejemplo de Uso
```typescript
const { saveDraft, loadDraft, clearDraft } = useLocalStorage()

// Guardar borrador
saveDraft(formData.value)

// Cargar borrador
const draft = loadDraft()
if (draft) {
  Object.assign(formData.value, draft)
}
```

### useTheme()

Gestiona el tema de la aplicación.

#### Retorna

```typescript
interface Theme {
  isDark: Ref<boolean>
  toggleTheme: () => void
  initTheme: () => void
}
```

#### Ejemplo de Uso
```typescript
const { isDark, toggleTheme } = useTheme()

// En template
<button @click="toggleTheme">
  {{ isDark ? '☀️' : '🌙' }}
</button>
```

---

## Patrones de Uso Comunes

### Validación de Campo Personalizada

```typescript
// En el componente padre
const handleCustomValidation = (field: string, value: string) => {
  // Lógica personalizada
  if (customCondition) {
    addError(field, 'Mensaje personalizado')
  } else {
    clearFieldError(field)
  }
}
```

### Extensión de Opciones

```typescript
// Agregar nuevas opciones dinámicamente
const dynamicOptions = computed(() => [
  ...staticOptions,
  ...conditionalOptions.value
])
```

### Validación Condicional

```typescript
// Validar solo si se cumple condición
const conditionalValidation = (field: string, value: string) => {
  if (shouldValidate.value) {
    validateOnBlur(field, value, addError, clearError)
  }
}
```