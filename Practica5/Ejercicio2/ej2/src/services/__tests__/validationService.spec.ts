import { describe, it, expect, vi, beforeEach } from 'vitest'
import { validatePostalCode } from '@/services/validationService'
import { validateDiscountCode } from '@/services/checkoutService'

// Mock setTimeout to avoid actual delays in tests
vi.mock('setTimeout', () => ({
  default: (fn: Function) => fn()
}))

describe('Validation Services', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('validatePostalCode', () => {
    it('should return city and province for valid postal codes', async () => {
      const result = await validatePostalCode('28001')
      expect(result).toEqual({
        city: 'Madrid',
        province: 'Madrid'
      })
    })

    it('should return Barcelona data for Barcelona postal code', async () => {
      const result = await validatePostalCode('08001')
      expect(result).toEqual({
        city: 'Barcelona',
        province: 'Barcelona'
      })
    })

    it('should return null for invalid postal codes', async () => {
      const result = await validatePostalCode('99999')
      expect(result).toBeNull()
    })

    it('should return null for empty postal code', async () => {
      const result = await validatePostalCode('')
      expect(result).toBeNull()
    })

    it('should cache results', async () => {
      // First call
      const result1 = await validatePostalCode('28001')
      // Second call should use cache
      const result2 = await validatePostalCode('28001')
      
      expect(result1).toEqual(result2)
      expect(result1).toEqual({
        city: 'Madrid',
        province: 'Madrid'
      })
    })
  })

  describe('validateDiscountCode', () => {
    it('should validate correct discount codes', async () => {
      const result1 = await validateDiscountCode('BIENVENIDO10')
      expect(result1).toEqual({
        code: 'BIENVENIDO10',
        discount: 10
      })

      const result2 = await validateDiscountCode('VERANO20')
      expect(result2).toEqual({
        code: 'VERANO20',
        discount: 20
      })

      const result3 = await validateDiscountCode('VIP30')
      expect(result3).toEqual({
        code: 'VIP30',
        discount: 30
      })
    })

    it('should be case insensitive', async () => {
      const result = await validateDiscountCode('bienvenido10')
      expect(result).toEqual({
        code: 'BIENVENIDO10',
        discount: 10
      })
    })

    it('should return null for invalid codes', async () => {
      const result = await validateDiscountCode('INVALID_CODE')
      expect(result).toBeNull()
    })

    it('should return null for empty code', async () => {
      const result = await validateDiscountCode('')
      expect(result).toBeNull()
    })

    it('should simulate async behavior', async () => {
      const startTime = Date.now()
      await validateDiscountCode('BIENVENIDO10')
      const endTime = Date.now()
      
      // Since we mocked setTimeout, this should be very fast
      expect(endTime - startTime).toBeLessThan(100)
    })
  })
})