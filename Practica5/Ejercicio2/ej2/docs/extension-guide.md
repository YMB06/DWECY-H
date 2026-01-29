# Guía de Extensión

## Añadir Nuevos Métodos de Pago

### 1. Crear Tipo de Pago

```typescript
// types/payment.ts
export interface PaymentData {
  method: 'card' | 'paypal' | 'transfer' | 'bizum' | 'crypto' // ← Nuevo método
  // ... campos existentes
  
  // Nuevos campos para crypto
  cryptoWallet?: string
  cryptoCurrency?: 'BTC' | 'ETH' | 'USDT'
}
```

### 2. Actualizar Esquema de Validación

```typescript
// composables/useValidationSchemas.ts
export const paymentSchema = yup.object({
  method: yup.string().required('Selecciona un método de pago'),
  
  // ... validaciones existentes
  
  // Nueva validación para crypto
  cryptoWallet: yup.string().when('method', {
    is: 'crypto',
    then: (schema) => schema
      .required('La dirección de wallet es obligatoria')
      .test('valid-wallet', 'Dirección de wallet inválida', (value) => {
        return validateCryptoWallet(value)
      }),
    otherwise: (schema) => schema.notRequired()
  }),
  
  cryptoCurrency: yup.string().when('method', {
    is: 'crypto',
    then: (schema) => schema
      .required('Selecciona una criptomoneda')
      .oneOf(['BTC', 'ETH', 'USDT'], 'Criptomoneda no soportada'),
    otherwise: (schema) => schema.notRequired()
  })
})
```

### 3. Crear Componente de Formulario

```vue
<!-- components/payment/CryptoForm.vue -->
<template>
  <div class="crypto-form">
    <h3>Pago con Criptomonedas</h3>
    
    <div class="form-group">
      <label for="cryptoCurrency">Criptomoneda *</label>
      <select name="cryptoCurrency" v-model="formData.cryptoCurrency">
        <option value="">Selecciona una opción</option>
        <option value="BTC">Bitcoin (BTC)</option>
        <option value="ETH">Ethereum (ETH)</option>
        <option value="USDT">Tether (USDT)</option>
      </select>
    </div>

    <div class="form-group">
      <label for="cryptoWallet">Dirección de Wallet *</label>
      <input 
        name="cryptoWallet" 
        v-model="formData.cryptoWallet"
        placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
        @blur="validateWallet"
      />
      <span v-if="isValidatingWallet" class="loading">Validando wallet...</span>
      <span v-if="walletError" class="error">{{ walletError }}</span>
    </div>

    <div v-if="exchangeRate" class="exchange-info">
      <p><strong>Tipo de cambio:</strong> 1 {{ formData.cryptoCurrency }} = {{ exchangeRate }}€</p>
      <p><strong>Total a pagar:</strong> {{ cryptoAmount }} {{ formData.cryptoCurrency }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { validateCryptoWallet, getExchangeRate } from '@/services/cryptoService'

const props = defineProps<{
  totalAmount: number
}>()

const formData = ref({
  cryptoCurrency: '',
  cryptoWallet: ''
})

const isValidatingWallet = ref(false)
const walletError = ref('')
const exchangeRate = ref(0)

const cryptoAmount = computed(() => {
  if (!exchangeRate.value || !props.totalAmount) return 0
  return (props.totalAmount / exchangeRate.value).toFixed(8)
})

const validateWallet = async () => {
  if (!formData.value.cryptoWallet) return
  
  isValidatingWallet.value = true
  walletError.value = ''
  
  try {
    const isValid = await validateCryptoWallet(
      formData.value.cryptoWallet, 
      formData.value.cryptoCurrency
    )
    
    if (!isValid) {
      walletError.value = 'Dirección de wallet inválida'
    }
  } catch (error) {
    walletError.value = 'Error al validar wallet'
  } finally {
    isValidatingWallet.value = false
  }
}

// Actualizar tipo de cambio cuando cambia la criptomoneda
watch(() => formData.value.cryptoCurrency, async (newCurrency) => {
  if (newCurrency) {
    exchangeRate.value = await getExchangeRate(newCurrency)
  }
})
</script>
```

