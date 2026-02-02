import { describe, it, expect } from 'vitest'
import { 
  validateField, 
  validateNumberRange, 
  validateNifLetter, 
  validateNieNumber,
  REGEX_PATTERNS 
} from '@/utils/validation'

describe('Validation Utils', () => {
  describe('REGEX_PATTERNS', () => {
    it('should validate nombre completo correctly', () => {
      expect(REGEX_PATTERNS.nombreCompleto.test('Juan Pérez')).toBe(true)
      expect(REGEX_PATTERNS.nombreCompleto.test('María José García')).toBe(true)
      expect(REGEX_PATTERNS.nombreCompleto.test('José')).toBe(true)
      expect(REGEX_PATTERNS.nombreCompleto.test('AB')).toBe(false) // muy corto
      expect(REGEX_PATTERNS.nombreCompleto.test('Juan123')).toBe(false) // números
    })

    it('should validate NIF/NIE format correctly', () => {
      expect(REGEX_PATTERNS.nifNie.test('12345678Z')).toBe(true)
      expect(REGEX_PATTERNS.nifNie.test('X1234567L')).toBe(true)
      expect(REGEX_PATTERNS.nifNie.test('Y1234567X')).toBe(true)
      expect(REGEX_PATTERNS.nifNie.test('Z1234567R')).toBe(true)
      expect(REGEX_PATTERNS.nifNie.test('1234567Z')).toBe(false) // muy corto
      expect(REGEX_PATTERNS.nifNie.test('123456789')).toBe(false) // sin letra
    })

    it('should validate telefono correctly', () => {
      expect(REGEX_PATTERNS.telefono.test('612345678')).toBe(true)
      expect(REGEX_PATTERNS.telefono.test('712345678')).toBe(true)
      expect(REGEX_PATTERNS.telefono.test('912345678')).toBe(true)
      expect(REGEX_PATTERNS.telefono.test('512345678')).toBe(false) // no empieza por 6,7,9
      expect(REGEX_PATTERNS.telefono.test('61234567')).toBe(false) // muy corto
    })

    it('should validate email correctly', () => {
      expect(REGEX_PATTERNS.email.test('test@example.com')).toBe(true)
      expect(REGEX_PATTERNS.email.test('user.name@domain.co.uk')).toBe(true)
      expect(REGEX_PATTERNS.email.test('invalid-email')).toBe(false)
      expect(REGEX_PATTERNS.email.test('test@')).toBe(false)
    })
  })

  describe('validateNifLetter', () => {
    it('should validate correct NIF letters', () => {
      expect(validateNifLetter('12345678Z')).toBe(true)
      expect(validateNifLetter('87654321X')).toBe(true)
    })

    it('should reject incorrect NIF letters', () => {
      expect(validateNifLetter('12345678A')).toBe(false)
      expect(validateNifLetter('87654321B')).toBe(false)
    })

    it('should reject invalid NIF format', () => {
      expect(validateNifLetter('1234567Z')).toBe(false)
      expect(validateNifLetter('X1234567L')).toBe(false)
    })
  })

  describe('validateNieNumber', () => {
    it('should validate correct NIE letters', () => {
      expect(validateNieNumber('X1234567L')).toBe(true)
      expect(validateNieNumber('Y1234567X')).toBe(true)
      expect(validateNieNumber('Z1234567R')).toBe(true)
    })

    it('should reject incorrect NIE letters', () => {
      expect(validateNieNumber('X1234567A')).toBe(false)
      expect(validateNieNumber('Y1234567B')).toBe(false)
    })

    it('should reject invalid NIE format', () => {
      expect(validateNieNumber('12345678Z')).toBe(false)
      expect(validateNieNumber('A1234567L')).toBe(false)
    })
  })

  describe('validateField', () => {
    it('should validate nombreCompleto field', () => {
      const validResult = validateField('nombreCompleto', 'Juan Pérez')
      expect(validResult.isValid).toBe(true)
      expect(validResult.errors).toHaveLength(0)

      const invalidResult = validateField('nombreCompleto', 'AB')
      expect(invalidResult.isValid).toBe(false)
      expect(invalidResult.errors).toHaveLength(1)

      const emptyResult = validateField('nombreCompleto', '')
      expect(emptyResult.isValid).toBe(false)
      expect(emptyResult.errors[0].message).toBe('El nombre es obligatorio')
    })

    it('should validate nifNie field with letter validation', () => {
      const validNifResult = validateField('nifNie', '12345678Z')
      expect(validNifResult.isValid).toBe(true)

      const invalidNifResult = validateField('nifNie', '12345678A')
      expect(invalidNifResult.isValid).toBe(false)
      expect(invalidNifResult.errors[0].message).toBe('Letra de control del NIF incorrecta')

      const validNieResult = validateField('nifNie', 'X1234567L')
      expect(validNieResult.isValid).toBe(true)

      const invalidNieResult = validateField('nifNie', 'X1234567A')
      expect(invalidNieResult.isValid).toBe(false)
      expect(invalidNieResult.errors[0].message).toBe('Letra de control del NIE incorrecta')
    })

    it('should validate telefono field', () => {
      const validResult = validateField('telefono', '612345678')
      expect(validResult.isValid).toBe(true)

      const invalidResult = validateField('telefono', '512345678')
      expect(invalidResult.isValid).toBe(false)
    })

    it('should validate email field', () => {
      const validResult = validateField('email', 'test@example.com')
      expect(validResult.isValid).toBe(true)

      const invalidResult = validateField('email', 'invalid-email')
      expect(invalidResult.isValid).toBe(false)
    })

    it('should validate tipoEvento field', () => {
      const validResult = validateField('tipoEvento', 'Boda')
      expect(validResult.isValid).toBe(true)

      const invalidResult = validateField('tipoEvento', '')
      expect(invalidResult.isValid).toBe(false)
    })

    it('should validate fechaEvento field', () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 10)
      const futureDateString = futureDate.toISOString().split('T')[0]

      const validResult = validateField('fechaEvento', futureDateString)
      expect(validResult.isValid).toBe(true)

      const pastDate = new Date()
      pastDate.setDate(pastDate.getDate() - 1)
      const pastDateString = pastDate.toISOString().split('T')[0]

      const invalidResult = validateField('fechaEvento', pastDateString)
      expect(invalidResult.isValid).toBe(false)
    })

    it('should validate horaInicio field', () => {
      const validResult = validateField('horaInicio', '10:00')
      expect(validResult.isValid).toBe(true)

      const invalidResult = validateField('horaInicio', '06:00')
      expect(invalidResult.isValid).toBe(false)

      const lateResult = validateField('horaInicio', '24:00')
      expect(lateResult.isValid).toBe(false)
    })
  })

  describe('validateNumberRange', () => {
    it('should validate numbers within range', () => {
      const validResult = validateNumberRange(50, 10, 500)
      expect(validResult.isValid).toBe(true)
      expect(validResult.errors).toHaveLength(0)
    })

    it('should reject numbers outside range', () => {
      const tooLowResult = validateNumberRange(5, 10, 500)
      expect(tooLowResult.isValid).toBe(false)
      expect(tooLowResult.errors).toHaveLength(1)

      const tooHighResult = validateNumberRange(600, 10, 500)
      expect(tooHighResult.isValid).toBe(false)
      expect(tooHighResult.errors).toHaveLength(1)
    })

    it('should accept boundary values', () => {
      const minResult = validateNumberRange(10, 10, 500)
      expect(minResult.isValid).toBe(true)

      const maxResult = validateNumberRange(500, 10, 500)
      expect(maxResult.isValid).toBe(true)
    })
  })
})