<template>
  <div class="shipping-form">
    <h2>Dirección de Envío</h2>
    <Form :validation-schema="shippingSchema" @submit="onSubmit" v-slot="{ errors }">
      <div class="form-group">
        <label class="checkbox-label">
          <Field name="sameAsBilling" type="checkbox" v-model="formData.sameAsBilling" />
          Misma dirección que facturación
        </label>
      </div>

      <div v-if="!formData.sameAsBilling" class="shipping-fields">
        <div class="form-group">
          <label for="recipientName">Nombre del destinatario *</label>
          <Field name="recipientName" v-model="formData.recipientName" />
          <span class="error" v-if="errors.recipientName">{{ errors.recipientName }}</span>
        </div>

        <div class="form-group">
          <label for="shippingAddress">Dirección de envío *</label>
          <Field name="shippingAddress" v-model="formData.shippingAddress" />
          <span class="error" v-if="errors.shippingAddress">{{ errors.shippingAddress }}</span>
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

        <div class="form-group">
          <label for="contactPhone">Teléfono de contacto *</label>
          <Field name="contactPhone" v-model="formData.contactPhone" />
          <span class="error" v-if="errors.contactPhone">{{ errors.contactPhone }}</span>
        </div>

        <div class="form-group">
          <label for="deliveryInstructions">Instrucciones de entrega (opcional)</label>
          <Field 
            name="deliveryInstructions" 
            as="textarea" 
            v-model="formData.deliveryInstructions"
            maxlength="200"
          />
          <span class="char-count">{{ formData.deliveryInstructions.length }}/200</span>
          <span class="error" v-if="errors.deliveryInstructions">{{ errors.deliveryInstructions }}</span>
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
import { ref } from 'vue'
import { Form, Field } from 'vee-validate'
import { shippingSchema } from '@/composables/useValidationSchemas'
import { validatePostalCode } from '@/services/validationService'
import type { ShippingData } from '@/types/checkout'

const formData = ref<ShippingData>({
  sameAsBilling: true,
  recipientName: '',
  shippingAddress: '',
  postalCode: '',
  city: '',
  province: '',
  country: 'España',
  contactPhone: '',
  deliveryInstructions: ''
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

const onSubmit = (values: ShippingData) => {
  emit('next', values)
}

const onPrevious = () => {
  emit('previous')
}

const emit = defineEmits<{
  next: [data: ShippingData]
  previous: []
  saveDraft: []
  'validation-error': [errors: string[]]
}>()

const handleSaveDraft = () => {
  emit('saveDraft')
}
</script>

<style scoped>
.shipping-form {
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

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 12px;
  transition: all 0.3s;
}

.checkbox-label:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
}

.checkbox-label input[type="checkbox"] {
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

textarea {
  resize: vertical;
  min-height: 90px;
}

input:disabled {
  background-color: #edf2f7;
  cursor: not-allowed;
  opacity: 0.7;
}

input:focus,
select:focus,
textarea:focus {
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

.char-count {
  display: block;
  font-size: 0.85rem;
  color: #718096;
  margin-top: 0.4rem;
  text-align: right;
  font-weight: 500;
}

.shipping-fields {
  animation: slideIn 0.4s ease-out;
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

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
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
</style>
