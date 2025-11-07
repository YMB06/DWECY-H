<template>
    <div>
        Comprobando entorno... (VEN Y SANA MI DOOOOOOLOOOOOR)
        <button @click="elegirNav()">Seleccionar Navegador</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    // comprueba si estamos en localhost
    const isLocalhost = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1';
    
    // Solo redirigir a HTTPS si NO estamos en localhost
    if (!isLocalhost && window.location.protocol !== 'https:') {
        window.location.href = window.location.href.replace('http://', 'https://');
        return;
    }
    
    // Detectar navegador (funciona tanto en HTTP como HTTPS)
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Firefox')) {
        console.log('Navegador Firefox detectado');
    } else if (userAgent.includes('Chrome')) {
        console.log('Navegador Chrome detectado');
    } else if (userAgent.includes('Safari')) {
        console.log('Navegador Safari detectado');
    } else {
        console.log('Navegador desconocido');
    }
})

//seleccionar navegador
/*Seleccionar navegador. Crear una función llamada selectNav() que detecte el navegador
que tenemos y dependiendo de este, cargue una página llamada firefox.html o chrome.html.
*/
function elegirNav() {
    if (navigator.userAgent.includes('Firefox')) {
        window.location.href = 'firefox.html';
    } else if (navigator.userAgent.includes('Chrome')) {
        window.location.href = 'chrome.html';
    } else {
        window.location.href = 'otros.html';
    }
} 


</script>

<style scoped></style>