

function generarAzar(){
  const min = Number(document.getElementById('min').value) || -5;
  const max = Number(document.getElementById('max').value) || 10;
  const val = Math.floor(Math.random() * (max - min + 1)) + min;
  const out = document.getElementById('resultado');
  if(out) out.textContent = `Resultado: ${val}`;
  console.log('Azar:', val);
}
window.generarAzar = generarAzar;
