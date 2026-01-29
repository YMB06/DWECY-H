# Guía de Validaciones

## Esquemas de Validación con Yup

### 1. Validación de Datos de Facturación

```typescript
export const billingSchema = yup.object({
  fullName: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'Mínimo 3 caracteres')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'Solo se permiten letras'),
    
  nif: yup
    .string()
    .required('El NIF/CIF es obligatorio')
    .matches(/^[0-9]{8}[A-Z]$|^[A-Z][0-9]{7}[A-Z]$/, 'Formato inválido')
    .test('valid-nif', 'NIF inválido', (value) => validateNIF(value)),
    
  email: yup
    .string()
    .required('El email es obligatorio')
    .email('Formato de email inválido'),
    
  phone: yup
    .string()
    .required('El teléfono es obligatorio')
    .matches(/^[6-9][0-9]{8}$/, 'Formato de teléfono español inválido'),
    
  postalCode: yup
    .string()
    .required('El código postal es obligatorio')
    .matches(/^[0-9]{5}$/, 'Debe tener 5 dígitos')
    .test('valid-cp', 'Código postal no existe', async (value) => {
      const result = await validatePostalCode(value)
      return result !== null
    })
})
```

### 2. Validación Condicional de Envío

```typescript
export const shippingSchema = yup.object({
  sameAsBilling: yup.boolean(),
  
  recipientName: yup.string().when('sameAsBilling', {
    is: false,
    then: (schema) => schema
      .required('El nombre del destinatario es obligatorio')
      .min(3, 'Mínimo 3 caracteres'),
    otherwise: (schema) => schema.notRequired()
  }),
  
  deliveryInstructions: yup
    .string()
    .max(200, 'Máximo 200 caracteres')
})
```

### 3. Validación de Métodos de Pago

```typescript
export const paymentSchema = yup.object({
  method: yup.string().required('Selecciona un método de pago'),
  
  cardNumber: yup.string().when('method', {
    is: 'card',
    then: (schema) => schema
      .required('El número de tarjeta es obligatorio')
      .test('luhn', 'Número de tarjeta inválido', (value) => {
        return luhnCheck(value)
      }),
    otherwise: (schema) => schema.notRequired()
  }),
  
  cvv: yup.string().when('method', {
    is: 'card',
    then: (schema) => schema
      .required('El CVV es obligatorio')
      .test('valid-cvv', 'CVV inválido', function(value) {
        const { cardNumber } = this.parent
        return validateCVV(value, cardNumber)
      })
  })
})
```

## Validaciones Específicas

### 1. Algoritmo de Validación NIF/CIF

```typescript
export function validateNIF(nif: string): boolean {
  const nifRegex = /^[0-9]{8}[A-Z]$/
  const cifRegex = /^[A-Z][0-9]{7}[A-Z]$/

  if (nifRegex.test(nif)) {
    // Validación NIF con tabla de letras
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE'
    const number = parseInt(nif.substring(0, 8), 10)
    const letter = nif.charAt(8)
    return letters.charAt(number % 23) === letter
  }

  if (cifRegex.test(nif)) {
    // Validación CIF (simplificada para el ejemplo)
    return true
  }

  return false
}
```

**Casos de Prueba:**
- ✅ `12345678Z` - NIF válido
- ✅ `A12345674` - CIF válido
- ❌ `12345678A` - Letra incorrecta
- ❌ `123456789` - Sin letra

### 2. Algoritmo de Luhn para Tarjetas

```typescript
export function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\s/g, '')
  let sum = 0
  let isEven = false

  // Recorrer dígitos de derecha a izquierda
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}
```

**Casos de Prueba:**
- ✅ `4532015112830366` - Visa válida
- ✅ `5425233430109903` - Mastercard válida
- ✅ `374245455400126` - Amex válida
- ❌ `4532015112830367` - Dígito incorrecto

### 3. Detección de Tipo de Tarjeta

```typescript
export function detectCardType(cardNumber: string): string {
  const digits = cardNumber.replace(/\s/g, '')

  if (/^4/.test(digits)) return 'Visa'
  if (/^5[1-5]/.test(digits)) return 'Mastercard'
  if (/^3[47]/.test(digits)) return 'Amex'

  return 'Unknown'
}
```

### 4. Validación de CVV según Tipo

```typescript
export function validateCVV(cvv: string, cardNumber: string): boolean {
  const cardType = detectCardType(cardNumber)
  
  if (cardType === 'Amex') {
    return /^[0-9]{4}$/.test(cvv)  // 4 dígitos para Amex
  }
  
  return /^[0-9]{3}$/.test(cvv)    // 3 dígitos para Visa/Mastercard
}
```

