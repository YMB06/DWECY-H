function contarPalabras() {
let frase = prompt("Ingresa una frase:");
let palabras = frase.trim().split(/\s+/);
console.log("Número de palabras:", palabras.length);
console.log("Palabras:", palabras);
}
