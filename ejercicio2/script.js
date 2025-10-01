let numero = [];
for ( let i = 0; i < 100; i++) {
numero[i] = Math.floor(Math.random() * 10000 + 1);
}
console.table(numero);

//n es cada uno de los elementos del array
console.table(numero.filter( n => n >= 3000 && n <= 6000 ));
