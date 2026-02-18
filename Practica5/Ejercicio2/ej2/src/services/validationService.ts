interface PostalCodeData {
  city: string
  province: string
}

// Caché para evitar validaciones repetidas del mismo código postal
const postalCodeCache = new Map<string, PostalCodeData>()

// Base de datos simulada de códigos postales españoles
const postalCodeDatabase: Record<string, PostalCodeData> = {
  '28001': { city: 'Madrid', province: 'Madrid' },
  '08001': { city: 'Barcelona', province: 'Barcelona' },
  '41001': { city: 'Sevilla', province: 'Sevilla' },
  '46001': { city: 'Valencia', province: 'Valencia' }
}

/**
 * Valida un código postal de forma asíncrona (simula llamada a API)
 * @param code - Código postal de 5 dígitos
 * @returns Datos de ciudad y provincia si es válido, null si no existe
 */
export async function validatePostalCode(code: string): Promise<PostalCodeData | null> {
  // Verificar caché primero
  if (postalCodeCache.has(code)) {
    return postalCodeCache.get(code)!
  }

  // Simular delay de API (500ms)
  await new Promise(resolve => setTimeout(resolve, 500))

  const data = postalCodeDatabase[code] || null
  if (data) {
    postalCodeCache.set(code, data) // Guardar en caché
  }
  return data
}
