/**
 * Valida números de tarjeta usando el algoritmo de Luhn
 * Este algoritmo es el estándar de la industria para validar tarjetas de crédito
 * @param cardNumber - Número de tarjeta (puede incluir espacios)
 * @returns true si la tarjeta es válida según Luhn
 */
export function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\s/g, '') // Eliminar espacios
  let sum = 0
  let isEven = false

  // Recorrer dígitos de derecha a izquierda
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9 // Si es mayor que 9, restar 9
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0 // Válido si la suma es múltiplo de 10
}

/**
 * Detecta el tipo de tarjeta basándose en los primeros dígitos
 * - Visa: Empieza con 4
 * - Mastercard: Empieza con 51-55
 * - Amex: Empieza con 34 o 37
 */
export function detectCardType(cardNumber: string): string {
  const digits = cardNumber.replace(/\s/g, '')

  if (/^4/.test(digits)) return 'Visa'
  if (/^5[1-5]/.test(digits)) return 'Mastercard'
  if (/^3[47]/.test(digits)) return 'Amex'

  return 'Unknown'
}

/**
 * Formatea el número de tarjeta añadiendo espacios cada 4 dígitos
 * Ejemplo: "1234567890123456" -> "1234 5678 9012 3456"
 */
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '') // Solo dígitos
  const groups = digits.match(/.{1,4}/g) // Grupos de 4
  return groups ? groups.join(' ') : digits
}

/**
 * Valida que la fecha de expiración sea futura
 * @param expiryDate - Fecha en formato MM/YY
 */
export function validateExpiryDate(expiryDate: string): boolean {
  const [month, year] = expiryDate.split('/')
  if (!month || !year) return false

  const monthNum = parseInt(month, 10)
  const yearNum = parseInt('20' + year, 10)

  if (monthNum < 1 || monthNum > 12) return false

  const now = new Date()
  const expiry = new Date(yearNum, monthNum - 1)

  return expiry > now
}

/**
 * Valida el CVV según el tipo de tarjeta
 * - Visa/Mastercard: 3 dígitos
 * - American Express: 4 dígitos
 */
export function validateCVV(cvv: string, cardNumber: string): boolean {
  const cardType = detectCardType(cardNumber)
  
  if (cardType === 'Amex') {
    return /^[0-9]{4}$/.test(cvv)
  }
  
  return /^[0-9]{3}$/.test(cvv)
}

export function getRequiredCVVLength(cardNumber: string): number {
  const cardType = detectCardType(cardNumber)
  return cardType === 'Amex' ? 4 : 3
}
