 function cadenaInversa() {
      const palabra = document.getElementById('texto').value || '';
      const palabraInversa = palabra.split('').reverse().join('');
      console.log('La palabra al revés es:', palabraInversa);
      document.getElementById('resultado').textContent = palabraInversa;
    }

