<template>
  <div class="payment-form">
    <h2>Método de Pago</h2>
    <Form :validation-schema="paymentSchema" @submit="onSubmit" v-slot="{ errors }">
      <div class="form-group">
        <label>Selecciona método de pago *</label>
        <div class="payment-methods">
          <label class="radio-label">
            <Field name="method" type="radio" value="card" v-model="formData.method" />
            Tarjeta de crédito/débito
          </label>
          <label class="radio-label">
            <Field name="method" type="radio" value="paypal" v-model="formData.method" />
            PayPal
          </label>
          <label class="radio-label">
            <Field name="method" type="radio" value="transfer" v-model="formData.method" />
            Transferencia bancaria
          </label>
          <label class="radio-label">
            <Field name="method" type="radio" value="bizum" v-model="formData.method" />
            Bizum
          </label>
        </div>
        <span class="error" v-if="errors.method">{{ errors.method }}</span>
      </div>

      <!-- Tarjeta -->
      <div v-if="formData.method === 'card'" class="payment-details">
        <div class="form-group">
          <label for="cardNumber">Número de tarjeta *</label>
          <div class="card-input-wrapper">
            <Field 
              name="cardNumber" 
              v-model="formData.cardNumber" 
              @input="onCardNumberChange"
              placeholder="1234 5678 9012 3456"
            />
            <div v-if="cardType" class="card-type">
              <span class="card-icon">{{ getCardIcon(cardType) }}</span>
              <span>{{ cardType }}</span>
            </div>
          </div>
          <span class="error" v-if="errors.cardNumber">{{ errors.cardNumber }}</span>
        </div>

        <div class="form-group">
          <label for="cardHolder">Nombre del titular *</label>
          <Field name="cardHolder" v-model="formData.cardHolder" />
          <span class="error" v-if="errors.cardHolder">{{ errors.cardHolder }}</span>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="expiryDate">Fecha de expiración *</label>
            <Field 
              name="expiryDate" 
              v-model="formData.expiryDate"
              @input="formatExpiry"
              placeholder="MM/YY"
              maxlength="5"
            />
            <span class="error" v-if="errors.expiryDate">{{ errors.expiryDate }}</span>
          </div>

          <div class="form-group">
            <label for="cvv">CVV *</label>
            <Field 
              name="cvv" 
              v-model="formData.cvv"
              type="password"
              maxlength="4"
              placeholder="123"
            />
            <span class="error" v-if="errors.cvv">{{ errors.cvv }}</span>
          </div>
        </div>
      </div>

      <!-- PayPal -->
      <div v-if="formData.method === 'paypal'" class="payment-details">
        <div class="form-group">
          <label for="paypalEmail">Email de PayPal *</label>
          <Field name="paypalEmail" type="email" v-model="formData.paypalEmail" />
          <span class="error" v-if="errors.paypalEmail">{{ errors.paypalEmail }}</span>
        </div>
      </div>

      <!-- Transferencia -->
      <div v-if="formData.method === 'transfer'" class="payment-details">
        <div class="bank-info">
          <h3>Datos bancarios</h3>
          <p><strong>Banco:</strong> Banco Ejemplo</p>
          <p><strong>IBAN:</strong> ES12 1234 5678 9012 3456 7890</p>
          <p><strong>BIC/SWIFT:</strong> ABCDESMMXXX</p>
          <p><strong>Concepto:</strong> Pedido #[número de pedido]</p>
        </div>
        <div class="form-group">
          <label for="transferReference">Referencia de transferencia *</label>
          <Field name="transferReference" v-model="formData.transferReference" />
          <span class="error" v-if="errors.transferReference">{{ errors.transferReference }}</span>
        </div>
      </div>

      <!-- Bizum -->
      <div v-if="formData.method === 'bizum'" class="payment-details">
        <div class="form-group">
          <label for="bizumPhone">Teléfono móvil *</label>
          <Field name="bizumPhone" v-model="formData.bizumPhone" placeholder="612345678" />
          <span class="error" v-if="errors.bizumPhone">{{ errors.bizumPhone }}</span>
        </div>
      </div>

      <!-- Código de descuento -->
      <div class="discount-section">
        <h3>Código de descuento</h3>
        <div class="discount-input-group">
          <input 
            type="text" 
            v-model="discountCode" 
            placeholder="Introduce tu código"
            :disabled="discountApplied"
          />
          <button 
            type="button" 
            @click="applyDiscount" 
            :disabled="isValidatingDiscount || discountApplied"
            class="btn-apply"
          >
            {{ isValidatingDiscount ? 'Validando...' : 'Aplicar' }}
          </button>
        </div>
        <span v-if="discountMessage" :class="discountMessageClass">{{ discountMessage }}</span>
        <div v-if="discountApplied" class="discount-applied">
          ✓ Descuento del {{ appliedDiscount }}% aplicado
        </div>
      </div>

      <div class="button-group">
        <button type="button" class="btn-prev" @click="onPrevious">Anterior</button>
        <button type="submit" class="btn-next">Siguiente</button>
        <button type="button" class="btn-draft" @click="handleSaveDraft">Guardar borrador</button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Form, Field } from 'vee-validate'
