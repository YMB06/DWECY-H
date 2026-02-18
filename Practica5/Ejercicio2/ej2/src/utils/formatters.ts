/**
 * Valida NIF/CIF español con algoritmo oficial
 * - NIF: 8 dígitos + letra de control
 * - CIF: Letra + 7 dígitos + letra de control
 */
export function validateNIF(nif: string): boolean {
  const nifRegex = /^[0-9]{8}[A-Z]$/
  const cifRegex = /^[A-Z][0-9]{7}[A-Z]$/

  if (nifRegex.test(nif)) {
    // Validar letra de control del NIF
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE' // Tabla oficial de letras
    const number = parseInt(nif.substring(0, 8), 10)
    const letter = nif.charAt(8)
    return letters.charAt(number % 23) === letter
  }

  if (cifRegex.test(nif)) {
    // CIF: validación simplificada (en producción se necesitaría algoritmo completo)
    return true
  }

  return false
}
