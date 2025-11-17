<template>
    <div>
        <button @click="openPopup">Abrir ventana</button>
        <button @click="closePopup">Cerrar ventana</button>
    </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';



const popupWindow: Ref<WindowProxy | null> = ref(null);

function openPopup() {
    // url
    popupWindow.value = window.open('about:blank', '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');

    // comprueba si el popup es bloqueado
    if (!popupWindow.value || popupWindow.value.closed) {
        alert('Popup bloqueado. Por favor, permite popups para este sitio.');
        return;
    }

    // contenido del popup
    popupWindow.value.document.write(`
        <html>
            <head><title>Ventana Popup</title></head>
            <body>
                <h1>¡Hola desde la ventana popup!</h1>
                <p>Esta es una ventana emergente.</p>
            </body>
        </html>
    `);
}

function closePopup() {
    if (popupWindow.value) {
        popupWindow.value.close()
    }

}

</script>