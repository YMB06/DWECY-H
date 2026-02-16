<template>
  <div class="bizum-form">
    <FormField
      id="bizumPhone"
      label="Teléfono móvil"
      v-model="bizumData.phone"
      placeholder="612345678"
      :error-message="errors.phone"
      :has-error="!!errors.phone"
    />
    
    <div class="bizum-info">
      <div class="bizum-logo">📱</div>
      <p>Recibirás una notificación en tu móvil para autorizar el pago con Bizum.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import FormField from '@/components/common/FormField.vue'

const bizumData = reactive({
  phone: ''
})

const errors = reactive({
  phone: ''
})
</script>

<style scoped>
.bizum-info {
  background: #f7fafc;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.bizum-logo {
  font-size: 2rem;
}

.bizum-info p {
  margin: 0;
  color: #4a5568;
  font-size: 0.9rem;
}
</style>