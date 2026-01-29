<template>
  <div class="summary-form">
    <h2>Resumen del Pedido</h2>

    <!-- Productos del carrito -->
    <section class="summary-section">
      <h3>Productos</h3>
      <div class="product-list">
        <div v-for="product in products" :key="product.id" class="product-item">
          <div class="product-info">
            <span class="product-name">{{ product.name }}</span>
            <span class="product-quantity">x{{ product.quantity }}</span>
          </div>
          <span class="product-price">{{ formatPrice(product.price * product.quantity) }}</span>
        </div>
      </div>
    </section>

    <!-- Datos de facturación -->
    <section class="summary-section">
      <h3>Datos de Facturación</h3>
      <div class="info-grid">
        <div><strong>Nombre:</strong> {{ billing.fullName }}</div>
        <div><strong>NIF:</strong> {{ billing.nif }}</div>
        <div><strong>Email:</strong> {{ billing.email }}</div>
        <div><strong>Teléfono:</strong> {{ billing.phone }}</div>
        <div><strong>Dirección:</strong> {{ billing.address }}</div>
        <div><strong>CP:</strong> {{ billing.postalCode }} - {{ billing.city }}, {{ billing.province }}</div>
      </div>
    </section>

    <!-- Direccion de envio -->
    <section class="summary-section">
      <h3>Dirección de Envío</h3>
      <div v-if="shipping.sameAsBilling" class="info-text">
        Misma dirección que facturación
      </div>
      <div v-else class="info-grid">
        <div><strong>Destinatario:</strong> {{ shipping.recipientName }}</div>
        <div><strong>Dirección:</strong> {{ shipping.shippingAddress }}</div>
        <div><strong>CP:</strong> {{ shipping.postalCode }} - {{ shipping.city }}, {{ shipping.province }}</div>
        <div><strong>Teléfono:</strong> {{ shipping.contactPhone }}</div>
        <div v-if="shipping.deliveryInstructions"><strong>Instrucciones:</strong> {{ shipping.deliveryInstructions }}</div>
      </div>
    </section>

    <!-- Método de pago -->
    <section class="summary-section">
      <h3>Método de Pago</h3>
      <div class="info-grid">
        <div><strong>Método:</strong> {{ getPaymentMethodName(payment.method) }}</div>
        <div v-if="payment.method === 'card'">
          <strong>Tarjeta:</strong> **** **** **** {{ payment.cardNumber?.slice(-4) }}
        </div>
        <div v-if="payment.method === 'paypal'">
          <strong>Email:</strong> {{ payment.paypalEmail }}
        </div>
        <div v-if="payment.method === 'bizum'">
          <strong>Teléfono:</strong> {{ payment.bizumPhone }}
        </div>
      </div>
    </section>

    <!-- Resumen de precio -->
    <section class="summary-section price-summary">
      <div class="price-row">
        <span>Subtotal:</span>
        <span>{{ formatPrice(subtotal) }}</span>
      </div>
      <div class="price-row">
        <span>Gastos de envío:</span>
        <span>{{ formatPrice(shippingCost) }}</span>
      </div>
      <div v-if="discount > 0" class="price-row discount">
        <span>Descuento ({{ discountApplied }}%):</span>
        <span>-{{ formatPrice(discount) }}</span>
      </div>
      <div class="price-row total">
        <span>Total:</span>
        <span>{{ formatPrice(total) }}</span>
      </div>
    </section>

    <!-- Formulario de confirmación -->
    <Form :validation-schema="summarySchema" @submit="onSubmit" v-slot="{ errors }">
      <div class="form-group checkbox-group">
        <label class="checkbox-label">
          <Field name="acceptTerms" type="checkbox" v-model="formData.acceptTerms" />
          He leído y acepto los <a href="#" @click.prevent>términos y condiciones</a> *
        </label>
        <span class="error" v-if="errors.acceptTerms">{{ errors.acceptTerms }}</span>
      </div>

      <div class="form-group checkbox-group">
        <label class="checkbox-label">
          <Field name="acceptPrivacy" type="checkbox" v-model="formData.acceptPrivacy" />
          He leído la <a href="#" @click.prevent>política de privacidad</a> *
        </label>
        <span class="error" v-if="errors.acceptPrivacy">{{ errors.acceptPrivacy }}</span>
      </div>

      <div class="form-group checkbox-group">
        <label class="checkbox-label">
          <Field name="acceptNewsletter" type="checkbox" v-model="formData.acceptNewsletter" />
          Deseo recibir ofertas y novedades
        </label>
      </div>

      <div class="button-group">
        <button type="button" class="btn-prev" @click="onPrevious">Anterior</button>
        <button type="submit" class="btn-confirm">Confirmar Pedido</button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Form, Field } from 'vee-validate'
