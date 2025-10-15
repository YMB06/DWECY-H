function contarVocales() {
      const palabra = document.getElementById('palabra').value || '';
      let contador = 0;
      for (let i = 0; i < palabra.length; i++) {
        if ('aeiouAEIOU'.includes(palabra[i])) contador++;
      }
      const msg = `La palabra tiene ${contador} vocal(es).`;
      console.log(msg);
      document.getElementById('resultado').textContent = msg;}