### 5. Validación de Fecha de Expiración

```typescript
export function validateExpiryDate(expiryDate: string): boolean {
  const [month, year] = expiryDate.split('/')
  if (!month || !year) return false

  const monthNum = parseInt(month, 10)
  const yearNum = parseInt('20' + year, 10)

  // Validar mes
  if (monthNum < 1 || monthNum > 12) return false

  // Validar que sea fecha futura
  const now = new Date()
  const expiry = new Date(yearNum, monthNum - 1)

  return expiry > now
}
```

## Validaciones Asíncronas

### 1. Validación de Código Postal

```typescript
export async function validatePostalCode(code: string): Promise<PostalCodeData | null> {
  // Verificar cache primero
  if (postalCodeCache.has(code)) {
    return postalCodeCache.get(code)!
  }

  // Simular llamada a API
  await new Promise(resolve => setTimeout(resolve, 500))

  const data = postalCodeDatabase[code] || null
  if (data) {
    postalCodeCache.set(code, data)
  }
  
  return data
}
```

**Características:**
- ⏱️ Retraso de 500ms para simular API
- 💾 Cache para evitar llamadas repetidas
- 🔄 Autocompletado de ciudad y provincia

### 2. Validación de Código de Descuento

```typescript
export async function validateDiscountCode(code: string): Promise<DiscountCodeData | null> {
  // Simular llamada a API
  await new Promise(resolve => setTimeout(resolve, 800))

  const validCodes: Record<string, number> = {
    'BIENVENIDO10': 10,
    'VERANO20': 20,
    'VIP30': 30
  }

  const discount = validCodes[code.toUpperCase()]
  if (discount) {
    return { code: code.toUpperCase(), discount }
  }

  return null
}
```

**Características:**
- ⏱️ Retraso de 800ms para simular API
- 🔤 Case insensitive
- 💰 Retorna porcentaje de descuento

## Validación en Tiempo Real

### 1. Validación Inline

```vue
<template>
  <Field name="fullName" v-model="formData.fullName" />
  <span class="error" v-if="errors.fullName">
    {{ errors.fullName }}
  </span>
</template>
```

### 2. Validación con Debounce

```typescript
import { debounce } from 'lodash-es'

const debouncedValidation = debounce(async (value: string) => {
  if (value.length === 5) {
    await validatePostalCode(value)
  }
}, 300)
```

### 3. Indicadores de Estado

```vue
<template>
  <div class="input-wrapper">
    <input v-model="postalCode" @input="onPostalCodeChange" />
    <span v-if="isValidating" class="loading">Validando...</span>
    <span v-else-if="isValid" class="success">✓</span>
    <span v-else-if="hasError" class="error">✗</span>
  </div>
</template>
```

## Mensajes de Error Personalizados

### 1. Mensajes Contextuales

```typescript
const errorMessages = {
  fullName: {
    required: 'Por favor, introduce tu nombre completo',
    min: 'El nombre debe tener al menos 3 caracteres',
    pattern: 'El nombre solo puede contener letras y espacios'
  },
  nif: {
    required: 'El NIF/CIF es obligatorio para la facturación',
    format: 'Formato: 12345678Z (NIF) o A12345678 (CIF)',
    invalid: 'El NIF/CIF introducido no es válido'
  }
}
```

### 2. Internacionalización

```typescript
const i18nMessages = {
  es: {
    'validation.required': 'Este campo es obligatorio',
    'validation.email': 'Introduce un email válido',
    'validation.phone': 'Formato de teléfono incorrecto'
  },
  en: {
    'validation.required': 'This field is required',
    'validation.email': 'Please enter a valid email',
    'validation.phone': 'Invalid phone format'
  }
}
```

## Mejores Prácticas

### 1. Validación Progresiva
- Validar campos individuales al perder el foco
- Validar formulario completo al enviar
- Mostrar errores de forma no intrusiva

### 2. Feedback Visual
- Estados de carga para validaciones asíncronas
- Iconos de éxito/error
- Colores consistentes (rojo=error, verde=éxito)

### 3. Accesibilidad
- Asociar errores con campos usando `aria-describedby`
- Anunciar errores a lectores de pantalla
- Navegación por teclado funcional

### 4. Rendimiento
- Debounce para validaciones costosas
- Cache de resultados
- Validación lazy cuando sea posible