import { summarySchema } from '@/composables/useValidationSchemas'
import { useCheckout } from '@/composables/useCheckout'

const { billingData, shippingData, paymentData, discountApplied } = useCheckout()

const billing = billingData.value
const shipping = shippingData.value
const payment = paymentData.value

const products = ref([
  { id: 1, name: 'Producto 1', quantity: 2, price: 29.99 },
  { id: 2, name: 'Producto 2', quantity: 1, price: 49.99 },
  { id: 3, name: 'Producto 3', quantity: 3, price: 19.99 }
])

const formData = ref({
  acceptTerms: false,
  acceptPrivacy: false,
  acceptNewsletter: false
})

const subtotal = computed(() => {
  return products.value.reduce((sum, p) => sum + p.price * p.quantity, 0)
})

const shippingCost = computed(() => {
  return subtotal.value > 50 ? 0 : 5.99
})

const discount = computed(() => {
  return (subtotal.value * discountApplied.value) / 100
})

const total = computed(() => {
  return subtotal.value + shippingCost.value - discount.value
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const getPaymentMethodName = (method: string) => {
  const methods: Record<string, string> = {
    card: 'Tarjeta de crédito/débito',
    paypal: 'PayPal',
    transfer: 'Transferencia bancaria',
    bizum: 'Bizum'
  }
  return methods[method] || method
}

const onSubmit = (values: any) => {
  emit('confirm', values)
}

const onPrevious = () => {
  emit('previous')
}

const emit = defineEmits<{
  confirm: [data: any]
  previous: []
}>()
</script>

<style scoped>
.summary-form {
  max-width: 750px;
  margin: 0 auto;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
}

h2 {
  margin-bottom: 2.5rem;
  color: #2d3748;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 1.2rem;
  color: #4a5568;
  font-weight: 700;
  padding-bottom: 0.7rem;
  border-bottom: 3px solid transparent;
  border-image: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-image-slice: 1;
}

.summary-section {
  margin-bottom: 2rem;
  padding: 1.8rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%);
  border-radius: 15px;
  border: 2px solid rgba(102, 126, 234, 0.1);
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.product-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.product-info {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}

.product-name {
  font-weight: 600;
  color: #2d3748;
}

.product-quantity {
  color: #718096;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.3rem 0.7rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
}

.product-price {
  font-weight: 700;
  font-size: 1.1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  font-size: 0.95rem;
}

.info-grid > div {
  padding: 0.9rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  color: #4a5568;
}

.info-text {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  text-align: center;
  color: #718096;
  font-style: italic;
  font-weight: 500;
}

.price-summary {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border: 3px solid #667eea;
}

.price-row {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: #4a5568;
}

.price-row.discount {
  color: #f56565;
  font-weight: 700;
}

.price-row.total {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border-top: 3px solid #667eea;
  margin-top: 0.8rem;
  padding-top: 1.2rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

.checkbox-group {
  padding: 1.3rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: 12px;
  border: 2px solid rgba(102, 126, 234, 0.15);
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: #4a5568;
  font-weight: 500;
}

.checkbox-label input[type="checkbox"] {
  margin-top: 0.25rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #667eea;
}

.checkbox-label a {
  color: #667eea;
  text-decoration: underline;
  font-weight: 600;
}

.error {
  display: block;
  color: #f56565;
  font-size: 0.85rem;
  margin-top: 0.6rem;
  margin-left: 1.8rem;
  font-weight: 600;
}

.button-group {
  display: flex;
  gap: 1.2rem;
  margin-top: 2.5rem;
}

.btn-prev,
.btn-confirm {
  padding: 1.2rem 2.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
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

.btn-confirm {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex: 1;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-confirm:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
}

.btn-confirm:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}
</style>
