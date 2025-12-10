<script setup lang="ts">
import { AppConfig } from '@/services/AppConfig';

const configService = AppConfig.getInstance();
const settings = configService.getSettings();

const changeTheme = (event: Event) => {
  const newTheme = (event.target as HTMLSelectElement).value as 'light' | 'dark';
  configService.setTheme(newTheme);
};

const changeLanguage = (event: Event) => {
  const newLang = (event.target as HTMLSelectElement).value as 'es' | 'en' | 'fr';
  configService.setLanguage(newLang);
};

const changeFontSize = (event: Event) => {
  const newSize = (event.target as HTMLSelectElement).value as 'small' | 'medium' | 'large';
  configService.setFontSize(newSize);
};

const changeFontFamily = (event: Event) => {
  const newFamily = (event.target as HTMLSelectElement).value as 'Arial' | 'Verdana' | 'Georgia';
  configService.setFontFamily(newFamily);
};
</script>

<template>
  <div class="panel">
    <h3>Panel de Configuración</h3>
    
    <div class="control-group">
      <label>Tema:</label>
      <select :value="settings.theme" @change="changeTheme">
        <option value="light">Claro</option>
        <option value="dark">Oscuro</option>
      </select>
    </div>

    <div class="control-group">
      <label>Idioma:</label>
      <select :value="settings.language" @change="changeLanguage">
        <option value="es">Español</option>
        <option value="en">Inglés</option>
        <option value="fr">Francés</option>
      </select>
    </div>

    <div class="control-group">
      <label>Tamaño de Fuente:</label>
      <select :value="settings.fontSize" @change="changeFontSize">
        <option value="small">Pequeña</option>
        <option value="medium">Mediana</option>
        <option value="large">Grande</option>
      </select>
    </div>

    <div class="control-group">
      <label>Familia de Fuente:</label>
      <select :value="settings.fontFamily" @change="changeFontFamily">
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Georgia">Georgia</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.panel {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: var(--bg-color, white);
  color: var(--text-color, #2c3e50);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  max-width: 600px;
  margin: 0 auto;
}

.panel h3 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.5em;
}

.control-group {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

label {
  min-width: 120px;
  font-weight: bold;
  color: #2c3e50;
}

select {
  padding: 8px 12px;
  border: 2px solid #bdc3c7;
  border-radius: 6px;
  background: var(--input-bg, white);
  color: var(--input-text, #2c3e50);
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

select:focus {
  outline: none;
  border-color: #3498db;
}
</style>