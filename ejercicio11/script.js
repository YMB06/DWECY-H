

let numero = [];
let contador = new Array(20).fill(0); // Array para contar las apariciones de cada número
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
