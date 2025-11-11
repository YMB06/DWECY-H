<template>
    <div>
        <button @click="copyText">{{ copyExito ? '¡Copiado!' : 'Copiar texto' }}</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { textToCopy } = defineProps<{ textToCopy?: string }>();
const copyExito = ref(false);

async function copyText() {
    try {
        await navigator.clipboard.writeText(textToCopy || 'Texto por defecto');
        copyExito.value = true;
        setTimeout(() => {
            copyExito.value = false;
        }, 2000);
    } catch (err) {
        console.error('Error al copiar al portapeles: ', err);
    }
}
</script>


