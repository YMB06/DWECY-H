function esPalindromo(palabra) {
    let palabraInvertida = palabra.split('').reverse().join('');
    return palabra === palabraInvertida;
}
let palabra = prompt("Ingresa una palabra:");
if (esPalindromo(palabra)) {
    console.log(palabra + " es un palíndromo.");
} else {
    console.log(palabra + " no es un palíndromo.");
}