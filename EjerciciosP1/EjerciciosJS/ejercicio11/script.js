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

function generar100yContar() {
  let numero = [];
  let contador = new Array(20).fill(0);
  
  for (let i = 0; i < 100; i++) {
    numero[i] = Math.floor(Math.random() * 20) + 1;
    contador[numero[i] - 1]++;
  }
  
  console.table(numero);
  
  let resultado = "Números generados (ver consola)\n\nConteo:\n";
  for (let i = 0; i < contador.length; i++) {
    if (contador[i] > 0) {
      resultado += `Num ${i + 1}: ${contador[i]} veces\n`;
      console.log("Num " + (i + 1) + ": " + contador[i] + " veces");
    }
  }
  
  const output = document.getElementById('resultado');
  if (output) output.textContent = resultado;
}

let numero = [];
let contador = new Array(20).fill(0);
for ( let i = 0; i < 100; i++) {
    numero[i] = Math.floor(Math.random() * 20) + 1;
    contador[numero[i] - 1]++;
}
console.table(numero);

for (let i = 0; i < contador.length; i++) {
    if (contador[i] > 0) {
        console.log("Num " + (i + 1) + ": " + contador[i] + " veces");
    }
}
