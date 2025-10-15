function calcularPromedio() {
  const input = document.getElementById('numeros').value;
  // Convierte el string en array de números
  const numeros = input.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
  if (numeros.length === 0) {
    document.getElementById('resultado').textContent = 'Introduce al menos un número válido.';
    return;
  }
  const suma = numeros.reduce((acc, n) => acc + n, 0);
  const promedio = suma / numeros.length;
  document.getElementById('resultado').textContent = `Promedio: ${promedio}`;
  console.log('Array:', numeros, 'Promedio:', promedio);
}