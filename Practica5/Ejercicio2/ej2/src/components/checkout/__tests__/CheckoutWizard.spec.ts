import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CheckoutWizard from '@/components/checkout/CheckoutWizard.vue'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock services
vi.mock('@/services/validationService', () => ({
  validatePostalCode: vi.fn().mockResolvedValue({
    city: 'Madrid',
    province: 'Madrid'
  })
}))

vi.mock('@/services/checkoutService', () => ({
  validateDiscountCode: vi.fn().mockResolvedValue({
    code: 'BIENVENIDO10',
    discount: 10
  })
}))

describe('CheckoutWizard Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('should render step indicator', () => {
    const wrapper = mount(CheckoutWizard)
    
    expect(wrapper.findComponent({ name: 'StepIndicator' }).exists()).toBe(true)
  })

  it('should render Step1Billing by default', () => {
    const wrapper = mount(CheckoutWizard)
    
    expect(wrapper.findComponent({ name: 'Step1Billing' }).exists()).toBe(true)
  })

  it('should render OrderSummary sidebar', () => {
    const wrapper = mount(CheckoutWizard)
    
    expect(wrapper.findComponent({ name: 'OrderSummary' }).exists()).toBe(true)
  })

  it('should navigate to next step when next is emitted', async () => {
    const wrapper = mount(CheckoutWizard)
    
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
    
    await wrapper.vm.$nextTick()
    
    expect(wrapper.findComponent({ name: 'Step2Shipping' }).exists()).toBe(true)
  })

  it('should save data to localStorage on navigation', async () => {
    const wrapper = mount(CheckoutWizard)
    
    const step1 = wrapper.findComponent({ name: 'Step1Billing' })
    await step1.vm.$emit('next', {
      fullName: 'Juan Pérez',
      nif: '12345678Z',
      email: 'juan@example.com'
    })
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'checkout-draft',
      expect.stringContaining('Juan Pérez')
    )
  })

  it('should handle validation errors', async () => {
    const wrapper = mount(CheckoutWizard)
    
    const step1 = wrapper.findComponent({ name: 'Step1Billing' })
    await step1.vm.$emit('validation-error', ['Error 1', 'Error 2'])
    
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('.error-summary').exists()).toBe(true)
    expect(wrapper.text()).toContain('Error 1')
    expect(wrapper.text()).toContain('Error 2')
  })

  it('should handle discount application', async () => {
    const wrapper = mount(CheckoutWizard)
    
    // Navigate to payment step
    wrapper.vm.currentStep = 3
    await wrapper.vm.$nextTick()
    
    const step3 = wrapper.findComponent({ name: 'Step3Payment' })
    await step3.vm.$emit('discount-applied', 10)
    
    expect(wrapper.vm.appliedDiscount).toBe(10)
  })

  it('should load draft from localStorage on mount', () => {
    const draftData = {
      currentStep: 2,
      billing: { fullName: 'Juan Pérez' },
      shipping: { sameAsBilling: false },
      payment: { method: 'card' },
      appliedDiscount: 10
    }
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(draftData))
    
    // Mock confirm to return true
    window.confirm = vi.fn().mockReturnValue(true)
    
    const wrapper = mount(CheckoutWizard)
    
    expect(wrapper.vm.currentStep).toBe(2)
    expect(wrapper.vm.appliedDiscount).toBe(10)
  })

  it('should clear localStorage on order confirmation', async () => {
    const wrapper = mount(CheckoutWizard)
    
    // Navigate to summary step
    wrapper.vm.currentStep = 4
    await wrapper.vm.$nextTick()
    
    const step4 = wrapper.findComponent({ name: 'Step4Summary' })
    await step4.vm.$emit('confirm', {})
    
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('checkout-draft')
  })

  it('should auto-save every 30 seconds', () => {
    vi.useFakeTimers()
    
    const wrapper = mount(CheckoutWizard)
    
    // Fast-forward 30 seconds
    vi.advanceTimersByTime(30000)
    
    expect(localStorageMock.setItem).toHaveBeenCalled()
    
    vi.useRealTimers()
  })
})