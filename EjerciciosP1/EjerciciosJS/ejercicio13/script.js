

function contarPalabras() {
  const input = document.getElementById('frase');
  const resultado = document.getElementById('resultado');
  if (!input || !resultado) return;

  const frase = input.value || '';
  if (!frase.trim()) {
    resultado.textContent = 'Por favor introduce una frase.';
    return;
  }

  const palabras = frase.trim().split(/\s+/);
  resultado.textContent = `Número de palabras: ${palabras.length}\nPalabras: ${palabras.join(', ')}`;
  console.log("Número de palabras:", palabras.length);
  console.log("Palabras:", palabras);
}
