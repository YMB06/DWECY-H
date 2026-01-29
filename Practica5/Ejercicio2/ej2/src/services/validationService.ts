interface PostalCodeData {
  city: string
  province: string
}

const postalCodeCache = new Map<string, PostalCodeData>()

const postalCodeDatabase: Record<string, PostalCodeData> = {
  '28001': { city: 'Madrid', province: 'Madrid' },
  '08001': { city: 'Barcelona', province: 'Barcelona' },
  '41001': { city: 'Sevilla', province: 'Sevilla' },
  '46001': { city: 'Valencia', province: 'Valencia' }
}

export async function validatePostalCode(code: string): Promise<PostalCodeData | null> {
  if (postalCodeCache.has(code)) {
    return postalCodeCache.get(code)!
  }

  await new Promise(resolve => setTimeout(resolve, 500))

  const data = postalCodeDatabase[code] || null
  if (data) {
    postalCodeCache.set(code, data)
  }
  return data
}
