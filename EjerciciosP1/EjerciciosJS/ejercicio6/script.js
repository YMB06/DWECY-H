

function esPar() {
  const num1 = parseInt(document.getElementById('num').value, 10);
  const out = document.getElementById('resultado');
  if (Number.isNaN(num1)) {
    if(out) out.textContent = 'Introduce un número válido.';
    console.error('Entrada no válida');
    return;
  }
  const msg = (num1 % 2 === 0) ? 'El número es PAR.' : 'El número es IMPAR.';
  console.log(msg);
  if(out) out.textContent = msg;
}
