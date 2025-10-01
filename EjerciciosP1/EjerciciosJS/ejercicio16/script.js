

function celsiusAFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}
function convertirTemperatura() {
    let celsius = parseFloat(prompt("Ingresa la temperatura en grados Celsius:"));
    let fahrenheit = celsiusAFahrenheit(celsius);
    console.log(celsius + "°C son " + fahrenheit + "°F.");
}