import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CheckoutWizard from '@/components/checkout/CheckoutWizard.vue'

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('Checkout Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  describe('Complete Valid Flow', () => {
    it('should complete entire checkout process', async () => {
      const wrapper = mount(CheckoutWizard)
      
      // Step 1: Valid billing data
      const step1 = wrapper.findComponent({ name: 'Step1Billing' })
      await step1.vm.$emit('next', {
        fullName: 'Juan Pérez',
        nif: '12345678Z',
        email: 'juan@example.com',
        phone: '612345678',
        address: 'Calle Mayor 123',
        postalCode: '28001',
        city: 'Madrid',
        province: 'Madrid',
        country: 'España'
      })
      
      expect(wrapper.vm.currentStep).toBe(2)
      
      // Step 2: Valid shipping data
      const step2 = wrapper.findComponent({ name: 'Step2Shipping' })
      await step2.vm.$emit('next', {
        sameAsBilling: false,
        recipientName: 'María García',
        shippingAddress: 'Avenida Principal 456',
        postalCode: '08001',
        city: 'Barcelona',
        province: 'Barcelona',
        country: 'España',
        contactPhone: '687654321',
        deliveryInstructions: 'Llamar al timbre'
      })
      
      expect(wrapper.vm.currentStep).toBe(3)
      
      // Step 3: Valid payment data with discount
      const step3 = wrapper.findComponent({ name: 'Step3Payment' })
      await step3.vm.$emit('discount-applied', 10)
      await step3.vm.$emit('next', {
        method: 'card',
        cardNumber: '4111 1111 1111 1111',
        cardHolder: 'JUAN PEREZ',
        expiryDate: '12/25',
        cvv: '123',
        discountApplied: 10
      })
      
      expect(wrapper.vm.currentStep).toBe(4)
      expect(wrapper.vm.appliedDiscount).toBe(10)
      
      // Step 4: Confirm order
      const step4 = wrapper.findComponent({ name: 'Step4Summary' })
      await step4.vm.$emit('confirm', {
        acceptTerms: true,
        acceptPrivacy: true,
        acceptNewsletter: false
      })
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('checkout-draft')
    })
  })

  describe('Error Handling Flow', () => {
    it('should handle validation errors and prevent navigation', async () => {
      const wrapper = mount(CheckoutWizard)
      
      // Try to proceed with invalid data
      const step1 = wrapper.findComponent({ name: 'Step1Billing' })
      await step1.vm.$emit('validation-error', [
        'El nombre es obligatorio',
        'El email es obligatorio'
      ])
      
      // Should stay on step 1
      expect(wrapper.vm.currentStep).toBe(1)
      
      // Should show error summary
      expect(wrapper.vm.errorSummary).toEqual([
        'El nombre es obligatorio',
        'El email es obligatorio'
      ])
      
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.error-summary').exists()).toBe(true)
    })

    it('should clear errors when valid data is submitted', async () => {
      const wrapper = mount(CheckoutWizard)
      
      // First show errors
      const step1 = wrapper.findComponent({ name: 'Step1Billing' })
      await step1.vm.$emit('validation-error', ['Error'])
      
      expect(wrapper.vm.errorSummary.length).toBe(1)
      
      // Then submit valid data
      await step1.vm.$emit('next', {
        fullName: 'Juan Pérez',
        nif: '12345678Z',
        email: 'juan@example.com',
        phone: '612345678',
        address: 'Calle Mayor 123',
        postalCode: '28001',
        city: 'Madrid',
        province: 'Madrid',
        country: 'España'
      })
      
      expect(wrapper.vm.errorSummary.length).toBe(0)
      expect(wrapper.vm.currentStep).toBe(2)
    })
  })

  describe('Persistence Tests', () => {
    it('should auto-save data changes', async () => {
      const wrapper = mount(CheckoutWizard)
      
      // Simulate data change
      wrapper.vm.billingData.fullName = 'Juan Pérez'
      
      await wrapper.vm.$nextTick()
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'checkout-draft',
        expect.stringContaining('Juan Pérez')
      )
    })

    it('should restore data from localStorage', () => {
      const savedData = {
        currentStep: 2,
        billing: { fullName: 'Juan Pérez', email: 'juan@example.com' },
        shipping: { sameAsBilling: false },
        payment: { method: 'card' },
        appliedDiscount: 15,
        timestamp: Date.now()
      }
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedData))
      window.confirm = vi.fn().mockReturnValue(true)
      
      const wrapper = mount(CheckoutWizard)
      
      expect(wrapper.vm.currentStep).toBe(2)
      expect(wrapper.vm.billingData.fullName).toBe('Juan Pérez')
      expect(wrapper.vm.appliedDiscount).toBe(15)
    })
  })

  describe('Discount Application Tests', () => {
    it('should apply discount and update total calculation', async () => {
      const wrapper = mount(CheckoutWizard)
      
      // Navigate to payment step
      wrapper.vm.currentStep = 3
      await wrapper.vm.$nextTick()
      
      // Apply discount
      const step3 = wrapper.findComponent({ name: 'Step3Payment' })
      await step3.vm.$emit('discount-applied', 20)
      
      expect(wrapper.vm.appliedDiscount).toBe(20)
      
      // Verify OrderSummary receives the discount
      const orderSummary = wrapper.findComponent({ name: 'OrderSummary' })
      expect(orderSummary.props('discount')).toBe(20)
    })

    it('should persist discount in localStorage', async () => {
      const wrapper = mount(CheckoutWizard)
      
      wrapper.vm.currentStep = 3
      await wrapper.vm.$nextTick()
      
      const step3 = wrapper.findComponent({ name: 'Step3Payment' })
      await step3.vm.$emit('discount-applied', 25)
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'checkout-draft',
        expect.stringContaining('"appliedDiscount":25')
      )
    })
  })
})