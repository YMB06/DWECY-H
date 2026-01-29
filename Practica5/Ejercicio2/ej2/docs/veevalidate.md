# Integración de VeeValidate

## ¿Por qué VeeValidate?

### Ventajas de VeeValidate v4

1. **Composición API nativa** - Perfecta integración con Vue 3
2. **TypeScript first** - Tipado completo y autocompletado
3. **Validación declarativa** - Esquemas Yup/Zod integrados
4. **Rendimiento optimizado** - Validación lazy y reactiva
5. **Flexibilidad** - Validación síncrona y asíncrona
6. **Ecosistema maduro** - Amplia comunidad y documentación

### Comparación con Alternativas

| Característica | VeeValidate | Formik | React Hook Form |
|----------------|-------------|--------|-----------------|
| Framework | Vue 3 | React | React |
| TypeScript | ✅ Nativo | ✅ Bueno | ✅ Excelente |
| Validación Async | ✅ Completa | ✅ Básica | ✅ Completa |
| Esquemas | ✅ Yup/Zod | ✅ Yup | ❌ Manual |
| Rendimiento | ✅ Excelente | ⚠️ Bueno | ✅ Excelente |
| Curva Aprendizaje | ✅ Suave | ⚠️ Media | ⚠️ Media |

## Configuración Inicial

### 1. Instalación

```bash
npm install vee-validate yup
npm install @types/yup --save-dev
```

### 2. Configuración Global

```typescript
// main.ts
import { createApp } from 'vue'
import { configure } from 'vee-validate'
import App from './App.vue'

// Configuración global de VeeValidate
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true
})

createApp(App).mount('#app')
```

### 3. Configuración de Mensajes

```typescript
// locales/es.ts
import { localize } from '@vee-validate/i18n'

localize('es', {
  messages: {
    required: 'Este campo es obligatorio',
    email: 'Debe ser un email válido',
    min: 'Debe tener al menos {length} caracteres',
    max: 'No puede tener más de {length} caracteres'
  }
})
```

## Implementación en Componentes

### 1. Formulario Básico

```vue
<template>
  <Form :validation-schema="schema" @submit="onSubmit" v-slot="{ errors }">
    <div class="form-group">
      <label>Nombre completo</label>
      <Field name="fullName" v-model="formData.fullName" />
      <span class="error" v-if="errors.fullName">
        {{ errors.fullName }}
      </span>
    </div>
    
    <button type="submit">Enviar</button>
  </Form>
</template>

<script setup lang="ts">
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  fullName: yup.string().required().min(3)
})

const formData = ref({
  fullName: ''
})

const onSubmit = (values: any) => {
  console.log('Datos válidos:', values)
}
</script>
```

### 2. Validación Condicional

```vue
<template>
  <Form :validation-schema="shippingSchema" v-slot="{ errors, values }">
    <div class="form-group">
      <label>
        <Field name="sameAsBilling" type="checkbox" />
        Misma dirección que facturación
      </label>
    </div>

    <!-- Campos condicionales -->
    <div v-if="!values.sameAsBilling" class="shipping-fields">
      <div class="form-group">
        <label>Nombre del destinatario</label>
        <Field name="recipientName" />
        <span class="error" v-if="errors.recipientName">
          {{ errors.recipientName }}
        </span>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
const shippingSchema = yup.object({
  sameAsBilling: yup.boolean(),
  recipientName: yup.string().when('sameAsBilling', {
    is: false,
    then: (schema) => schema.required('El nombre es obligatorio'),
    otherwise: (schema) => schema.notRequired()
  })
})
</script>
```

### 3. Validación Asíncrona

```vue
<template>
  <Form :validation-schema="billingSchema" v-slot="{ errors }">
    <div class="form-group">
      <label>Código postal</label>
      <Field name="postalCode" v-model="formData.postalCode" />
      <span v-if="isValidatingPostalCode" class="loading">
        Validando...
      </span>
      <span class="error" v-if="errors.postalCode">
        {{ errors.postalCode }}
      </span>
    </div>
  </Form>
</template>

<script setup lang="ts">
const billingSchema = yup.object({
  postalCode: yup
    .string()
    .required('El código postal es obligatorio')
    .matches(/^[0-9]{5}$/, 'Debe tener 5 dígitos')
    .test('valid-cp', 'Código postal no existe', async (value) => {
      if (!value) return false
      
      const result = await validatePostalCode(value)
      return result !== null
    })
})
</script>
```

## Esquemas de Validación Avanzados

### 1. Validación Cross-Field

```typescript
const paymentSchema = yup.object({
  method: yup.string().required(),
  
  cardNumber: yup.string().when('method', {
    is: 'card',
    then: (schema) => schema.required().test('luhn', 'Tarjeta inválida', luhnCheck)
  }),
  
  cvv: yup.string().when(['method', 'cardNumber'], {
    is: (method: string, cardNumber: string) => method === 'card' && cardNumber,
    then: (schema) => schema
      .required()
      .test('valid-cvv', 'CVV inválido', function(value) {
        const { cardNumber } = this.parent
        return validateCVV(value, cardNumber)
      })
  })
})
```

### 2. Validación con Contexto

```typescript
const createValidationSchema = (userType: 'individual' | 'company') => {
  return yup.object({
    name: yup.string().required(),
    
    taxId: yup.string().when([], {
      is: () => userType === 'company',
      then: (schema) => schema
        .required('El CIF es obligatorio para empresas')
        .matches(/^[A-Z][0-9]{7}[A-Z]$/, 'Formato CIF inválido'),
      otherwise: (schema) => schema
        .required('El NIF es obligatorio')
        .matches(/^[0-9]{8}[A-Z]$/, 'Formato NIF inválido')
    })
  })
}
```

