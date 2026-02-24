<template>
  <div class="about">
    <h1>Acerca del Diseñador de Packaging</h1>
    
    <section>
      <h2>🎯 Objetivo</h2>
      <p>Herramienta B2B para que empresas diseñen sus cajas de envío personalizadas en tiempo real con visualización 3D.</p>
    </section>

    <section>
      <h2>🛠️ Tecnologías</h2>
      <ul>
        <li><strong>Vue 3</strong> - Framework frontend reactivo</li>
        <li><strong>Three.js</strong> - Renderizado 3D en WebGL</li>
        <li><strong>TypeScript</strong> - Tipado estático</li>
      </ul>
    </section>

    <section>
      <h2>✨ Características</h2>
      <ul>
        <li>Visualización 3D en tiempo real</li>
        <li>Control de dimensiones con sliders</li>
        <li>Selector de color personalizado</li>
        <li>Cálculo automático de volumen y área</li>
        <li>Interacción con el modelo 3D</li>
        <li>Animación de rotación continua</li>
      </ul>
    </section>

    <section>
      <h2>🔧 Comunicación Bidireccional</h2>
      <p><strong>Vue → Three.js:</strong> Los cambios en los sliders actualizan la geometría 3D en tiempo real.</p>
      <p><strong>Three.js → Vue:</strong> Al hacer clic en la caja 3D, se muestra un toast con las dimensiones actuales.</p>
    </section>

    <section>
      <h2>🎮 Controles</h2>
      <ul>
        <li>📏 <strong>Ancho:</strong> 5-30 cm</li>
        <li>📐 <strong>Alto:</strong> 5-30 cm</li>
        <li>📦 <strong>Profundidad:</strong> 5-30 cm</li>
        <li>🎨 <strong>Color:</strong> Selector de color completo</li>
      </ul>
    </section>

    <section>
      <h2>💡 Casos de Uso</h2>
      <ul>
        <li>Diseño de packaging personalizado</li>
        <li>Prototipado rápido de cajas</li>
        <li>Cálculo de materiales necesarios</li>
        <li>Presentación a clientes</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  min-height: 100vh;
}

h1 {
  color: #667eea;
  margin-bottom: 2rem;
  font-size: 2rem;
}

section {
  margin-bottom: 2rem;
}

h2 {
  color: #2d3748;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

p {
  line-height: 1.8;
  color: #4a5568;
  margin-bottom: 1rem;
}

ul {
  list-style-position: inside;
  line-height: 2;
  color: #4a5568;
}

strong {
  color: #2d3748;
}
</style>
