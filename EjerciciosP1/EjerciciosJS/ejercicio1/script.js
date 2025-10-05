// Declara variables de varios tipos. Muestra el contenido en la consola junto con el tipo de dato.
// En este ejercicio utiliza el console.log, console.error, console.info y el console.debug

let numero = 42;
let texto = "Hola mundo";
let booleano = true;
let objeto = { nombre: "Youssef", edad: 25 };
let array = [1, 2, 3, 4];
let indefinido;
let nulo = null;

console.log("Número:", numero, "| Tipo:", typeof numero);
console.info("Texto:", texto, "| Tipo:", typeof texto);
console.debug("Booleano:", booleano, "| Tipo:", typeof booleano);
console.error("Objeto:", objeto, "| Tipo:", typeof objeto);
console.log("Array:", array, "| Tipo:", typeof array);
console.info("Indefinido:", indefinido, "| Tipo:", typeof indefinido);
console.debug("Nulo:", nulo, "| Tipo:", typeof nulo);


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
  
