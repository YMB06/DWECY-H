// Función para establecer una cookie
function setCookie(nombre, valor, dias) {
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
  const expiracion = "expires=" + fecha.toUTCString();
  document.cookie = `${nombre}=${valor}; ${expiracion}; path=/`;
}

// Función para obtener una cookie
function getCookie(nombre) {
  const nombreEQ = nombre + "=";
  const cookies = document.cookie.split(';');
  for (let c of cookies) {
    c = c.trim();
    if (c.indexOf(nombreEQ) === 0) {
      return c.substring(nombreEQ.length);
    }
  }
  return null;
}

// Comprobar si ya existen cookies
window.onload = function () {
  const marketing = getCookie("marketing");
  const funcionales = getCookie("funcionales");
  const analiticas = getCookie("analiticas");

  if (marketing !== null && funcionales !== null && analiticas !== null) {
    document.getElementById("preferencias").style.display = "none";
    document.getElementById("mensaje").innerText =
      `Tus preferencias ya están guardadas:\n
      Marketing: ${marketing}\n
      Funcionales: ${funcionales}\n
      Analíticas: ${analiticas}`;
  }
};

// Guardar cookies al enviar el formulario
document.getElementById("preferencias").addEventListener("submit", function (e) {
  e.preventDefault();
  const marketing = document.querySelector('input[name="marketing"]').checked;
  const funcionales = document.querySelector('input[name="funcionales"]').checked;
  const analiticas = document.querySelector('input[name="analiticas"]').checked;

  setCookie("marketing", marketing, 30);
  setCookie("funcionales", funcionales, 30);
  setCookie("analiticas", analiticas, 30);

  alert("Preferencias guardadas. Recarga la página para verlas.");
});