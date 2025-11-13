<template>
    <div ref="elementRef">
        <button @click="toggleFullscreen">
            {{ isFullscreen ? 'Salir de Pantalla Completa' : 'Entrar a Pantalla Completa' }}
        </button>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const elementRef = ref<HTMLElement | null>(null);
const isFullscreen = ref(false);

async function toggleFullscreen() {
    try {
        if (document.fullscreenElement) {
            await document.exitFullscreen();
        } else {
            await elementRef.value?.requestFullscreen();
        }
    } catch (error) {
        console.error('error de pantalla completa:', error);
    }
}

function handleFullscreenChange() {
    isFullscreen.value = document.fullscreenElement === elementRef.value;
}

onMounted(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
});

onUnmounted(() => {
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
});
</script>

<style scoped>
button {
    margin-bottom: 10px;
    padding: 10px 15px;
}
</style>