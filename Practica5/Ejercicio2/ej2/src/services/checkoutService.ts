interface DiscountCodeData {
  code: string
  discount: number
}

// Códigos de descuento válidos (simulados)
const validCodes: Record<string, number> = {
  'BIENVENIDO10': 10,
  'VERANO20': 20,
  'VIP30': 30
}

/**
 * Valida un código de descuento de forma asíncrona
 * @param code - Código de descuento (case insensitive)
 * @returns Datos del código si es válido, null si no existe
 */
export async function validateDiscountCode(code: string): Promise<DiscountCodeData | null> {
  // Simular delay de API (800ms)
  await new Promise(resolve => setTimeout(resolve, 800))

  const discount = validCodes[code.toUpperCase()] // Case insensitive
  if (discount) {
    return { code: code.toUpperCase(), discount }
  }

  return null
}