### 4. Integrar en Step3Payment

```vue
<!-- components/checkout/Step3Payment.vue -->
<template>
  <div class="payment-form">
    <!-- ... métodos existentes -->
    
    <label class="radio-label">
      <Field name="method" type="radio" value="crypto" v-model="formData.method" />
      💰 Criptomonedas
    </label>

    <!-- Formulario crypto -->
    <div v-if="formData.method === 'crypto'" class="payment-details">
      <CryptoForm :total-amount="totalAmount" @update="onCryptoUpdate" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CryptoForm from '@/components/payment/CryptoForm.vue'

const onCryptoUpdate = (cryptoData: any) => {
  Object.assign(formData.value, cryptoData)
}
</script>
```

### 5. Crear Servicios de Validación

```typescript
// services/cryptoService.ts
export async function validateCryptoWallet(
  address: string, 
  currency: string
): Promise<boolean> {
  const validators = {
    BTC: validateBitcoinAddress,
    ETH: validateEthereumAddress,
    USDT: validateUSDTAddress
  }
  
  const validator = validators[currency as keyof typeof validators]
  return validator ? await validator(address) : false
}

export async function getExchangeRate(currency: string): Promise<number> {
  // Simular llamada a API de exchange
  const rates = {
    BTC: 45000,
    ETH: 3000,
    USDT: 1
  }
  
  return rates[currency as keyof typeof rates] || 0
}

function validateBitcoinAddress(address: string): boolean {
  // Validación básica de dirección Bitcoin
  return /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address) ||
         /^bc1[a-z0-9]{39,59}$/.test(address)
}

function validateEthereumAddress(address: string): boolean {
  // Validación básica de dirección Ethereum
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}
```

---

## Añadir Nuevas Validaciones

### 1. Validación Personalizada Simple

```typescript
// utils/customValidators.ts
export function validateSpanishIBAN(iban: string): boolean {
  // Eliminar espacios y convertir a mayúsculas
  const cleanIBAN = iban.replace(/\s/g, '').toUpperCase()
  
  // Verificar formato español
  if (!/^ES\d{22}$/.test(cleanIBAN)) {
    return false
  }
  
  // Algoritmo de validación IBAN
  const rearranged = cleanIBAN.slice(4) + cleanIBAN.slice(0, 4)
  const numericString = rearranged.replace(/[A-Z]/g, (char) => 
    (char.charCodeAt(0) - 55).toString()
  )
  
  return mod97(numericString) === 1
}

function mod97(str: string): number {
  let remainder = 0
  for (let i = 0; i < str.length; i++) {
    remainder = (remainder * 10 + parseInt(str[i])) % 97
  }
  return remainder
}
```

### 2. Integrar en Esquema Yup

```typescript
// Añadir al esquema de transferencia
const transferSchema = yup.object({
  method: yup.string().oneOf(['transfer']),
  
  iban: yup
    .string()
    .required('El IBAN es obligatorio')
    .test('valid-iban', 'IBAN español inválido', validateSpanishIBAN),
    
  transferReference: yup
    .string()
    .required('La referencia es obligatoria')
    .min(6, 'Mínimo 6 caracteres')
    .max(20, 'Máximo 20 caracteres')
})
```

### 3. Validación Asíncrona Personalizada

```typescript
// services/bankValidationService.ts
export async function validateBankAccount(
  iban: string, 
  accountHolder: string
): Promise<boolean> {
  // Simular validación con API bancaria
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Lógica de validación personalizada
  const isValidFormat = validateSpanishIBAN(iban)
  const isValidHolder = accountHolder.length >= 3
  
  return isValidFormat && isValidHolder
}

// Integrar en esquema
const bankAccountSchema = yup.object({
  iban: yup
    .string()
    .required()
    .test('bank-validation', 'Cuenta bancaria inválida', async function(value) {
      const { accountHolder } = this.parent
      return await validateBankAccount(value, accountHolder)
    })
})
```

