<template>
  <div class="checkout-wizard">
    <StepIndicator />
    
    <div class="wizard-layout">
      <div class="wizard-content">
        <div v-if="errorSummary.length > 0" class="error-summary">
          <h4>⚠️ Corrige los siguientes errores:</h4>
          <ul>
            <li v-for="error in errorSummary" :key="error">{{ error }}</li>
          </ul>
        </div>
        
        <Step1Billing 
          v-if="currentStep === 1" 
          @next="handleNext" 
          @save-draft="saveDraft" 
          @validation-error="handleValidationError"
        />
        <Step2Shipping 
          v-if="currentStep === 2" 
          @next="handleNext" 
          @previous="previousStep" 
          @save-draft="saveDraft"
          @validation-error="handleValidationError"
        />
        <Step3Payment 
          v-if="currentStep === 3" 
          @next="handleNext" 
          @previous="previousStep" 
          @save-draft="saveDraft"
          @validation-error="handleValidationError"
          @discount-applied="handleDiscountApplied"
        />
        <Step4Summary 
          v-if="currentStep === 4" 
          @previous="previousStep" 
          @confirm="handleConfirm"
        />
      </div>
      
      <aside class="order-sidebar">
        <OrderSummary :discount="appliedDiscount" />
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useWizardNavigation } from '@/composables/useWizardNavigation'
import { useCheckout } from '@/composables/useCheckout'
import StepIndicator from './StepIndicator.vue'
import Step1Billing from './Step1Billing.vue'
import Step2Shipping from './Step2Shipping.vue'
import Step3Payment from './Step3Payment.vue'
import Step4Summary from './Step4Summary.vue'
import OrderSummary from '@/components/common/OrderSummary.vue'

const { currentStep, nextStep, previousStep } = useWizardNavigation()
const { billingData, shippingData, paymentData } = useCheckout()

const errorSummary = ref<string[]>([])
const appliedDiscount = ref(0)

// Auto-save every 30 seconds
let autoSaveInterval: NodeJS.Timeout

const handleNext = (data: any) => {
  errorSummary.value = []
  
  // Save data for current step
  if (currentStep.value === 1) {
    Object.assign(billingData.value, data)
  } else if (currentStep.value === 2) {
    Object.assign(shippingData.value, data)
  } else if (currentStep.value === 3) {
    Object.assign(paymentData.value, data)
    if (data.discountApplied) {
      appliedDiscount.value = data.discountApplied
    }
  }
  
  saveToLocalStorage()
  nextStep()
  scrollToTop()
}

const handleValidationError = (errors: string[]) => {
  errorSummary.value = errors
  scrollToFirstError()
}

const handleDiscountApplied = (discount: number) => {
  appliedDiscount.value = discount
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const scrollToFirstError = () => {
  setTimeout(() => {
    const firstError = document.querySelector('.error')
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, 100)
}

const handleConfirm = () => {
  console.log('Order confirmed')
  localStorage.removeItem('checkout-draft')
  clearInterval(autoSaveInterval)
  alert('¡Pedido confirmado con éxito!')
}

const saveDraft = () => {
  saveToLocalStorage()
  alert('Borrador guardado correctamente')
}

const saveToLocalStorage = () => {
  const draft = {
    currentStep: currentStep.value,
    billing: billingData.value,
    shipping: shippingData.value,
    payment: paymentData.value,
    appliedDiscount: appliedDiscount.value,
    timestamp: Date.now()
  }
  localStorage.setItem('checkout-draft', JSON.stringify(draft))
}

const loadFromLocalStorage = () => {
  const draft = localStorage.getItem('checkout-draft')
  if (draft) {
    const confirmed = confirm('Se encontró un borrador guardado. ¿Deseas recuperarlo?')
    if (confirmed) {
      const data = JSON.parse(draft)
      Object.assign(billingData.value, data.billing || {})
      Object.assign(shippingData.value, data.shipping || {})
      Object.assign(paymentData.value, data.payment || {})
      appliedDiscount.value = data.appliedDiscount || 0
      currentStep.value = data.currentStep || 1
    }
  }
}

// Watch for changes and auto-save
watch([billingData, shippingData, paymentData], () => {
  saveToLocalStorage()
}, { deep: true })

onMounted(() => {
  loadFromLocalStorage()
  
  // Auto-save every 30 seconds
  autoSaveInterval = setInterval(() => {
    saveToLocalStorage()
  }, 30000)
})
</script>

<style scoped>
.checkout-wizard {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.wizard-layout {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 3rem;
  align-items: start;
}

.wizard-content {
  animation: fadeIn 0.4s ease-out;
}

.order-sidebar {
  position: sticky;
  top: 2rem;
}

.error-summary {
  background: linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%);
  border: 2px solid #f56565;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  animation: shake 0.5s ease-in-out;
}

.error-summary h4 {
  color: #c53030;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.error-summary ul {
  list-style: none;
  padding: 0;
}

.error-summary li {
  color: #c53030;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.error-summary li::before {
  content: '•';
  position: absolute;
  left: 0;
  font-weight: bold;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@media (max-width: 1024px) {
  .wizard-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .order-sidebar {
    order: -1;
    position: static;
  }
}
</style>
