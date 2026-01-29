<template>
  <div class="billing-form">
    <h2>Datos de Facturación</h2>
    <Form :validation-schema="billingSchema" @submit="onSubmit" v-slot="{ errors }">
      <div class="form-group">
        <label for="fullName">Nombre completo *</label>
        <Field name="fullName" v-model="formData.fullName" />
        <span class="error" v-if="errors.fullName">{{ errors.fullName }}</span>
      </div>

      <div class="form-group">
        <label for="nif">
          NIF/CIF *
          <span class="tooltip" title="Formato: 12345678A (NIF) o A12345678 (CIF)">ℹ️</span>
        </label>
        <Field name="nif" v-model="formData.nif" />
        <span class="error" v-if="errors.nif">{{ errors.nif }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email *</label>
        <Field name="email" type="email" v-model="formData.email" />
        <span class="error" v-if="errors.email">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="phone">
          Teléfono *
          <span class="tooltip" title="Formato español: 612345678">ℹ️</span>
        </label>
        <Field name="phone" v-model="formData.phone" />
        <span class="error" v-if="errors.phone">{{ errors.phone }}</span>
      </div>

      <div class="form-group">
        <label for="address">Dirección *</label>
        <Field name="address" v-model="formData.address" />
        <span class="error" v-if="errors.address">{{ errors.address }}</span>
      </div>

      <div class="form-group">
        <label for="postalCode">Código postal *</label>
        <Field name="postalCode" v-model="formData.postalCode" @input="onPostalCodeChange" />
        <span class="loading" v-if="isValidatingPostalCode">Validando...</span>
        <span class="error" v-if="errors.postalCode">{{ errors.postalCode }}</span>
      </div>

      <div class="form-group">
        <label for="city">Ciudad *</label>
        <Field name="city" v-model="formData.city" :disabled="true" />
        <span class="error" v-if="errors.city">{{ errors.city }}</span>
      </div>

      <div class="form-group">
        <label for="province">Provincia *</label>
        <Field name="province" v-model="formData.province" :disabled="true" />
        <span class="error" v-if="errors.province">{{ errors.province }}</span>
      </div>

      <div class="form-group">
        <label for="country">País *</label>
        <Field name="country" as="select" v-model="formData.country">
          <option value="España">España</option>
          <option value="Portugal">Portugal</option>
          <option value="Francia">Francia</option>
        </Field>
        <span class="error" v-if="errors.country">{{ errors.country }}</span>
      </div>

      <button type="submit" class="btn-next" @click="validateAndSubmit">Siguiente</button>
      <button type="button" class="btn-draft" @click="handleSaveDraft">Guardar borrador</button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Form, Field } from 'vee-validate'
import { billingSchema } from '@/composables/useValidationSchemas'
import { validatePostalCode } from '@/services/validationService'
import type { BillingData } from '@/types/checkout'

const formData = ref<BillingData>({
  fullName: '',
  nif: '',
  email: '',
  phone: '',
  address: '',
  postalCode: '',
  city: '',
  province: '',
  country: 'España'
})

const isValidatingPostalCode = ref(false)

const onPostalCodeChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const code = target.value

  if (code.length === 5) {
    isValidatingPostalCode.value = true
    const result = await validatePostalCode(code)
    isValidatingPostalCode.value = false

    if (result) {
      formData.value.city = result.city
      formData.value.province = result.province
    }
  }
}

const onSubmit = (values: BillingData) => {
  emit('next', values)
}

const validateAndSubmit = async () => {
  const errors: string[] = []
  
  if (!formData.value.fullName || formData.value.fullName.length < 3) {
    errors.push('El nombre debe tener al menos 3 caracteres')
  }
  if (!formData.value.nif) {
    errors.push('El NIF/CIF es obligatorio')
  }
  if (!formData.value.email) {
    errors.push('El email es obligatorio')
  }
  if (!formData.value.phone) {
    errors.push('El teléfono es obligatorio')
  }
  if (!formData.value.address) {
    errors.push('La dirección es obligatoria')
  }
  if (!formData.value.postalCode) {
    errors.push('El código postal es obligatorio')
  }
  
  if (errors.length > 0) {
    emit('validation-error', errors)
    return
  }
  
  emit('next', formData.value)
}

const emit = defineEmits<{
  next: [data: BillingData]
  saveDraft: []
  'validation-error': [errors: string[]]
}>()

const handleSaveDraft = () => {
  emit('saveDraft')
}
</script>

<style scoped>
.billing-form {
  max-width: 650px;
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

input,
select {
  width: 100%;
  padding: 0.9rem 1.2rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s;
  background: #f7fafc;
}

input:disabled {
  background-color: #edf2f7;
  cursor: not-allowed;
  opacity: 0.7;
}

input:focus,
select:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.error {
  display: block;
  color: #f56565;
  font-size: 0.85rem;
  margin-top: 0.4rem;
  font-weight: 500;
}

.loading {
  display: block;
  color: #667eea;
  font-size: 0.85rem;
  margin-top: 0.4rem;
  font-weight: 600;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.btn-next {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: all 0.3s;
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
  padding: 1rem 2rem;
  border: 2px solid #667eea;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.5rem;
  margin-left: 1rem;
  transition: all 0.3s;
}

.btn-draft:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.tooltip {
  display: inline-block;
  margin-left: 0.5rem;
  cursor: help;
  font-size: 0.9rem;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.tooltip:hover {
  opacity: 1;
}
</style>
