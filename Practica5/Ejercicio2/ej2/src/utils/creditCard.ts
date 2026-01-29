export function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\s/g, '')
  let sum = 0
  let isEven = false

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

export function detectCardType(cardNumber: string): string {
  const digits = cardNumber.replace(/\s/g, '')

  if (/^4/.test(digits)) return 'Visa'
  if (/^5[1-5]/.test(digits)) return 'Mastercard'
  if (/^3[47]/.test(digits)) return 'Amex'

  return 'Unknown'
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '')
  const groups = digits.match(/.{1,4}/g)
  return groups ? groups.join(' ') : digits
}

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
