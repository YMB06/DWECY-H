<template>
  <div class="paypal-form">
    <FormField
      id="paypalEmail"
      label="Email de PayPal"
      type="email"
      v-model="paypalData.email"
      placeholder="tu@email.com"
      :error-message="errors.email"
      :has-error="!!errors.email"
    />
    
    <div class="paypal-info">
      <p>Serás redirigido a PayPal para completar el pago de forma segura.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import FormField from '@/components/common/FormField.vue'

const paypalData = reactive({
  email: ''
})

const errors = reactive({
  email: ''
})
</script>

<style scoped>
.paypal-info {
  background: #f7fafc;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.paypal-info p {
  margin: 0;
  color: #4a5568;
  font-size: 0.9rem;
}
</style>