---

## Añadir Nuevos Pasos al Wizard

### 1. Crear Nuevo Componente de Paso

```vue
<!-- components/checkout/Step5Confirmation.vue -->
<template>
  <div class="confirmation-step">
    <h2>Confirmación Final</h2>
    
    <div class="confirmation-content">
      <div class="security-check">
        <h3>Verificación de Seguridad</h3>
        <div class="form-group">
          <label>Código de verificación SMS</label>
          <input 
            v-model="verificationCode" 
            placeholder="Introduce el código de 6 dígitos"
            maxlength="6"
          />
          <button @click="sendSMSCode" :disabled="smsSent">
            {{ smsSent ? 'Código enviado' : 'Enviar código' }}
          </button>
        </div>
      </div>

      <div class="final-review">
        <h3>Revisión Final</h3>
        <div class="review-item">
          <span>Total a pagar:</span>
          <strong>{{ formatPrice(totalAmount) }}</strong>
        </div>
        <div class="review-item">
          <span>Método de pago:</span>
          <strong>{{ paymentMethodName }}</strong>
        </div>
      </div>
    </div>

    <div class="button-group">
      <button type="button" class="btn-prev" @click="onPrevious">
        Anterior
      </button>
      <button 
        type="button" 
        class="btn-confirm" 
        @click="onConfirm"
        :disabled="!isVerificationValid"
      >
        Confirmar Pedido Final
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCheckout } from '@/composables/useCheckout'

const { paymentData } = useCheckout()

const verificationCode = ref('')
const smsSent = ref(false)

const isVerificationValid = computed(() => {
  return verificationCode.value.length === 6 && /^\d{6}$/.test(verificationCode.value)
})

const sendSMSCode = async () => {
  // Simular envío de SMS
  await new Promise(resolve => setTimeout(resolve, 1000))
  smsSent.value = true
}

const emit = defineEmits<{
  previous: []
  confirm: [data: { verificationCode: string }]
}>()

const onPrevious = () => emit('previous')
const onConfirm = () => {
  if (isVerificationValid.value) {
    emit('confirm', { verificationCode: verificationCode.value })
  }
}
</script>
```

### 2. Actualizar Navegación del Wizard

```typescript
// composables/useWizardNavigation.ts
export function useWizardNavigation() {
  const currentStep = ref(1)
  const totalSteps = 5 // ← Actualizar número total
  
  const stepNames = [
    'Facturación',
    'Envío', 
    'Pago',
    'Resumen',
    'Confirmación' // ← Nuevo paso
  ]
  
  // ... resto de la lógica
}
```

### 3. Integrar en CheckoutWizard

```vue
<!-- components/checkout/CheckoutWizard.vue -->
<template>
  <div class="checkout-wizard">
    <StepIndicator />
    
    <div class="wizard-content">
      <!-- ... pasos existentes -->
      
      <Step5Confirmation 
        v-if="currentStep === 5" 
        @previous="previousStep" 
        @confirm="handleFinalConfirm" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Step5Confirmation from './Step5Confirmation.vue'

const handleFinalConfirm = (data: any) => {
  // Lógica de confirmación final
  console.log('Confirmación final:', data)
  // Procesar pago, enviar emails, etc.
}
</script>
```

---

## Personalizar Temas y Estilos

### 1. Sistema de Temas CSS

