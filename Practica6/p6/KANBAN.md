# Ejercicio 2: Tablero Kanban con Drag & Drop Nativo

Implementación de un tablero Kanban estilo Trello usando únicamente la **API nativa de HTML5 Drag & Drop**, sin librerías externas.

## 🎯 Objetivo

Entender cómo funciona el Drag & Drop nativo del navegador y cómo integrarlo con Vue 3 para crear una aplicación reactiva.

## ✨ Características

- ✅ **Dos columnas**: "Pendientes" y "Hecho"
- ✅ **Drag & Drop nativo**: Sin librerías externas
- ✅ **Feedback visual**: Opacidad al arrastrar, borde resaltado en columnas
- ✅ **Estado reactivo**: Vue actualiza automáticamente las listas
- ✅ **Contador de tareas**: En cada columna
- ✅ **Estado vacío**: Mensaje cuando no hay tareas
- ✅ **Responsive**: Funciona en móviles y tablets

## 🛠️ Tecnologías

- **Vue 3** - Composition API
- **TypeScript** - Tipado estático
- **HTML5 Drag & Drop API** - Nativa del navegador
- **Vitest** - Testing

## 📋 Eventos del DOM Utilizados

### `dragstart`
- Guarda el ID de la tarea en `dataTransfer`
- Añade clase visual `dragging`
- Establece `effectAllowed = 'move'`

### `dragend`
- Limpia el estado visual
- Remueve clase `dragging`

### `dragover`
- **Crítico**: `preventDefault()` para permitir el drop
- Establece `dropEffect = 'move'`

### `drop`
- Recupera el ID de la tarea desde `dataTransfer`
- Actualiza el estado reactivo de Vue
- Mueve la tarea a la nueva columna

### `dragenter` / `dragleave`
- Feedback visual en las columnas
- Añade/remueve borde resaltado

## 🚀 Uso

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Tests
npm run test:unit

# Build
npm run build
```

## 📝 Estructura de Archivos

```
src/
├── components/
│   └── kanban/
│       ├── KanbanBoard.vue          # Componente principal
│       └── __tests__/
│           └── KanbanBoard.spec.ts  # Tests
└── types/
    └── kanban.ts                    # Tipos TypeScript
```

## 🧪 Tests Implementados

1. ✅ Renderizado de columnas
2. ✅ Tareas iniciales en columnas correctas
3. ✅ Contador de tareas
4. ✅ Atributo `draggable` en tarjetas
5. ✅ Movimiento de tareas entre columnas
6. ✅ Clase `dragging` durante arrastre
7. ✅ Estado vacío
8. ✅ Actualización de contadores

## 💡 Conceptos Clave

### DataTransfer
```typescript
// Guardar datos
evt.dataTransfer.setData('text/plain', task.id.toString())

// Recuperar datos
const taskId = evt.dataTransfer.getData('text/plain')
```

### preventDefault()
```typescript
// NECESARIO para permitir el drop
const handleDragOver = (evt: DragEvent) => {
  evt.preventDefault()
}
```

### Reactividad de Vue
```typescript
// Vue detecta el cambio y re-renderiza automáticamente
const task = tasks.value.find(t => t.id === taskId)
if (task) {
  task.status = newStatus // ✨ Magia de Vue
}
```

## 🎨 Feedback Visual

- **Tarjeta arrastrada**: Opacidad 0.4 + rotación
- **Columna objetivo**: Borde azul + escala 1.02
- **Hover en tarjeta**: Elevación con sombra
- **Cursor**: `grab` → `grabbing`

## 📱 Responsive

En móviles (<768px), las columnas se apilan verticalmente para mejor usabilidad.

## 🔍 Notas Técnicas

- **JSDOM Limitation**: Los tests simulan eventos manualmente ya que JSDOM no implementa Drag & Drop completo
- **Accesibilidad**: Atributo `aria-grabbed` en tarjetas
- **Performance**: Sin re-renders innecesarios gracias a Vue 3

## 📚 Recursos

- [MDN: HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [Vue 3 Event Handling](https://vuejs.org/guide/essentials/event-handling.html)
- [DataTransfer API](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer)
