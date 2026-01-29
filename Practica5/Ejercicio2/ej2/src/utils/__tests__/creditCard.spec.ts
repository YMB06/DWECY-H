import { describe, it, expect } from 'vitest'
import { 
  luhnCheck, 
  detectCardType, 
  formatCardNumber, 
  validateExpiryDate, 
  validateCVV 
} from '@/utils/creditCard'

describe('Credit Card Utils', () => {
  describe('luhnCheck', () => {
    it('should validate correct card numbers', () => {
      expect(luhnCheck('4111111111111111')).toBe(true) // Visa test card
      expect(luhnCheck('5555555555554444')).toBe(true) // Mastercard test card
      expect(luhnCheck('378282246310005')).toBe(true)  // Amex test card
    })

    it('should reject invalid card numbers', () => {
      expect(luhnCheck('4111111111111112')).toBe(false)
      expect(luhnCheck('1234567890123456')).toBe(false)
      expect(luhnCheck('0000000000000000')).toBe(false)
    })

    it('should handle card numbers with spaces', () => {
      expect(luhnCheck('4111 1111 1111 1111')).toBe(true)
      expect(luhnCheck('5555 5555 5555 4444')).toBe(true)
    })
  })

  describe('detectCardType', () => {
    it('should detect Visa cards', () => {
      expect(detectCardType('4111111111111111')).toBe('Visa')
      expect(detectCardType('4000000000000000')).toBe('Visa')
    })

    it('should detect Mastercard cards', () => {
      expect(detectCardType('5555555555554444')).toBe('Mastercard')
      expect(detectCardType('5100000000000000')).toBe('Mastercard')
    })

    it('should detect Amex cards', () => {
      expect(detectCardType('378282246310005')).toBe('Amex')
      expect(detectCardType('371449635398431')).toBe('Amex')
    })

    it('should return Unknown for unrecognized cards', () => {
      expect(detectCardType('1234567890123456')).toBe('Unknown')
      expect(detectCardType('9999999999999999')).toBe('Unknown')
    })
  })

  describe('formatCardNumber', () => {
    it('should format card number with spaces', () => {
      expect(formatCardNumber('4111111111111111')).toBe('4111 1111 1111 1111')
      expect(formatCardNumber('123456789012')).toBe('1234 5678 9012')
    })

    it('should remove non-digit characters', () => {
      expect(formatCardNumber('4111-1111-1111-1111')).toBe('4111 1111 1111 1111')
      expect(formatCardNumber('4111 1111 1111 1111')).toBe('4111 1111 1111 1111')
    })
  })

  describe('validateExpiryDate', () => {
    it('should validate future dates', () => {
      const futureYear = new Date().getFullYear() + 2
      const futureYearShort = futureYear.toString().slice(-2)
      expect(validateExpiryDate(`12/${futureYearShort}`)).toBe(true)
    })

    it('should reject past dates', () => {
      expect(validateExpiryDate('12/20')).toBe(false)
      expect(validateExpiryDate('01/21')).toBe(false)
    })

    it('should reject invalid months', () => {
      const futureYear = new Date().getFullYear() + 1
      const futureYearShort = futureYear.toString().slice(-2)
      expect(validateExpiryDate(`13/${futureYearShort}`)).toBe(false)
      expect(validateExpiryDate(`00/${futureYearShort}`)).toBe(false)
    })

    it('should reject invalid format', () => {
      expect(validateExpiryDate('1225')).toBe(false)
      expect(validateExpiryDate('12-25')).toBe(false)
    })
  })

  describe('validateCVV', () => {
    it('should validate 3-digit CVV for Visa/Mastercard', () => {
      expect(validateCVV('123', '4111111111111111')).toBe(true)
      expect(validateCVV('456', '5555555555554444')).toBe(true)
    })

    it('should validate 4-digit CVV for Amex', () => {
      expect(validateCVV('1234', '378282246310005')).toBe(true)
      expect(validateCVV('5678', '371449635398431')).toBe(true)
    })

    it('should reject wrong CVV length', () => {
      expect(validateCVV('12', '4111111111111111')).toBe(false)
      expect(validateCVV('1234', '4111111111111111')).toBe(false)
      expect(validateCVV('123', '378282246310005')).toBe(false)
    })

    it('should reject non-numeric CVV', () => {
      expect(validateCVV('abc', '4111111111111111')).toBe(false)
      expect(validateCVV('12a', '4111111111111111')).toBe(false)
    })
  })
})