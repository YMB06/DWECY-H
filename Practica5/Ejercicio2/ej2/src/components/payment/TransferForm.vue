<template>
  <div class="transfer-form">
    <FormField
      id="transferReference"
      label="Referencia de transferencia"
      v-model="transferData.reference"
      placeholder="Introduce una referencia"
      :error-message="errors.reference"
      :has-error="!!errors.reference"
    />
    
    <div class="transfer-info">
      <h4>Datos bancarios:</h4>
      <p><strong>IBAN:</strong> ES91 2100 0418 4502 0005 1332</p>
      <p><strong>Beneficiario:</strong> Mi Tienda Online S.L.</p>
      <p><strong>Concepto:</strong> Pedido #{{ orderId }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import FormField from '@/components/common/FormField.vue'

const transferData = reactive({
  reference: ''
})

const errors = reactive({
  reference: ''
})

const orderId = computed(() => Math.random().toString(36).substr(2, 9).toUpperCase())
</script>

<style scoped>
.transfer-info {
  background: #f7fafc;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.transfer-info h4 {
  margin-top: 0;
  color: #2d3748;
}

.transfer-info p {
  margin: 0.5rem 0;
  color: #4a5568;
  font-size: 0.9rem;
}
</style>