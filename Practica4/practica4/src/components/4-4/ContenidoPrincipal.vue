<script setup lang="ts">
import { AppConfig } from '@/services/AppConfig';
import { computed } from 'vue';

const settings = AppConfig.getInstance().getSettings();

const contentClasses = computed(() => {
  return `font-${settings.value.fontSize} family-${settings.value.fontFamily.toLowerCase()}`;
});

const texts = computed(() => {
  const dict = {
    es: { title: 'Bienvenido a la Aplicación', body: 'Este es un texto de ejemplo que cambia según la configuración.' },
    en: { title: 'Welcome to the Application', body: 'This is an example text that changes according to configuration.' },
    fr: { title: 'Bienvenue à l\'application', body: 'Ceci est un texte d\'exemple qui change selon la configuration.' },
  };
  return dict[settings.value.language];
});
</script>

<template>
  <article :class="contentClasses" class="content">
    <h2>{{ texts.title }}</h2>
    <p>{{ texts.body }}</p>
    <p>Configuración actual:</p>
    <ul>
      <li>Tema: {{ settings.theme }}</li>
      <li>Idioma: {{ settings.language }}</li>
      <li>Tamaño: {{ settings.fontSize }}</li>
      <li>Fuente: {{ settings.fontFamily }}</li>
    </ul>
  </article>
</template>

<style scoped>
.content {
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  background: var(--content-bg, #f9f9f9);
  color: var(--content-text, #333);
}

.font-small { font-size: 14px; }
.font-medium { font-size: 16px; }
.font-large { font-size: 18px; }

.family-arial { font-family: Arial, sans-serif; }
.family-verdana { font-family: Verdana, sans-serif; }
.family-georgia { font-family: Georgia, serif; }

ul {
  margin-top: 10px;
}

li {
  margin: 5px 0;
}
</style>