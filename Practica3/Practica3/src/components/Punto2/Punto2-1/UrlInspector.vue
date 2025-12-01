<template>
  <div class="url-inspector">
    <h2>Analizador de URL</h2>
    <dl class="url-parts">
      <dt>URL Completa (href):</dt>
      <dd>{{ urlParts.href }}</dd>
      
      <dt>Protocolo (protocol):</dt>
      <dd>{{ urlParts.protocol }}</dd>
      
      <dt>Dominio (hostname):</dt>
      <dd>{{ urlParts.hostname }}</dd>
      
      <dt>Puerto (port):</dt>
      <dd>{{ urlParts.port || 'Por defecto' }}</dd>
      
      <dt>Ruta (pathname):</dt>
      <dd>{{ urlParts.pathname }}</dd>
      
      <dt>Parámetros (search):</dt>
      <dd>{{ urlParts.search || 'Ninguno' }}</dd>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';

interface UrlParts {
  href: string;
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
}

const urlParts = reactive<UrlParts>({
  href: '',
  protocol: '',
  hostname: '',
  port: '',
  pathname: '',
  search: ''
});

onMounted(() => {
  urlParts.href = window.location.href;
  urlParts.protocol = window.location.protocol;
  urlParts.hostname = window.location.hostname;
  urlParts.port = window.location.port;
  urlParts.pathname = window.location.pathname;
  urlParts.search = window.location.search;
});
</script>

<style scoped>
.url-inspector {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.url-parts {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

dt {
  font-weight: bold;
  color: var(--color-heading);
  margin-top: 15px;
}

dt:first-child {
  margin-top: 0;
}

dd {
  margin: 5px 0 0 20px;
  color: var(--color-text);
  font-family: monospace;
  background: var(--color-background-mute);
  padding: 5px 10px;
  border-radius: 4px;
  word-break: break-all;
}
</style>