<template>
  <div class="home">
    <div class="hero">
      <h1>🎓 Práctica 6: Vue Avanzado</h1>
      <p>Integración de librerías externas con Vue 3</p>
    </div>

    <div class="exercises">
      <div class="exercise-card">
        <div class="exercise-icon">📦</div>
        <h2>Ejercicio 4</h2>
        <h3>Diseñador de Packaging B2B</h3>
        <p>Herramienta 3D con Three.js para diseñar cajas de envío personalizadas en tiempo real.</p>
        <ul>
          <li>✅ Escena 3D con Three.js</li>
          <li>✅ Comunicación bidireccional Vue ↔ Three.js</li>
          <li>✅ Controles reactivos (sliders + color picker)</li>
          <li>✅ Detección de clics en 3D</li>
        </ul>
        <RouterLink to="/ej4" class="btn">Ver Ejercicio 4 →</RouterLink>
      </div>

      <div class="exercise-card">
        <div class="exercise-icon">🏗️</div>
        <h2>Ejercicio 5</h2>
        <h3>Warehouse Simulator</h3>
        <p>Juego 2D con Phaser para formar conductores de carretillas elevadoras.</p>
        <ul>
          <li>✅ Juego 2D con Phaser</li>
          <li>✅ Integración híbrida Vue + Phaser</li>
          <li>✅ HUD externo con componentes Vue</li>
          <li>✅ Gestión de memoria correcta</li>
        </ul>
        <RouterLink to="/ej5" class="btn">Ver Ejercicio 5 →</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: calc(100vh - 60px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.hero {
  text-align: center;
  color: white;
  padding: 3rem 0;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.hero p {
  font-size: 1.3rem;
  opacity: 0.9;
}

.exercises {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
}

.exercise-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.exercise-card:hover {
  transform: translateY(-5px);
}

.exercise-icon {
  font-size: 4rem;
  text-align: center;
  margin-bottom: 1rem;
}

h2 {
  color: #667eea;
  margin-bottom: 0.5rem;
}

h3 {
  color: #2d3748;
  margin-bottom: 1rem;
}

p {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  margin-bottom: 1.5rem;
}

li {
  color: #4a5568;
  padding: 0.3rem 0;
}

.btn {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
</style>
