import { ref } from 'vue'
import type { BillingData, ShippingData } from '@/types/checkout'
import type { PaymentData } from '@/types/payment'

const billingData = ref<BillingData>({
  fullName: 'Juan Pérez García',
  nif: '12345678Z',
  email: 'juan@example.com',
  phone: '612345678',
  address: 'Calle Mayor 123',
  postalCode: '28001',
  city: 'Madrid',
  province: 'Madrid',
  country: 'España'
})

const shippingData = ref<ShippingData>({
  sameAsBilling: false,
  recipientName: 'María López',
  shippingAddress: 'Avenida Principal 456',
  postalCode: '08001',
  city: 'Barcelona',
  province: 'Barcelona',
  country: 'España',
  contactPhone: '698765432',
  deliveryInstructions: 'Dejar en portería'
})

const paymentData = ref<PaymentData>({
  method: 'card',
  cardNumber: '4532 0151 1283 0366',
  cardHolder: 'JUAN PEREZ',
  expiryDate: '12/25',
  cvv: '123'
})

const discountApplied = ref(20)

export function useCheckout() {
  return {
    billingData,
    shippingData,
    paymentData,
    discountApplied
  }
}
