function mostrarVariables() {
     let num1 = 0;
    let num2 = 0;
    let resultado = 0;
    let nombre;
    let apellidos;
    let edad;

    num1 = parseInt(prompt("Dame un número"));
    num2 = parseInt(prompt("Dame otro número"));
    resultado = num1 + num2;
    console.log("Resultado: " + resultado);
    //datos de un usuario
    nombre = prompt("bao, dame un nombre");
    apellidos = prompt("bao, apellidos");
    edad = parseInt(prompt("BRO tu edad"));
    console.log("Tu nombre eh" + nombre + " " + apellidos + " y tebes " + edad + " años");
}