import { paymentSchema } from '@/composables/useValidationSchemas'
import { detectCardType, formatCardNumber } from '@/utils/creditCard'
import { validateDiscountCode } from '@/services/checkoutService'
import type { PaymentData } from '@/types/payment'

const formData = ref<PaymentData>({
  method: 'card',
  cardNumber: '',
  cardHolder: '',
  expiryDate: '',
  cvv: '',
  paypalEmail: '',
  transferReference: '',
  bizumPhone: ''
})

const cardType = ref('')
const discountCode = ref('')
const isValidatingDiscount = ref(false)
const discountApplied = ref(false)
const appliedDiscount = ref(0)
const discountMessage = ref('')
const discountMessageClass = ref('')

const getCardIcon = (cardType: string): string => {
  const icons: Record<string, string> = {
    'Visa': '💳',
    'Mastercard': '💳',
    'Amex': '💳',
    'Unknown': '💳'
  }
  return icons[cardType] || '💳'
}

const onCardNumberChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const formatted = formatCardNumber(target.value)
  formData.value.cardNumber = formatted
  target.value = formatted
  
  if (formatted.replace(/\s/g, '').length >= 4) {
    cardType.value = detectCardType(formatted)
  } else {
    cardType.value = ''
  }
  
  // Actualizar placeholder del CVV según tipo de tarjeta
  if (cardType.value === 'Amex') {
    const cvvInput = document.querySelector('input[name="cvv"]') as HTMLInputElement
    if (cvvInput) cvvInput.placeholder = '1234'
  } else {
    const cvvInput = document.querySelector('input[name="cvv"]') as HTMLInputElement
    if (cvvInput) cvvInput.placeholder = '123'
  }
}

const formatExpiry = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value.replace(/\D/g, '')
  
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2, 4)
  }
  
  formData.value.expiryDate = value
  target.value = value
}

const applyDiscount = async () => {
  if (!discountCode.value) return

  isValidatingDiscount.value = true
  discountMessage.value = ''

  const result = await validateDiscountCode(discountCode.value)
  isValidatingDiscount.value = false

  if (result) {
    discountApplied.value = true
    appliedDiscount.value = result.discount
    discountMessage.value = `¡Código válido! Descuento del ${result.discount}% aplicado`
    discountMessageClass.value = 'success'
    emit('discount-applied', result.discount)
  } else {
    discountMessage.value = 'Código de descuento inválido'
    discountMessageClass.value = 'error'
  }
}

const onPrevious = () => {
  emit('previous')
}

const onSubmit = (values: PaymentData) => {
  emit('next', { ...values, discountApplied: appliedDiscount.value })
}

const emit = defineEmits<{
  next: [data: any]
  previous: []
  saveDraft: []
  'validation-error': [errors: string[]]
  'discount-applied': [discount: number]
}>()

const handleSaveDraft = () => {
  emit('saveDraft')
}
</script>

<style scoped>
.payment-form {
  max-width: 700px;
  margin: 0 auto;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
}

h2 {
  margin-bottom: 2rem;
  color: #2d3748;
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #4a5568;
  font-weight: 700;
}

.form-group {
  margin-bottom: 1.75rem;
}

label {
  display: block;
  margin-bottom: 0.6rem;
  font-weight: 600;
  color: #4a5568;
  font-size: 0.95rem;
}

.payment-methods {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 1.2rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  background: #f7fafc;
  font-weight: 600;
}

.radio-label:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
  transform: translateY(-2px);
}

.radio-label input[type="radio"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #667eea;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.9rem 1.2rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s;
  background: #f7fafc;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.payment-details {
  animation: slideIn 0.4s ease-out;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 3px solid #e2e8f0;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-input-wrapper {
  position: relative;
}

.card-type {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 700;
  color: #667eea;
  font-size: 0.9rem;
  padding: 0.3rem 0.8rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-icon {
  font-size: 1.2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
}

.bank-info {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border: 2px solid rgba(102, 126, 234, 0.2);
}

.bank-info p {
  margin: 0.6rem 0;
  font-size: 0.95rem;
  color: #4a5568;
}

.discount-section {
  margin-top: 2.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: 15px;
  border: 2px dashed #667eea;
}

.discount-input-group {
  display: flex;
  gap: 0.8rem;
}

.discount-input-group input {
  flex: 1;
}

.btn-apply {
  padding: 0.9rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  white-space: nowrap;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-apply:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-apply:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.discount-applied {
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  border-radius: 12px;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
}

.error {
  display: block;
  color: #f56565;
  font-size: 0.85rem;
  margin-top: 0.4rem;
  font-weight: 500;
}

.success {
  display: block;
  color: #48bb78;
  font-size: 0.9rem;
  margin-top: 0.7rem;
  font-weight: 700;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
}

.btn-prev,
.btn-next,
.btn-draft {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-prev {
  background: white;
  color: #718096;
  border: 2px solid #e2e8f0;
}

.btn-prev:hover {
  background: #f7fafc;
  transform: translateY(-2px);
}

.btn-next {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex: 1;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-next:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
}

.btn-next:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-draft {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-draft:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .payment-methods {
    grid-template-columns: 1fr;
  }
}
</style>
