<template>
  <div class="home">
    <div class="hero">
      <h1>📚 Práctica 7: Programación Asíncrona</h1>
      <p>APIs REST, Axios y gestión de estado con Pinia</p>
    </div>

    <div class="exercises">
      <div class="exercise-card">
        <div class="exercise-icon">💼</div>
        <h2>Ejercicio 1</h2>
        <h3>Job Tracker - Gestor de Candidaturas</h3>
        <p>Panel CRUD para gestionar candidaturas de trabajo con API simulada.</p>
        <ul>
          <li>✅ API REST con Beeceptor</li>
          <li>✅ Axios configurado con interceptors</li>
          <li>✅ Pinia store con acciones asíncronas</li>
          <li>✅ CRUD completo (Create, Read, Update, Delete)</li>
          <li>✅ Gestión de estados de candidatura</li>
        </ul>
        <RouterLink to="/ej1" class="btn">Ver Ejercicio 1 →</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
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
