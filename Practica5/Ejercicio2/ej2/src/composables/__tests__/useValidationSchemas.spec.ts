import { describe, it, expect } from 'vitest'
import { billingSchema, shippingSchema, paymentSchema, summarySchema } from '@/composables/useValidationSchemas'

describe('Validation Schemas', () => {
  describe('billingSchema', () => {
    it('should validate correct billing data', async () => {
      const validData = {
        fullName: 'Juan Pérez García',
        nif: '12345678Z',
        email: 'juan@example.com',
        phone: '612345678',
        address: 'Calle Mayor 123',
        postalCode: '28001',
        city: 'Madrid',
        province: 'Madrid',
        country: 'España'
      }

      await expect(billingSchema.validate(validData)).resolves.toBeTruthy()
    })

    it('should reject invalid fullName', async () => {
      const invalidData = { fullName: 'AB' }
      await expect(billingSchema.validate(invalidData)).rejects.toThrow('Mínimo 3 caracteres')
    })

    it('should reject invalid NIF format', async () => {
      const invalidData = { nif: '123456789' }
      await expect(billingSchema.validate(invalidData)).rejects.toThrow('Formato inválido')
    })

    it('should reject invalid email', async () => {
      const invalidData = { email: 'invalid-email' }
      await expect(billingSchema.validate(invalidData)).rejects.toThrow('Formato de email inválido')
    })

    it('should reject invalid phone format', async () => {
      const invalidData = { phone: '123456789' }
      await expect(billingSchema.validate(invalidData)).rejects.toThrow('Formato de teléfono español inválido')
    })
  })

  describe('paymentSchema', () => {
    it('should validate card payment method', async () => {
      const validData = {
        method: 'card',
        cardNumber: '4111111111111111',
        cardHolder: 'JUAN PEREZ',
        expiryDate: '12/25',
        cvv: '123'
      }

      await expect(paymentSchema.validate(validData)).resolves.toBeTruthy()
    })

    it('should validate PayPal payment method', async () => {
      const validData = {
        method: 'paypal',
        paypalEmail: 'user@paypal.com'
      }

      await expect(paymentSchema.validate(validData)).resolves.toBeTruthy()
    })
  })

  describe('summarySchema', () => {
    it('should validate when required checkboxes are checked', async () => {
      const validData = {
        acceptTerms: true,
        acceptPrivacy: true,
        acceptNewsletter: false
      }

      await expect(summarySchema.validate(validData)).resolves.toBeTruthy()
    })

    it('should reject when terms are not accepted', async () => {
      const invalidData = {
        acceptTerms: false,
        acceptPrivacy: true
      }

      await expect(summarySchema.validate(invalidData)).rejects.toThrow()
    })
  })
})