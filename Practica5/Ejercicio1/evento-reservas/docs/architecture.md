# Arquitectura del Sistema

El proyecto sigue una arquitectura modular basada en Vue 3 Composition API con TypeScript.

## Principios de Diseño

### 1. Separación de Responsabilidades
- **Componentes**: Solo presentación y eventos de UI
- **Composables**: Lógica de negocio reutilizable
- **Utils**: Funciones puras y utilidades
- **Types**: Definiciones de tipos TypeScript

### 2. Composición sobre Herencia
- Uso de Composition API para lógica reutilizable
- Composables especializados para diferentes aspectos
- Componentes pequeños y enfocados

### 3. Tipado Estricto
- TypeScript sin `any`
- Interfaces bien definidas
- Validación de tipos en tiempo de compilación

## Estructura de Componentes

```
src/components/
├── ReservaForm.vue          # Componente principal
├── FormInput.vue            # Input reutilizable
├── FormCheckbox.vue         # Checkbox group reutilizable
├── FormRadio.vue            # Radio group reutilizable
├── ReservationSummary.vue   # Resumen de datos
└── ProgressIndicator.vue    # Indicador de progreso
```

### Jerarquía de Componentes

```
App.vue
└── ReservaForm.vue
    ├── ProgressIndicator.vue
    ├── FormInput.vue (múltiples instancias)
    ├── FormCheckbox.vue
    ├── FormRadio.vue
    └── ReservationSummary.vue
```

## Composables

### useFormState.ts
**Responsabilidad**: Gestión del estado del formulario

```typescript
interface FormState {
  formData: Ref<ReservaFormData>
  errors: Ref<ValidationError[]>
  showSuccess: Ref<boolean>
  isFormValid: ComputedRef<boolean>
}
```

**Funciones principales**:
- `hasError(field: string): boolean`
- `getFieldError(field: string): string`
- `clearFieldError(field: string): void`
- `addError(field: string, message: string): void`
- `resetForm(): void`

### useValidation.ts
**Responsabilidad**: Lógica de validación

```typescript
interface Validation {
  validateWithDebounce: Function
  validateOnBlur: Function
  scrollToFirstError: Function
}
```

**Características**:
- Debounce de 500ms para validación en tiempo real
- Validación inmediata en blur
- Scroll automático al primer error

### useLocalStorage.ts
**Responsabilidad**: Persistencia local y tema

```typescript
interface LocalStorage {
  saveDraft: (data: ReservaFormData) => void
  loadDraft: () => ReservaFormData | null
  clearDraft: () => void
  saveTheme: (theme: string) => void
  loadTheme: () => string
}
```

**Características**:
- Guardado automático de borradores
- Persistencia de preferencias de tema
- Manejo de errores de localStorage

## Flujo de Datos

### 1. Inicialización
```
App.vue → ReservaForm.vue → useFormState() → loadDraft()
```

### 2. Interacción del Usuario
```
User Input → FormInput.vue → emit('input') → ReservaForm.vue → useValidation()
```

### 3. Validación
```
useValidation() → validateField() → addError() / clearFieldError()
```

### 4. Persistencia
```
formData change → watch() → saveDraft() → localStorage
```

### 5. Envío
```
handleSubmit() → validateAllFields() → clearDraft() → showSuccess
```

## Gestión del Estado

### Estado Local (Componente)
- Datos del formulario
- Errores de validación
- Estado de éxito
- Tema actual

### Estado Persistente (localStorage)
- Borrador del formulario
- Preferencias de tema

### Estado Computado
- Validez del formulario
- Progreso de completado
- Datos para el resumen

## Validación

### Arquitectura de Validación

```
Input Event → Debounce → Regex Validation → Error Management → UI Update
```

### Tipos de Validación

1. **Sintáctica**: Expresiones regulares
2. **Semántica**: Lógica de negocio (fechas, rangos)
3. **Contextual**: Dependencias entre campos

### Flujo de Validación

```typescript
// 1. Validación con debounce (escritura)
validateWithDebounce(field, value, addError, clearError, 500ms)

// 2. Validación inmediata (blur)
validateOnBlur(field, value, addError, clearError)

// 3. Validación completa (submit)
validateAllFields() → scrollToFirstError()
```

## Comunicación Entre Componentes

### Props Down, Events Up
```typescript
// Parent → Child (Props)
<FormInput 
  :model-value="formData.nombre"
  :has-error="hasError('nombre')"
  :error-message="getFieldError('nombre')"
/>

// Child → Parent (Events)
emit('update:modelValue', value)
emit('blur', value)
```

### Composables Compartidos
```typescript
// Múltiples componentes usan el mismo estado
const { formData, errors } = useFormState()
```

## Manejo de Errores

### Niveles de Error

1. **Validación**: Errores de entrada del usuario
2. **Sistema**: Errores de localStorage, etc.
3. **Red**: Errores de envío (futuro)

### Estrategia de Recuperación

```typescript
try {
  localStorage.setItem(key, value)
} catch (error) {
  console.warn('No se pudo guardar:', error)
  // Continuar sin persistencia
}
```

## Accesibilidad

### Estructura Semántica
- `<form>` con `novalidate`
- `<fieldset>` y `<legend>` para agrupación
- `<label>` asociados con `for`

### ARIA
- `aria-describedby` para errores
- `role="alert"` para mensajes
- `aria-label` para controles sin label visible

### Navegación
- Orden lógico de tabulación
- Focus visible
- Soporte para lectores de pantalla

## Rendimiento

### Optimizaciones Implementadas

1. **Debounce**: Evita validaciones excesivas
2. **Computed Properties**: Cache automático
3. **v-show vs v-if**: Según necesidad
4. **Lazy Loading**: Componentes bajo demanda

### Métricas Objetivo

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: < 200KB gzipped

## Testing

### Estrategia de Testing

```
Unit Tests (60%) → Integration Tests (30%) → E2E Tests (10%)
```

### Cobertura por Capa

- **Utils**: 100% (funciones puras)
- **Composables**: 90% (lógica de negocio)
- **Components**: 80% (interacciones críticas)

## Escalabilidad

### Preparado para Crecer

1. **Modularidad**: Fácil agregar nuevos campos
2. **Composables**: Lógica reutilizable
3. **TypeScript**: Refactoring seguro
4. **Testing**: Confianza en cambios

### Extensiones Futuras

- Múltiples idiomas (i18n)
- Validación del servidor
- Guardado en la nube
- Formularios dinámicos