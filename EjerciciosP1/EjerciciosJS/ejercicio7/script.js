function contarVocales() {
      const palabra = document.getElementById('palabra').value || '';
      let contador = 0;
      for (let i = 0; i < palabra.length; i++) {
        if ('aeiouAEIOU'.includes(palabra[i])) contador++;
      }
      const msg = `La palabra tiene ${contador} vocal(es).`;
      console.log(msg);
      document.getElementById('resultado').textContent = msg;}

/* Menu toggle for ejercicio7 */
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
