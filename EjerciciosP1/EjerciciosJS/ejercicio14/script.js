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

function esPalindromo(palabra) {
    let palabraInvertida = palabra.split('').reverse().join('');
    return palabra === palabraInvertida;
}

function verificarPalindromo() {
  const input = document.getElementById('pal');
  const resultado = document.getElementById('resultado');
  if (!input || !resultado) return;

  const palabra = input.value || '';
  if (!palabra.trim()) {
    resultado.textContent = 'Por favor introduce una palabra.';
    return;
  }

  const esPal = esPalindromo(palabra.toLowerCase());
  const mensaje = esPal ? `"${palabra}" es un palíndromo.` : `"${palabra}" no es un palíndromo.`;
  resultado.textContent = mensaje;
  console.log(mensaje);
}

let palabra = "radar";
if (esPalindromo(palabra)) {
    console.log(palabra + " es un palíndromo.");
} else {
    console.log(palabra + " no es un palíndromo.");
}
  