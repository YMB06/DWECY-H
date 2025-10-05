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

function esPrimo(num) {
    if (num <= 1) return false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function generarPrimos() {
    const input = document.getElementById('limite');
    const resultado = document.getElementById('resultado');
    if (!input || !resultado) return;

    const limite = parseInt(input.value);
    if (Number.isNaN(limite) || limite < 1) {
        resultado.textContent = 'Por favor introduce un número válido mayor que 0.';
        return;
    }

    const primos = [];
    for (let i = 1; i <= limite; i++) {
        if (esPrimo(i)) {
            primos.push(i);
        }
    }

    resultado.textContent = `Números primos entre 1 y ${limite}: [${primos.join(', ')}]`;
    console.log("Números primos entre 1 y " + limite + ":", primos);
}
  




