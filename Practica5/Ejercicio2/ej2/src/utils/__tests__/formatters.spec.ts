import { describe, it, expect } from 'vitest'
import { validateNIF } from '@/utils/formatters'

describe('NIF Validation', () => {
  describe('validateNIF', () => {
    it('should validate correct NIFs', () => {
      expect(validateNIF('12345678Z')).toBe(true)
      expect(validateNIF('87654321X')).toBe(true)
      expect(validateNIF('00000000T')).toBe(true)
    })

    it('should validate correct CIFs', () => {
      expect(validateNIF('A12345674')).toBe(true)
      expect(validateNIF('B98765432')).toBe(true)
      expect(validateNIF('G12345678')).toBe(true)
    })

    it('should reject invalid NIF format', () => {
      expect(validateNIF('123456789')).toBe(false)
      expect(validateNIF('12345678')).toBe(false)
      expect(validateNIF('ABCDEFGHI')).toBe(false)
    })

    it('should reject invalid NIF letter', () => {
      expect(validateNIF('12345678A')).toBe(false)
      expect(validateNIF('12345678B')).toBe(false)
      expect(validateNIF('87654321Y')).toBe(false)
    })

    it('should reject empty or null values', () => {
      expect(validateNIF('')).toBe(false)
      expect(validateNIF('   ')).toBe(false)
    })

    it('should be case sensitive for letters', () => {
      expect(validateNIF('12345678z')).toBe(false)
      expect(validateNIF('a12345674')).toBe(false)
    })
  })
})