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

function celsiusAFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function convertirTemperatura() {
    const input = document.getElementById('celsius');
    const resultado = document.getElementById('resultado');
    if (!input || !resultado) return;

    const celsius = parseFloat(input.value);
    if (Number.isNaN(celsius)) {
        resultado.textContent = 'Por favor introduce un número válido.';
        return;
    }

    const fahrenheit = celsiusAFahrenheit(celsius);
    const mensaje = `${celsius}°C son ${fahrenheit.toFixed(2)}°F`;
    resultado.textContent = mensaje;
    console.log(mensaje);
}