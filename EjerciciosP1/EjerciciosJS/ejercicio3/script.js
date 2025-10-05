/* Menu toggle and ejercicio3 functions */
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

function mostrarPersona(){
  const persona = {
    nombre: 'Juan',
    edad: 30,
    activo: true,
    intereses: ['futbol','programacion'],
    contacto: { email: 'juan@example.com', telefono: '123456789' }
  };
  console.log('Persona:', persona);
  console.table(persona);
  const out = document.getElementById('resultado');
  if(out) out.textContent = 'Persona mostrada en consola.';
}
window.mostrarPersona = mostrarPersona;
