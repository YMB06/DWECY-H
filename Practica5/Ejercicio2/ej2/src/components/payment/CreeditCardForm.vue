<template>
  <div class="credit-card-form">
    <FormField
      id="cardNumber"
      label="Número de tarjeta"
      v-model="cardData.cardNumber"
      placeholder="1234 5678 9012 3456"
      :error-message="errors.cardNumber"
      :has-error="!!errors.cardNumber"
    />
    
    <FormField
      id="cardHolder"
      label="Titular de la tarjeta"
      v-model="cardData.cardHolder"
      placeholder="JUAN PÉREZ"
      :error-message="errors.cardHolder"
      :has-error="!!errors.cardHolder"
    />
    
    <div class="card-row">
      <FormField
        id="expiryDate"
        label="Fecha de expiración"
        v-model="cardData.expiryDate"
        placeholder="MM/YY"
        :error-message="errors.expiryDate"
        :has-error="!!errors.expiryDate"
      />
      
      <FormField
        id="cvv"
        label="CVV"
        v-model="cardData.cvv"
        placeholder="123"
        :error-message="errors.cvv"
        :has-error="!!errors.cvv"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import FormField from '@/components/common/FormField.vue'

const cardData = reactive({
  cardNumber: '',
  cardHolder: '',
  expiryDate: '',
  cvv: ''
})

const errors = reactive({
  cardNumber: '',
  cardHolder: '',
  expiryDate: '',
  cvv: ''
})
</script>

<style scoped>
.card-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
</style>