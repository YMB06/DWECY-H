<template>
  <div class="order-summary">
    <h3>Resumen del Pedido</h3>
    
    <div class="cart-items">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" />
        <div class="item-details">
          <h4>{{ item.name }}</h4>
          <p>Cantidad: {{ item.quantity }}</p>
          <span class="price">{{ formatPrice(item.price * item.quantity) }}</span>
        </div>
      </div>
    </div>

    <div class="summary-section">
      <div class="summary-line">
        <span>Subtotal:</span>
        <span>{{ formatPrice(subtotal) }}</span>
      </div>
      
      <div class="summary-line">
        <span>Gastos de envío:</span>
        <span>{{ formatPrice(shippingCost) }}</span>
      </div>
      
      <div v-if="discount > 0" class="summary-line discount">
        <span>Descuento ({{ discount }}%):</span>
        <span>-{{ formatPrice(discountAmount) }}</span>
      </div>
      
      <div class="summary-line total">
        <span>Total:</span>
        <span>{{ formatPrice(total) }}</span>
      </div>
    </div>

    <div v-if="estimatedDelivery" class="delivery-info">
      <div class="delivery-icon">🚚</div>
      <div>
        <p><strong>Entrega estimada:</strong></p>
        <p>{{ estimatedDelivery }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCheckout } from '@/composables/useCheckout'

const props = defineProps<{
  discount?: number
}>()

const { shippingData } = useCheckout()

const cartItems = [
  { id: 1, name: 'Producto Premium', price: 99.99, quantity: 2, image: '/api/placeholder/60/60' },
  { id: 2, name: 'Accesorio Deluxe', price: 29.99, quantity: 1, image: '/api/placeholder/60/60' }
]

const subtotal = computed(() => 
  cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
)

const shippingCost = computed(() => {
  if (!shippingData.value.postalCode) return 5.99
  
  const code = shippingData.value.postalCode
  if (code.startsWith('28') || code.startsWith('08')) return 3.99 // Madrid/Barcelona
  if (code.startsWith('35') || code.startsWith('38')) return 12.99 // Canarias
  return 5.99 // Resto de España
})

const discountAmount = computed(() => 
  props.discount ? (subtotal.value * props.discount) / 100 : 0
)

const total = computed(() => 
  subtotal.value + shippingCost.value - discountAmount.value
)

const estimatedDelivery = computed(() => {
  if (!shippingData.value.postalCode) return null
  
  const code = shippingData.value.postalCode
  const today = new Date()
  let deliveryDays = 3
  
  if (code.startsWith('28') || code.startsWith('08')) deliveryDays = 1
  else if (code.startsWith('35') || code.startsWith('38')) deliveryDays = 5
  
  const deliveryDate = new Date(today)
  deliveryDate.setDate(today.getDate() + deliveryDays)
  
  return deliveryDate.toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
})

const formatPrice = (price: number) => `${price.toFixed(2)}€`
</script>

<style scoped>
.order-summary {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 2rem;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
}

h3 {
  margin-bottom: 1.5rem;
  color: #2d3748;
  font-size: 1.3rem;
  font-weight: 700;
}

.cart-items {
  margin-bottom: 1.5rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.cart-item img {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  background: #f7fafc;
}

.item-details h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #2d3748;
}

.item-details p {
  font-size: 0.8rem;
  color: #718096;
  margin-bottom: 0.3rem;
}

.price {
  font-weight: 700;
  color: #667eea;
}

.summary-section {
  border-top: 2px solid #e2e8f0;
  padding-top: 1rem;
  margin-bottom: 1.5rem;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
}

.summary-line.discount {
  color: #48bb78;
  font-weight: 600;
}

.summary-line.total {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2d3748;
  border-top: 2px solid #e2e8f0;
  padding-top: 0.8rem;
  margin-top: 1rem;
}

.delivery-info {
  display: flex;
  gap: 1rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid rgba(102, 126, 234, 0.2);
}

.delivery-icon {
  font-size: 1.5rem;
}

.delivery-info p {
  margin: 0.2rem 0;
  font-size: 0.85rem;
  color: #4a5568;
}
</style>