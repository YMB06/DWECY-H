/* Menu toggle (moved from inline) */
(function(){
  const btn = document.getElementById('menuBtn');
  const sidenav = document.getElementById('sidenav');
  function toggleNav(){
    if(!sidenav) return;
    const open = sidenav.classList.toggle('open');
    sidenav.setAttribute('aria-hidden', String(!open));
  }
  if(btn) btn.addEventListener('click', toggleNav);
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && sidenav) sidenav.classList.remove('open'); });
  if(sidenav) sidenav.addEventListener('click', e => { if(e.target.tagName === 'A') sidenav.classList.remove('open'); });
  window.toggleNav = toggleNav;
})();

/* Ejercicio 5: comprobar si un número es par */
function esPar() {
  const num1 = parseInt(document.getElementById('num').value, 10);
  const out = document.getElementById('resultado');
  if (Number.isNaN(num1)) {
    console.error('Entrada no válida');
    if(out) out.textContent = 'Por favor introduce un número válido.';
    return;
  }
  const msg = (num1 % 2 === 0) ? 'El número es PAR.' : 'El número es IMPAR.';
  console.log(msg);
  if(out) out.textContent = msg;
}
