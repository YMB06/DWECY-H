
// Convierte una cadena a mayúsculas y minúsculas
function convertirMayMin() {
  const input = document.getElementById('texto');
  const resultado = document.getElementById('resultado');
  if (!input || !resultado) return;

  const texto = String(input.value || '');
  if (!texto.trim()) {
    resultado.textContent = 'Por favor introduce un texto.';
    return;
  }

  const may = texto.toUpperCase();
  const min = texto.toLowerCase();

  resultado.innerHTML = `Mayúsculas: <strong>${may}</strong><br/>Minúsculas: <strong>${min}</strong>`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { convertirMayMin };
}
