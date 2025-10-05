// Script para ejercicio2
// Genera un array de 100 números aleatorios y permite filtrar por rango
(function(){
  'use strict';

  let ej2Array = [];

  function generarArray100(){
    ej2Array = Array.from({length:100}, ()=> Math.floor(Math.random()*100) + 1);
    // Mostrar con console.table (índice y valor)
    console.table(ej2Array.map((v,i)=>({index:i, value:v})));
    const out = document.getElementById('resultado');
    if(out) out.textContent = `Array generado con ${ej2Array.length} elementos. Mira la consola (console.table) para ver todos los valores.`;
    return ej2Array;
  }

  function filtrarRango(){
    const minEl = document.getElementById('min');
    const maxEl = document.getElementById('max');
    const out = document.getElementById('resultado');
    const min = minEl ? Number(minEl.value) : NaN;
    const max = maxEl ? Number(maxEl.value) : NaN;

    if (!ej2Array || ej2Array.length === 0) {
      console.info('Array vacío: generando uno nuevo automáticamente.');
      generarArray100();
    }

    if (Number.isNaN(min) || Number.isNaN(max)){
      const msg = 'Por favor introduce valores numéricos válidos en Min y Max.';
      console.error(msg);
      if(out) out.textContent = msg;
      return [];
    }

    const lo = Math.min(min,max);
    const hi = Math.max(min,max);
    const filtered = ej2Array.filter(v => v >= lo && v <= hi);

    console.table(filtered.map((v,i)=>({index:i, value:v})));
    if(out) out.textContent = `Filtrados ${filtered.length} elemento(s) entre ${lo} y ${hi}. Mira la consola (console.table) para la lista.`;
    return filtered;
  }

  // Exponer funciones en el scope global para que los onclick inline funcionen
  window.generarArray100 = generarArray100;
  window.filtrarRango = filtrarRango;

})();
let numero = [];
for ( let i = 0; i < 100; i++) {
numero[i] = Math.floor(Math.random() * 10000 + 1);
}
console.table(numero);

//n es cada uno de los elementos del array
console.table(numero.filter( n => n >= 3000 && n <= 6000 ));
