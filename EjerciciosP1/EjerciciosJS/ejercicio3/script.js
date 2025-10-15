

function mostrarPersona(){
  const persona = {
    nombre: 'Juan',
    edad: 30,
    activo: true,
    intereses: ['futbol','programacion'],
    contacto: { email: 'juan@example.com', telefono: '123456789' }
  };
  console.log('Persona:', persona);
  console.table(persona);
  const out = document.getElementById('resultado');
  if(out) out.textContent = 'Persona mostrada en consola.';
}
window.mostrarPersona = mostrarPersona;

let persona = [{ nombre: 'Youssef', edad: 23, email: 'youssef@gmail.com' },
{ nombre: 'Ana', edad: 22, email: 'ana@gmail.com' },
{ nombre: 'Luis', edad: 21, email: 'luis@gmail.com' }];
let coche = [{ marca: 'Toyota', modelo: 'Corolla', color: 'Rojo' },
{ marca: 'Honda', modelo: 'Civic', color: 'Azul' },
{ marca: 'Ford', modelo: 'Focus', color: 'Verde' }];

console.log(persona, coche);
console.table(persona);
console.table(coche);