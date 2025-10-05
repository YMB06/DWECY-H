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

// Convierte una cadena a mayúsculas y minúsculas
function convertirMayMin() {
  const input = document.getElementById('texto');
  const resultado = document.getElementById('resultado');
  if (!input || !resultado) return;

  const texto = String(input.value || '');
  if (!texto.trim()) {
    resultado.textContent = 'Por favor introduce un texto.';
    return;
  }

  const may = texto.toUpperCase();
  const min = texto.toLowerCase();

  resultado.innerHTML = `Mayúsculas: <strong>${may}</strong><br/>Minúsculas: <strong>${min}</strong>`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { convertirMayMin };
}
