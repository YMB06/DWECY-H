

function celsiusAFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function convertirTemperatura() {
    const input = document.getElementById('celsius');
    const resultado = document.getElementById('resultado');
    if (!input || !resultado) return;

    const celsius = parseFloat(input.value);
    if (Number.isNaN(celsius)) {
        resultado.textContent = 'Por favor introduce un número válido.';
        return;
    }

    const fahrenheit = celsiusAFahrenheit(celsius);
    const mensaje = `${celsius}°C son ${fahrenheit.toFixed(2)}°F`;
    resultado.textContent = mensaje;
    console.log(mensaje);
}