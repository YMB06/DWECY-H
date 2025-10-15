
function esPrimo(num) {
    if (num <= 1) return false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function generarPrimos() {
    const input = document.getElementById('limite');
    const resultado = document.getElementById('resultado');
    if (!input || !resultado) return;

    const limite = parseInt(input.value);
    if (Number.isNaN(limite) || limite < 1) {
        resultado.textContent = 'Por favor introduce un número válido mayor que 0.';
        return;
    }

    const primos = [];
    for (let i = 1; i <= limite; i++) {
        if (esPrimo(i)) {
            primos.push(i);
        }
    }

    resultado.textContent = `Números primos entre 1 y ${limite}: [${primos.join(', ')}]`;
    console.log("Números primos entre 1 y " + limite + ":", primos);
}
  




