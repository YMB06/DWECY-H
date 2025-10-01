
function esPrimo(num) {
    if (num <= 1) return false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}
function generarPrimos() {
    let limite = parseInt(prompt("Ingresa un número límite:"));
    console.log("Números primos entre 1 y " + limite + ":");
    for (let i = 1; i <= limite; i++) {
        if (esPrimo(i)) {
            console.log(i);
        }
    }
}




