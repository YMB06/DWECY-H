import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Step3Payment from '@/components/checkout/Step3Payment.vue'

vi.mock('@/services/checkoutService', () => ({
  validateDiscountCode: vi.fn().mockResolvedValue({
    code: 'BIENVENIDO10',
    discount: 10
  })
}))

describe('Step3Payment', () => {
  it('should render payment method options', () => {
    const wrapper = mount(Step3Payment)
    
    expect(wrapper.text()).toContain('Tarjeta de crédito/débito')
    expect(wrapper.text()).toContain('PayPal')
    expect(wrapper.text()).toContain('Transferencia bancaria')
    expect(wrapper.text()).toContain('Bizum')
  })

  it('should show card fields when card method is selected', async () => {
    const wrapper = mount(Step3Payment)
    
    await wrapper.find('input[value="card"]').setValue(true)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('input[name="cardNumber"]').exists()).toBe(true)
    expect(wrapper.find('input[name="cardHolder"]').exists()).toBe(true)
    expect(wrapper.find('input[name="expiryDate"]').exists()).toBe(true)
    expect(wrapper.find('input[name="cvv"]').exists()).toBe(true)
  })

  it('should show PayPal fields when PayPal method is selected', async () => {
    const wrapper = mount(Step3Payment)
    
    await wrapper.find('input[value="paypal"]').setValue(true)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('input[name="paypalEmail"]').exists()).toBe(true)
  })

  it('should show bank info when transfer method is selected', async () => {
    const wrapper = mount(Step3Payment)
    
    await wrapper.find('input[value="transfer"]').setValue(true)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.text()).toContain('Datos bancarios')
    expect(wrapper.find('input[name="transferReference"]').exists()).toBe(true)
  })

  it('should show Bizum fields when Bizum method is selected', async () => {
    const wrapper = mount(Step3Payment)
    
    await wrapper.find('input[value="bizum"]').setValue(true)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('input[name="bizumPhone"]').exists()).toBe(true)
  })

  it('should format card number with spaces', async () => {
    const wrapper = mount(Step3Payment)
    
    await wrapper.find('input[value="card"]').setValue(true)
    await wrapper.vm.$nextTick()
    
    const cardInput = wrapper.find('input[name="cardNumber"]')
    await cardInput.setValue('4111111111111111')
    await cardInput.trigger('input')
    
    expect(wrapper.vm.formData.cardNumber).toBe('4111 1111 1111 1111')
  })

  it('should detect card type', async () => {
    const wrapper = mount(Step3Payment)
    
    await wrapper.find('input[value="card"]').setValue(true)
    await wrapper.vm.$nextTick()
    
    const cardInput = wrapper.find('input[name="cardNumber"]')
    await cardInput.setValue('4111111111111111')
    await cardInput.trigger('input')
    
    expect(wrapper.vm.cardType).toBe('Visa')
  })

  it('should apply discount code', async () => {
    const wrapper = mount(Step3Payment)
    
    const discountInput = wrapper.find('input[type="text"]')
    await discountInput.setValue('BIENVENIDO10')
    
    await wrapper.find('.btn-apply').trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.discountApplied).toBe(true)
    expect(wrapper.vm.appliedDiscount).toBe(10)
  })

  it('should emit previous when previous button is clicked', async () => {
    const wrapper = mount(Step3Payment)
    
    await wrapper.find('.btn-prev').trigger('click')
    
    expect(wrapper.emitted('previous')).toBeTruthy()
  })

  it('should emit discount-applied when discount is applied', async () => {
    const wrapper = mount(Step3Payment)
    
    const discountInput = wrapper.find('input[type="text"]')
    await discountInput.setValue('BIENVENIDO10')
    
    await wrapper.find('.btn-apply').trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted('discount-applied')).toBeTruthy()
    expect(wrapper.emitted('discount-applied')[0][0]).toBe(10)
  })
})