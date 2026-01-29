export function validateNIF(nif: string): boolean {
  const nifRegex = /^[0-9]{8}[A-Z]$/
  const cifRegex = /^[A-Z][0-9]{7}[A-Z]$/

  if (nifRegex.test(nif)) {
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE'
    const number = parseInt(nif.substring(0, 8), 10)
    const letter = nif.charAt(8)
    return letters.charAt(number % 23) === letter
  }

  if (cifRegex.test(nif)) {
    return true
  }

  return false
}
