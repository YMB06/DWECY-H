
function filtrarPares(numeros) {
    return numeros.filter(num => num % 2 === 0);
}

function filtrarParesUI() {
  const input = document.getElementById('numeros');
  const resultado = document.getElementById('resultado');
  if (!input || !resultado) return;

  const raw = input.value || '';
  const arr = raw.split(',').map(s => s.trim()).filter(s => s !== '').map(Number);

  if (arr.length === 0 || arr.some(n => Number.isNaN(n))) {
    resultado.textContent = 
    'Por favor introduce una lista válida de números separados por comas.';
    return;
  }

  const pares = filtrarPares(arr);
  resultado.textContent = `Números pares: [${pares.join(', ')}]`;
  console.log("num pares:", pares);
}

let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let numerosPares = filtrarPares(numeros);
console.log("num pares:", numerosPares);