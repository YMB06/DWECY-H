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

// Filtra números mayores que un umbral usando filter()
function filterGreater(numbers, threshold) {
  if (!Array.isArray(numbers)) return [];
  return numbers.filter(n => typeof n === 'number' && n > threshold);
}

// Función global para la UI
function filtrarMayores() {
  const input = document.getElementById('nums');
  const valorInput = document.getElementById('valor');
  const resultado = document.getElementById('resultado');
  if (!input || !valorInput || !resultado) return;

  const raw = input.value || '';
  const arr = raw.split(',').map(s => s.trim()).filter(s => s !== '').map(Number);
  const threshold = Number(valorInput.value);

  if (arr.length === 0 || Number.isNaN(threshold) || arr.some(n => Number.isNaN(n))) {
    resultado.textContent = 'Introduce una lista válida de números y un valor límite válido.';
    return;
  }

  const filtrados = filterGreater(arr, threshold);
  resultado.textContent = `Números mayores que ${threshold}: [${filtrados.join(', ')}]`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { filterGreater, filtrarMayores };
}
