<template>
  <div class="about">
    <h1>Acerca del Simulador</h1>
    
    <section>
      <h2>🎯 Objetivo</h2>
      <p>Módulo de gamificación para formar a conductores de carretillas elevadoras mediante un juego interactivo.</p>
    </section>

    <section>
      <h2>🛠️ Tecnologías</h2>
      <ul>
        <li><strong>Vue 3</strong> - Framework frontend</li>
        <li><strong>Phaser 3</strong> - Motor de juego 2D</li>
        <li><strong>TypeScript</strong> - Tipado estático</li>
      </ul>
    </section>

    <section>
      <h2>🎮 Características</h2>
      <ul>
        <li>Juego 2D con vista cenital</li>
        <li>Control con teclado (flechas)</li>
        <li>Sistema de puntuación en tiempo real</li>
        <li>HUD externo con componentes Vue</li>
        <li>Gestión de memoria optimizada</li>
      </ul>
    </section>

    <section>
      <h2>🔧 Integración Híbrida</h2>
      <p>El juego Phaser se renderiza dentro de un componente Vue, mientras que el HUD (puntuación, tiempo, botones) son componentes HTML/Vue superpuestos al canvas.</p>
      <p>Los eventos del juego (como recoger cajas) se comunican a Vue mediante eventos personalizados.</p>
    </section>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
}

h1 {
  color: #ff6600;
  margin-bottom: 2rem;
}

section {
  margin-bottom: 2rem;
}

h2 {
  color: #333;
  margin-bottom: 1rem;
}

ul {
  list-style-position: inside;
  line-height: 1.8;
}

p {
  line-height: 1.6;
  color: #666;
}
</style>
