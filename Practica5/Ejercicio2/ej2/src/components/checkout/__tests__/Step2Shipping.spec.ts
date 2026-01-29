import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Step2Shipping from '@/components/checkout/Step2Shipping.vue'

describe('Step2Shipping', () => {
  it('should render checkbox for same billing address', () => {
    const wrapper = mount(Step2Shipping)
    
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Misma dirección que facturación')
  })

  it('should hide shipping fields when sameAsBilling is true', async () => {
    const wrapper = mount(Step2Shipping)
    
    // By default sameAsBilling should be true
    expect(wrapper.find('.shipping-fields').exists()).toBe(false)
  })

  it('should show shipping fields when sameAsBilling is false', async () => {
    const wrapper = mount(Step2Shipping)
    
    // Uncheck the checkbox
    await wrapper.find('input[type="checkbox"]').setValue(false)
    
    expect(wrapper.find('.shipping-fields').exists()).toBe(true)
    expect(wrapper.find('input[name="recipientName"]').exists()).toBe(true)
    expect(wrapper.find('input[name="shippingAddress"]').exists()).toBe(true)
  })

  it('should show character count for delivery instructions', async () => {
    const wrapper = mount(Step2Shipping)
    
    await wrapper.find('input[type="checkbox"]').setValue(false)
    await wrapper.vm.$nextTick()
    
    const textarea = wrapper.find('textarea[name="deliveryInstructions"]')
    expect(textarea.exists()).toBe(true)
    
    await textarea.setValue('Test instructions')
    
    expect(wrapper.find('.char-count').text()).toContain('/200')
  })

  it('should emit previous when previous button is clicked', async () => {
    const wrapper = mount(Step2Shipping)
    
    await wrapper.find('.btn-prev').trigger('click')
    
    expect(wrapper.emitted('previous')).toBeTruthy()
  })

  it('should emit saveDraft when draft button is clicked', async () => {
    const wrapper = mount(Step2Shipping)
    
    await wrapper.find('.btn-draft').trigger('click')
    
    expect(wrapper.emitted('saveDraft')).toBeTruthy()
  })
})