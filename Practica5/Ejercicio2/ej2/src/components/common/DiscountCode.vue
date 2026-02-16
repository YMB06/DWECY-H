<template>
  <div class="discount-code">
    <div class="input-group">
      <input 
        v-model="code" 
        placeholder="Código de descuento"
        @keyup.enter="applyCode"
      />
      <button @click="applyCode" :disabled="!code || loading">
        {{ loading ? 'Validando...' : 'Aplicar' }}
      </button>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">¡Código aplicado! Descuento del {{ discount }}%</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { validateDiscountCode } from '@/services/checkoutService'

const emit = defineEmits<{
  discountApplied: [discount: number]
}>()

const code = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')
const discount = ref(0)

const applyCode = async () => {
  if (!code.value) return
  
  loading.value = true
  error.value = ''
  success.value = ''
  
  try {
    const result = await validateDiscountCode(code.value)
    if (result) {
      discount.value = result.discount
      success.value = `¡Código aplicado! Descuento del ${result.discount}%`
      emit('discountApplied', result.discount)
    } else {
      error.value = 'Código no válido'
    }
  } catch {
    error.value = 'Error al validar el código'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.input-group {
  display: flex;
  gap: 0.5rem;
}

input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
}

button {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error {
  color: #e53e3e;
  margin-top: 0.5rem;
}

.success {
  color: #48bb78;
  margin-top: 0.5rem;
}
</style>