### 3. Validación Dinámica

```typescript
const createDynamicSchema = (fields: string[]) => {
  const schemaFields: Record<string, any> = {}
  
  fields.forEach(field => {
    switch (field) {
      case 'email':
        schemaFields.email = yup.string().required().email()
        break
      case 'phone':
        schemaFields.phone = yup.string().required().matches(/^[6-9][0-9]{8}$/)
        break
      case 'address':
        schemaFields.address = yup.string().required().min(10)
        break
    }
  })
  
  return yup.object(schemaFields)
}
```

## Composables Personalizados

### 1. useFormValidation

```typescript
// composables/useFormValidation.ts
export function useFormValidation<T>(
  schema: yup.ObjectSchema<T>,
  initialValues: T
) {
  const formData = ref<T>(initialValues)
  const errors = ref<Record<string, string>>({})
  const isValidating = ref(false)
  const isValid = ref(false)

  const validate = async (field?: keyof T) => {
    isValidating.value = true
    
    try {
      if (field) {
        await schema.validateAt(field as string, formData.value)
        delete errors.value[field as string]
      } else {
        await schema.validate(formData.value, { abortEarly: false })
        errors.value = {}
        isValid.value = true
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        if (field) {
          errors.value[field as string] = error.message
        } else {
          errors.value = error.inner.reduce((acc, err) => {
            if (err.path) acc[err.path] = err.message
            return acc
          }, {} as Record<string, string>)
        }
        isValid.value = false
      }
    } finally {
      isValidating.value = false
    }
  }

  return {
    formData,
    errors: readonly(errors),
    isValidating: readonly(isValidating),
    isValid: readonly(isValid),
    validate
  }
}
```

### 2. useAsyncValidation

```typescript
// composables/useAsyncValidation.ts
export function useAsyncValidation<T>(
  validator: (value: T) => Promise<boolean>,
  debounceMs = 300
) {
  const isValidating = ref(false)
  const isValid = ref<boolean | null>(null)
  const error = ref<string | null>(null)

  const debouncedValidate = debounce(async (value: T) => {
    if (!value) {
      isValid.value = null
      error.value = null
      return
    }

    isValidating.value = true
    
    try {
      const result = await validator(value)
      isValid.value = result
      error.value = result ? null : 'Valor inválido'
    } catch (err) {
      isValid.value = false
      error.value = 'Error de validación'
    } finally {
      isValidating.value = false
    }
  }, debounceMs)

  return {
    isValidating: readonly(isValidating),
    isValid: readonly(isValid),
    error: readonly(error),
    validate: debouncedValidate
  }
}
```

## Optimizaciones de Rendimiento

### 1. Validación Lazy

```typescript
// Solo validar cuando el usuario interactúa
configure({
  validateOnBlur: true,
  validateOnChange: false,
  validateOnInput: false,
  validateOnModelUpdate: false
})
```

### 2. Debouncing de Validaciones

```typescript
const debouncedSchema = yup.object({
  search: yup
    .string()
    .test('async-search', 'No encontrado', 
      debounce(async (value) => {
        return await searchAPI(value)
      }, 500)
    )
})
```

### 3. Memoización de Esquemas

```typescript
const memoizedSchema = useMemo(() => {
  return yup.object({
    // esquema complejo...
  })
}, [dependencies])
```

## Integración con TypeScript

### 1. Tipos Inferidos

```typescript
// Los tipos se infieren automáticamente del esquema
type BillingFormData = yup.InferType<typeof billingSchema>

const formData = ref<BillingFormData>({
  fullName: '',
  nif: '',
  email: '',
  // TypeScript autocompleta y valida estos campos
})
```

### 2. Validación de Tipos en Tiempo de Compilación

```typescript
// Error de TypeScript si el campo no existe en el esquema
<Field name="nonExistentField" /> // ❌ Error de compilación

// Autocompletado para campos válidos
<Field name="fullName" /> // ✅ Válido y autocompletado
```

### 3. Tipos Personalizados

```typescript
interface CustomValidationContext {
  userType: 'individual' | 'company'
  country: string
}

const createTypedSchema = (context: CustomValidationContext) => {
  return yup.object({
    taxId: yup
      .string()
      .required()
      .test('format', 'Formato inválido', function(value) {
        // Acceso tipado al contexto
        return validateTaxId(value, context.userType, context.country)
      })
  })
}
```

## Mejores Prácticas

### 1. Separación de Esquemas

```typescript
// schemas/billing.ts
export const billingSchema = yup.object({...})

// schemas/shipping.ts  
export const shippingSchema = yup.object({...})

// schemas/index.ts
export * from './billing'
export * from './shipping'
```

### 2. Reutilización de Validadores

```typescript
// validators/common.ts
export const spanishPhoneValidator = yup
  .string()
  .matches(/^[6-9][0-9]{8}$/, 'Teléfono español inválido')

export const nifValidator = yup
  .string()
  .test('nif', 'NIF inválido', validateNIF)

// Uso en esquemas
const schema = yup.object({
  phone: spanishPhoneValidator.required(),
  nif: nifValidator.required()
})
```

### 3. Testing de Validaciones

```typescript
// tests/validations.spec.ts
describe('Billing Schema', () => {
  it('should validate correct data', async () => {
    const validData = {
      fullName: 'Juan Pérez',
      nif: '12345678Z',
      email: 'juan@example.com'
    }
    
    await expect(billingSchema.validate(validData))
      .resolves.toBeTruthy()
  })
  
  it('should reject invalid NIF', async () => {
    const invalidData = { nif: '12345678A' }
    
    await expect(billingSchema.validate(invalidData))
      .rejects.toThrow('NIF inválido')
  })
})
```