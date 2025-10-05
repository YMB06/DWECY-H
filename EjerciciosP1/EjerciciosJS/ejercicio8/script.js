/* Menu toggle and generarAzar for ejercicio8 */
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

function generarAzar(){
  const min = Number(document.getElementById('min').value) || -5;
  const max = Number(document.getElementById('max').value) || 10;
  const val = Math.floor(Math.random() * (max - min + 1)) + min;
  const out = document.getElementById('resultado');
  if(out) out.textContent = `Resultado: ${val}`;
  console.log('Azar:', val);
}
window.generarAzar = generarAzar;
