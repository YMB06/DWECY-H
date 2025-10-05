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

/* Exercise functions */
function sumarDesdeInputs(){
  const a = Number(document.getElementById('a').value);
  const b = Number(document.getElementById('b').value);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    const el = document.getElementById('resultado');
    if(el) el.textContent = 'Introduce dos números válidos.';
    console.error('Entradas no válidas', a, b);
    return;
  }
  const suma = a + b;
  console.log('Suma:', suma);
  const el = document.getElementById('resultado');
  if(el) el.textContent = `Resultado: ${suma}`;
}
function mostrarVariables() {
     let num1 = 0;
    let num2 = 0;
    let resultado = 0;
    let nombre;
    let apellidos;
    let edad;

    num1 = parseInt(prompt("Dame un número"));
    num2 = parseInt(prompt("Dame otro número"));
    resultado = num1 + num2;
    console.log("Resultado: " + resultado);
    //datos de un usuario
    nombre = prompt("bao, dame un nombre");
    apellidos = prompt("bao, apellidos");
    edad = parseInt(prompt("BRO tu edad"));
    console.log("Tu nombre eh" + nombre + " " + apellidos + " y tebes " + edad + " años");
}