// Encontrar la palabra más larga en una frase usando split() y un bucle
function longestWord(frase) {
	if (typeof frase !== 'string') return '';

	// Normalizar espacios y dividir
	const palabras = frase.trim().split(/\s+/);
	let masLarga = '';

	for (let i = 0; i < palabras.length; i++) {
		const palabra = palabras[i];
		if (palabra.length > masLarga.length) {
			masLarga = palabra;
		}
	}

	return masLarga;
}

// Función global pedida por el enunciado y consistente con ejercicios previos
function encontrarPalabraMasLarga() {
	const input = document.getElementById('frase');
	const resultado = document.getElementById('resultado');
	if (!input || !resultado) return;

	const frase = input.value || '';
	const palabra = longestWord(frase);

	if (palabra) {
		resultado.textContent = `La palabra más larga es: "${palabra}" (${palabra.length} caracteres)`;
	} else {
		resultado.textContent = 'No se encontró ninguna palabra.';
	}
}


