interface DiscountCodeData {
  code: string
  discount: number
}

const validCodes: Record<string, number> = {
  'BIENVENIDO10': 10,
  'VERANO20': 20,
  'VIP30': 30
}

export async function validateDiscountCode(code: string): Promise<DiscountCodeData | null> {
  await new Promise(resolve => setTimeout(resolve, 800))

  const discount = validCodes[code.toUpperCase()]
  if (discount) {
    return { code: code.toUpperCase(), discount }
  }

  return null
}
