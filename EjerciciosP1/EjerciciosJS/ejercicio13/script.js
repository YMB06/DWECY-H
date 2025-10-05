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