```css
/* assets/themes.css */
:root {
  /* Tema por defecto */
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #48bb78;
  --error-color: #f56565;
  --warning-color: #ed8936;
  
  --bg-primary: #ffffff;
  --bg-secondary: #f7fafc;
  --text-primary: #2d3748;
  --text-secondary: #718096;
  
  --border-radius: 12px;
  --box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  --primary-color: #90cdf4;
  --secondary-color: #a78bfa;
  --success-color: #68d391;
  --error-color: #fc8181;
  --warning-color: #f6ad55;
  
  --bg-primary: #1a202c;
  --bg-secondary: #2d3748;
  --text-primary: #f7fafc;
  --text-secondary: #a0aec0;
}

[data-theme="corporate"] {
  --primary-color: #3182ce;
  --secondary-color: #2c5282;
  --success-color: #38a169;
  --error-color: #e53e3e;
  
  --border-radius: 4px;
  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
```

### 2. Composable para Temas

```typescript
// composables/useTheme.ts
export function useTheme() {
  const currentTheme = ref<'light' | 'dark' | 'corporate'>('light')
  
  const setTheme = (theme: string) => {
    currentTheme.value = theme as any
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('checkout-theme', theme)
  }
  
  const loadTheme = () => {
    const saved = localStorage.getItem('checkout-theme')
    if (saved) {
      setTheme(saved)
    }
  }
  
  onMounted(loadTheme)
  
  return {
    currentTheme: readonly(currentTheme),
    setTheme
  }
}
```

---

## Internacionalización (i18n)

### 1. Configurar Vue I18n

```typescript
// plugins/i18n.ts
import { createI18n } from 'vue-i18n'

const messages = {
  es: {
    checkout: {
      billing: 'Datos de Facturación',
      shipping: 'Dirección de Envío',
      payment: 'Método de Pago',
      summary: 'Resumen del Pedido'
    },
    validation: {
      required: 'Este campo es obligatorio',
      email: 'Formato de email inválido',
      phone: 'Teléfono español inválido'
    }
  },
  en: {
    checkout: {
      billing: 'Billing Information',
      shipping: 'Shipping Address', 
      payment: 'Payment Method',
      summary: 'Order Summary'
    },
    validation: {
      required: 'This field is required',
      email: 'Invalid email format',
      phone: 'Invalid Spanish phone'
    }
  }
}

export const i18n = createI18n({
  locale: 'es',
  fallbackLocale: 'en',
  messages
})
```

### 2. Usar en Componentes

```vue
<template>
  <h2>{{ $t('checkout.billing') }}</h2>
  <span class="error">{{ $t('validation.required') }}</span>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const changeLanguage = (lang: string) => {
  locale.value = lang
}
</script>
```

---

## Testing de Extensiones

### 1. Test de Nuevo Método de Pago

```typescript
// tests/crypto-payment.spec.ts
describe('Crypto Payment', () => {
  it('should validate Bitcoin address', () => {
    expect(validateBitcoinAddress('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa')).toBe(true)
    expect(validateBitcoinAddress('invalid-address')).toBe(false)
  })
  
  it('should calculate crypto amount correctly', async () => {
    const rate = await getExchangeRate('BTC')
    const amount = calculateCryptoAmount(100, rate)
    expect(amount).toBeCloseTo(100 / rate, 8)
  })
})
```

### 2. Test de Validación Personalizada

```typescript
// tests/custom-validation.spec.ts
describe('Custom Validations', () => {
  it('should validate Spanish IBAN', () => {
    expect(validateSpanishIBAN('ES91 2100 0418 4502 0005 1332')).toBe(true)
    expect(validateSpanishIBAN('ES91 2100 0418 4502 0005 1333')).toBe(false)
  })
})
```

---

## Mejores Prácticas para Extensiones

### 1. Principios SOLID
- **Single Responsibility**: Cada componente tiene una responsabilidad
- **Open/Closed**: Abierto para extensión, cerrado para modificación
- **Dependency Inversion**: Depender de abstracciones, no implementaciones

### 2. Patrones Recomendados
- **Factory Pattern** para crear validadores
- **Strategy Pattern** para métodos de pago
- **Observer Pattern** para eventos
- **Composables** para lógica reutilizable

### 3. Documentación
- Documentar todas las APIs públicas
- Incluir ejemplos de uso
- Mantener changelog de cambios
- Crear guías de migración