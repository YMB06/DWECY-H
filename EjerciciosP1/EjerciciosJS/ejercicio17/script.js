

function ordenarNumeros() {
  let numeros = [34, 7, 23, 32, 5, 62];
  numeros.sort((a, b) => a - b);
  console.log("Números ordenados:", numeros);
  return numeros;
}

function ordenarNumerosUI() {
  const input = document.getElementById('nums');
  const resultado = document.getElementById('resultado');
  if (!input || !resultado) return;

  const raw = input.value || '';
  const arr = raw.split(',').map(s => s.trim()).filter(s => s !== '').map(Number);

  if (arr.length === 0 || arr.some(n => Number.isNaN(n))) {
    resultado.textContent = 'Por favor introduce una lista válida de números separados por comas.';
    return;
  }

  const ordenados = [...arr].sort((a, b) => a - b);
  resultado.textContent = `Números ordenados: [${ordenados.join(', ')}]`;
  console.log("Números ordenados:", ordenados);
}