<template>
    <div id="ScrollProgressBar" class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }">
        <div class="scroll-progress-bar-fill" :style="{ width: scrollProgress + '%' }">
            <span class="scroll-progress-bar-fill-text">{{ scrollProgress }}%</span>
            <div class="scroll-progress-bar-fill-background">
                <span class="scroll-progress-bar-fill-background-text">Scroll Progress</span>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

const scrollProgress = ref(0);

const updateScrollProgress = () => {
    // calcular el progreso del scroll
    const scrollActual = window.scrollY;
    const alturaTotalContenido = document.documentElement.scrollHeight;
    const alturaVentana = document.documentElement.clientHeight;
    const progreso = (scrollActual / (alturaTotalContenido - alturaVentana)) * 100;
    //actualiza el valor del progreso del scroll
    scrollProgress.value = isNaN(progreso) ? 0 : progreso;

};
window.addEventListener('scroll', updateScrollProgress);

onMounted(() => {
    updateScrollProgress();
});
onUnmounted(() => {
    window.removeEventListener('scroll', updateScrollProgress);
    scrollProgress.value = 0;
});

watch(scrollProgress, (newValue) => {
    const progressBar = document.getElementById('ScrollProgressBar');

    if (progressBar) {
        progressBar.style.width =  `${newValue}%`;
    }
});

</script>

<style scoped>
.scroll-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background-color: #f3f3f3;
}

.scroll-progress-bar::after {
  content: attr(data-progress) '%';
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #4caf50;
}
</style>


