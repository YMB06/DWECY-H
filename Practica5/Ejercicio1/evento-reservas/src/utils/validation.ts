import type { ValidationResult, ValidationError } from '@/types/reservation'

// Expresiones regulares para validación
export const REGEX_PATTERNS = {
  nombreCompleto: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/,
  nifNie: /^[0-9]{8}[A-Z]$|^[XYZ][0-9]{7}[A-Z]$/,
  telefono: /^[679][0-9]{8}$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  comentarios: /^[\s\S]{0,500}$/
}

// Letras de control para validación de NIF
const NIF_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE'

export function validateNifLetter(nif: string): boolean {
  if (!/^[0-9]{8}[A-Z]$/.test(nif)) return false
  const number = parseInt(nif.substring(0, 8))
  const letter = nif.charAt(8)
  return NIF_LETTERS.charAt(number % 23) === letter
}

export function validateNieNumber(nie: string): boolean {
  if (!/^[XYZ][0-9]{7}[A-Z]$/.test(nie)) return false
  const prefix = nie.charAt(0)
  const number = nie.substring(1, 8)
  const letter = nie.charAt(8)
  
  let nieNumber = ''
  switch (prefix) {
    case 'X': nieNumber = '0' + number; break
    case 'Y': nieNumber = '1' + number; break
    case 'Z': nieNumber = '2' + number; break
  }
  
  return NIF_LETTERS.charAt(parseInt(nieNumber) % 23) === letter
}

export function validateField(field: string, value: string): ValidationResult {
  const errors: ValidationError[] = []
  
  switch (field) {
    case 'nombreCompleto':
      if (!value.trim()) {
        errors.push({ field, message: 'El nombre es obligatorio' })
      } else if (!REGEX_PATTERNS.nombreCompleto.test(value)) {
        errors.push({ field, message: 'Solo letras, espacios y tildes (3-50 caracteres)' })
      }
      break
      
    case 'nifNie':
      if (!value.trim()) {
        errors.push({ field, message: 'El NIF/NIE es obligatorio' })
      } else if (!REGEX_PATTERNS.nifNie.test(value)) {
        errors.push({ field, message: 'Formato NIF/NIE inválido' })
      } else if (value.match(/^[0-9]{8}[A-Z]$/) && !validateNifLetter(value)) {
        errors.push({ field, message: 'Letra de control del NIF incorrecta' })
      } else if (value.match(/^[XYZ][0-9]{7}[A-Z]$/) && !validateNieNumber(value)) {
        errors.push({ field, message: 'Letra de control del NIE incorrecta' })
      }
      break
      
    case 'telefono':
      if (!value.trim()) {
        errors.push({ field, message: 'El teléfono es obligatorio' })
      } else if (!REGEX_PATTERNS.telefono.test(value)) {
        errors.push({ field, message: 'Formato de teléfono inválido (9 dígitos, empezando por 6, 7 o 9)' })
      }
      break
      
    case 'email':
      if (!value.trim()) {
        errors.push({ field, message: 'El email es obligatorio' })
      } else if (!REGEX_PATTERNS.email.test(value)) {
        errors.push({ field, message: 'Formato de email inválido' })
      }
      break
      
    case 'tipoEvento':
      if (!value) {
        errors.push({ field, message: 'Debe seleccionar un tipo de evento' })
      }
      break
      
    case 'fechaEvento':
      if (!value) {
        errors.push({ field, message: 'La fecha del evento es obligatoria' })
      } else {
        const selectedDate = new Date(value)
        const today = new Date()
        const minDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
        const maxDate = new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000)
        
        if (selectedDate < minDate) {
          errors.push({ field, message: 'La fecha debe ser al menos 7 días desde hoy' })
        } else if (selectedDate > maxDate) {
          errors.push({ field, message: 'La fecha no puede ser más de 1 año desde hoy' })
        }
      }
      break
      
    case 'horaInicio':
      if (!value) {
        errors.push({ field, message: 'La hora de inicio es obligatoria' })
      } else {
        const [hours] = value.split(':').map(Number)
        if (hours < 8 || hours > 23) {
          errors.push({ field, message: 'La hora debe estar entre 08:00 y 23:00' })
        }
      }
      break
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateNumberRange(value: number, min: number, max: number): ValidationResult {
  const errors: ValidationError[] = []
  
  if (value < min || value > max) {
    errors.push({ 
      field: 'numeroAsistentes', 
      message: `El número debe estar entre ${min} y ${max}` 
    })
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}