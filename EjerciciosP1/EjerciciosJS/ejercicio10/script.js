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

function encontrarMaximo() {
  const input = document.getElementById('numeros');
  const resultado = document.getElementById('resultado');
  if (!input || !resultado) return;

  const raw = input.value || '';
  const arr = raw.split(',').map(s => s.trim()).filter(s => s !== '').map(Number);

  if (arr.length === 0 || arr.some(n => Number.isNaN(n))) {
    resultado.textContent = 'Por favor introduce una lista válida de números separados por comas.';
    return;
  }

  const maximo = Math.max(...arr);
  resultado.textContent = `El número más grande es: ${maximo}`;
  console.log("El número más grande es: " + maximo);
}

let numeros = [3, 5, 7, 2, 8, -1, 4];
let maximo = Math.max(...numeros);
console.log("El número más grande es: " + maximo);