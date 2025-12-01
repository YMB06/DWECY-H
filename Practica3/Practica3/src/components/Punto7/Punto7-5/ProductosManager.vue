<template>
  <div class="productos-manager">
    <h2>Gestión de Productos</h2>
    
    <div class="controls">
      <button @click="ejecutarTarea(1)">1. Ordenar por precio</button>
      <button @click="ejecutarTarea(2)">2. Ordenar por fecha</button>
      <button @click="ejecutarTarea(3)">3. Precio < 25</button>
      <button @click="ejecutarTarea(4)">4. % Stock</button>
      <button @click="ejecutarTarea(5)">5. Agrupar categorías</button>
      <button @click="ejecutarTarea(6)">6. 3 más caros</button>
      <button @click="ejecutarTarea(7)">7. Ganancia accesorios</button>
      <button @click="ejecutarTarea(8)">8. Últimos 15 días</button>
      <button @click="ejecutarTarea(9)">9. Calzado 20-30€</button>
      <button @click="ejecutarTarea(10)">10. Agregar producto</button>
      <button @click="ejecutarTarea(11)">11. Descuento 5%</button>
      <button @click="ejecutarTarea(12)">12. Borrar octubre</button>
    </div>

    <div class="resultado" v-if="resultado">
      <h3>Resultado:</h3>
      <pre>{{ resultado }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const resultado = ref('');

const productos = [
  { nombre: 'Camiseta', precio: 20, cantidad: 10, categoria: 'Ropa', fechaDeIngreso: '2024-11-01' },
  { nombre: 'Pantalones', precio: 50, cantidad: 0, categoria: 'Ropa', fechaDeIngreso: '2024-10-15' },
  { nombre: 'Zapatos', precio: 30, cantidad: 5, categoria: 'Calzado', fechaDeIngreso: '2024-11-10' },
  { nombre: 'Sombrero', precio: 15, cantidad: 20, categoria: 'Accesorios', fechaDeIngreso: '2024-11-05' },
  { nombre: 'Chaqueta', precio: 80, cantidad: 7, categoria: 'Ropa', fechaDeIngreso: '2024-11-11' },
  { nombre: 'Guantes', precio: 25, cantidad: 15, categoria: 'Accesorios', fechaDeIngreso: '2024-10-20' },
  { nombre: 'Bufanda', precio: 18, cantidad: 12, categoria: 'Accesorios', fechaDeIngreso: '2024-11-09' },
  { nombre: 'Gafas de sol', precio: 45, cantidad: 9, categoria: 'Accesorios', fechaDeIngreso: '2024-10-31' },
  { nombre: 'Reloj', precio: 120, cantidad: 3, categoria: 'Accesorios', fechaDeIngreso: '2024-11-03' },
  { nombre: 'Bolso', precio: 60, cantidad: 6, categoria: 'Accesorios', fechaDeIngreso: '2024-10-25' },
  { nombre: 'Cinturón', precio: 22, cantidad: 13, categoria: 'Accesorios', fechaDeIngreso: '2024-11-08' },
  { nombre: 'Vestido', precio: 70, cantidad: 4, categoria: 'Ropa', fechaDeIngreso: '2024-11-12' },
  { nombre: 'Falda', precio: 35, cantidad: 11, categoria: 'Ropa', fechaDeIngreso: '2024-10-18' },
  { nombre: 'Calcetines', precio: 8, cantidad: 30, categoria: 'Ropa', fechaDeIngreso: '2024-11-02' },
  { nombre: 'Pañuelo', precio: 12, cantidad: 25, categoria: 'Accesorios', fechaDeIngreso: '2024-11-07' },
  { nombre: 'Camiseta sin mangas', precio: 15, cantidad: 14, categoria: 'Ropa', fechaDeIngreso: '2024-10-22' },
  { nombre: 'Pantalones cortos', precio: 40, cantidad: 8, categoria: 'Ropa', fechaDeIngreso: '2024-10-30' },
  { nombre: 'Botas', precio: 90, cantidad: 5, categoria: 'Calzado', fechaDeIngreso: '2024-11-06' },
  { nombre: 'Sandalias', precio: 28, cantidad: 18, categoria: 'Calzado', fechaDeIngreso: '2024-10-27' },
  { nombre: 'Zapatos deportivos', precio: 65, cantidad: 7, categoria: 'Calzado', fechaDeIngreso: '2024-11-13' }
];

let productosActuales = [...productos];

function ejecutarTarea(tarea: number) {
  switch(tarea) {
    case 1:
      resultado.value = JSON.stringify(
        [...productosActuales].sort((a, b) => a.precio - b.precio),
        null, 2
      );
      break;
    
    case 2:
      resultado.value = JSON.stringify(
        [...productosActuales].sort((a, b) => new Date(a.fechaDeIngreso).getTime() - new Date(b.fechaDeIngreso).getTime()),
        null, 2
      );
      break;
    
    case 3:
      resultado.value = JSON.stringify(
        productosActuales.filter(p => p.precio < 25),
        null, 2
      );
      break;
    
    case 4:
      const conPorcentaje = productosActuales.map(p => ({
        ...p,
        porcentajeStock: Math.round(((p.cantidad - 5) / (30 - 5)) * 100)
      }));
      resultado.value = JSON.stringify(conPorcentaje, null, 2);
      break;
    
    case 5:
      const agrupados = productosActuales.reduce((acc, p) => {
        if (!acc[p.categoria]) acc[p.categoria] = [];
        acc[p.categoria].push(p);
        return acc;
      }, {} as Record<string, typeof productos>);
      resultado.value = JSON.stringify(agrupados, null, 2);
      break;
    
    case 6:
      resultado.value = JSON.stringify(
        [...productosActuales].sort((a, b) => b.precio - a.precio).slice(0, 3),
        null, 2
      );
      break;
    
    case 7:
      const accesorios = productosActuales.filter(p => p.categoria === 'Accesorios');
      const ganancia = accesorios.reduce((total, p) => total + (p.precio * p.cantidad), 0);
      resultado.value = `Ganancia total vendiendo todos los accesorios: ${ganancia}€`;
      break;
    
    case 8:
      const hace15Dias = new Date();
      hace15Dias.setDate(hace15Dias.getDate() - 15);
      resultado.value = JSON.stringify(
        productosActuales.filter(p => new Date(p.fechaDeIngreso) >= hace15Dias),
        null, 2
      );
      break;
    
    case 9:
      resultado.value = JSON.stringify(
        productosActuales.filter(p => p.categoria === 'Calzado' && p.precio >= 20 && p.precio <= 30),
        null, 2
      );
      break;
    
    case 10:
      const nuevoProducto = {
        nombre: 'Gorra',
        precio: 18,
        cantidad: 12,
        categoria: 'Accesorios',
        fechaDeIngreso: new Date().toISOString().split('T')[0]
      };
      productosActuales.push(nuevoProducto);
      resultado.value = `Producto agregado: ${JSON.stringify(nuevoProducto, null, 2)}`;
      break;
    
    case 11:
      const mayorStock = [...productosActuales]
        .sort((a, b) => b.cantidad - a.cantidad)
        .slice(0, 5)
        .map(p => ({
          ...p,
          precio: Math.round(p.precio * 0.95 * 100) / 100
        }));
      resultado.value = JSON.stringify(mayorStock, null, 2);
      break;
    
    case 12:
      productosActuales = productosActuales.filter(p => !p.fechaDeIngreso.startsWith('2024-10'));
      resultado.value = `Productos restantes después de borrar octubre: ${productosActuales.length}`;
      break;
  }
}
</script>

<style scoped>
.productos-manager {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background-soft);
  color: var(--color-text);
  cursor: pointer;
  transition: background 0.2s ease;
}

button:hover {
  background: var(--color-background-mute);
}

.resultado {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 15px;
  margin-top: 20px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 400px;
  overflow-y: auto;
  color: var(--color-text);
}
</style>