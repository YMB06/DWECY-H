// Menu toggle functionality
(function(){
  const btn = document.getElementById('menuBtn');
  const sidenav = document.getElementById('sidenav');
  function toggleNav(){
    const open = sidenav.classList.toggle('open');
    sidenav.setAttribute('aria-hidden', String(!open));
  }
  btn && btn.addEventListener('click', toggleNav);
  document.addEventListener('keydown', e => { if(e.key === 'Escape') sidenav.classList.remove('open'); });
  sidenav.addEventListener('click', e => { if(e.target.tagName === 'A') sidenav.classList.remove('open'); });
})();

// Calcula el promedio de un array de números usando reduce()
function average(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return NaN;

  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return sum / numbers.length;
}

// Función global para la UI
function calcularPromedio() {
  const input = document.getElementById('numeros');
  const resultado = document.getElementById('resultado');
  if (!input || !resultado) return;

  const raw = input.value || '';
  // Separar por comas y convertir a número, ignorar entradas vacías
  const arr = raw.split(',').map(s => s.trim()).filter(s => s !== '').map(Number);

  // Validar que todos son números válidos
  if (arr.length === 0 || arr.some(n => Number.isNaN(n))) {
    resultado.textContent = 'Por favor introduce una lista válida de números separados por comas.';
    return;
  }

  const prom = average(arr);
  resultado.textContent = `Promedio: ${prom}`;
}


