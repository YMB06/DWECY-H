import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Step1Billing from '@/components/checkout/Step1Billing.vue'

vi.mock('@/services/validationService', () => ({
  validatePostalCode: vi.fn().mockResolvedValue({
    city: 'Madrid',
    province: 'Madrid'
  })
}))

describe('Step1Billing', () => {
  it('should render all form fields', () => {
    const wrapper = mount(Step1Billing)
    
    expect(wrapper.find('input[name="fullName"]').exists()).toBe(true)
    expect(wrapper.find('input[name="nif"]').exists()).toBe(true)
    expect(wrapper.find('input[name="email"]').exists()).toBe(true)
    expect(wrapper.find('input[name="phone"]').exists()).toBe(true)
    expect(wrapper.find('input[name="address"]').exists()).toBe(true)
    expect(wrapper.find('input[name="postalCode"]').exists()).toBe(true)
    expect(wrapper.find('select[name="country"]').exists()).toBe(true)
  })

  it('should show tooltips for complex fields', () => {
    const wrapper = mount(Step1Billing)
    
    const tooltips = wrapper.findAll('.tooltip')
    expect(tooltips.length).toBeGreaterThan(0)
  })

  it('should emit validation-error on invalid submission', async () => {
    const wrapper = mount(Step1Billing)
    
    await wrapper.find('.btn-next').trigger('click')
    
    expect(wrapper.emitted('validation-error')).toBeTruthy()
  })

  it('should emit saveDraft when draft button is clicked', async () => {
    const wrapper = mount(Step1Billing)
    
    await wrapper.find('.btn-draft').trigger('click')
    
    expect(wrapper.emitted('saveDraft')).toBeTruthy()
  })
})