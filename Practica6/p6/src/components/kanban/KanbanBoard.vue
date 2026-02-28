<script setup lang="ts">
import { ref } from 'vue'
import type { KanbanTask, TaskStatus } from '@/types/kanban'

/**
 * EJERCICIO 2: TABLERO KANBAN CON DRAG & DROP NATIVO
 * Implementación de un tablero Kanban usando la API nativa de HTML5
 * sin librerías externas
 */

// Estado inicial de las tareas
const tasks = ref<KanbanTask[]>([
  { id: 1, title: 'Aprender DOM', status: 'todo' },
  { id: 2, title: 'Configurar Vitest', status: 'todo' },
  { id: 3, title: 'Descansar', status: 'done' }
])

// Control visual del drag
const isDragging = ref(false)
const dragOverColumn = ref<TaskStatus | null>(null)

/**
 * Inicia el arrastre de una tarea
 * Guarda el ID de la tarea en dataTransfer
 */
const handleDragStart = (evt: DragEvent, task: KanbanTask) => {
  if (evt.dataTransfer) {
    // Guardar el ID de la tarea en dataTransfer
    evt.dataTransfer.setData('text/plain', task.id.toString())
    evt.dataTransfer.effectAllowed = 'move'
    isDragging.value = true

    // Añadir clase visual al elemento arrastrado
    ;(evt.target as HTMLElement).classList.add('dragging')
  }
}

/**
 * Finaliza el arrastre
 * Limpia el estado visual
 */
const handleDragEnd = (evt: DragEvent) => {
  isDragging.value = false
  dragOverColumn.value = null
  ;(evt.target as HTMLElement).classList.remove('dragging')
}

/**
 * Maneja el drop de una tarea en una columna
 * Actualiza el estado de la tarea
 */
const handleDrop = (evt: DragEvent, newStatus: TaskStatus) => {
  evt.preventDefault()
  dragOverColumn.value = null

  if (evt.dataTransfer) {
    // Recuperar el ID de la tarea
    const taskId = parseInt(evt.dataTransfer.getData('text/plain'))

    // Buscar y actualizar la tarea
    const task = tasks.value.find((t) => t.id === taskId)
    if (task) {
      task.status = newStatus
    }
  }
}

/**
 * Permite el drop en la columna
 * Por defecto el navegador NO permite soltar
 */
const handleDragOver = (evt: DragEvent) => {
  evt.preventDefault()
  evt.dataTransfer!.dropEffect = 'move'
}

/**
 * Feedback visual al entrar en una columna
 */
const handleDragEnter = (status: TaskStatus) => {
  dragOverColumn.value = status
}

/**
 * Limpia feedback visual al salir de una columna
 */
const handleDragLeave = () => {
  dragOverColumn.value = null
}
</script>

<template>
  <div class="kanban-container">
    <h1 class="kanban-title">📋 Tablero Kanban - Drag & Drop Nativo</h1>

    <div class="kanban-board">
      <!-- Columna TODO -->
      <div
        class="column todo"
        :class="{ 'drag-over': dragOverColumn === 'todo' }"
        @dragover="handleDragOver"
        @drop="handleDrop($event, 'todo')"
        @dragenter="handleDragEnter('todo')"
        @dragleave="handleDragLeave"
      >
        <h2 class="column-title">
          <span class="column-icon">📝</span>
          Pendientes
          <span class="column-count">{{ tasks.filter((t) => t.status === 'todo').length }}</span>
        </h2>

        <div class="cards-container">
          <div
            v-for="task in tasks.filter((t) => t.status === 'todo')"
            :key="task.id"
            class="card"
            draggable="true"
            @dragstart="handleDragStart($event, task)"
            @dragend="handleDragEnd"
            aria-grabbed="false"
          >
            <span class="card-id">#{{ task.id }}</span>
            {{ task.title }}
          </div>

          <div v-if="tasks.filter((t) => t.status === 'todo').length === 0" class="empty-state">
            No hay tareas pendientes
          </div>
        </div>
      </div>

      <!-- Columna DONE -->
      <div
        class="column done"
        :class="{ 'drag-over': dragOverColumn === 'done' }"
        @dragover="handleDragOver"
        @drop="handleDrop($event, 'done')"
        @dragenter="handleDragEnter('done')"
        @dragleave="handleDragLeave"
      >
        <h2 class="column-title">
          <span class="column-icon">✅</span>
          Hecho
          <span class="column-count">{{ tasks.filter((t) => t.status === 'done').length }}</span>
        </h2>

        <div class="cards-container">
          <div
            v-for="task in tasks.filter((t) => t.status === 'done')"
            :key="task.id"
            class="card"
            draggable="true"
            @dragstart="handleDragStart($event, task)"
            @dragend="handleDragEnd"
          >
            <span class="card-id">#{{ task.id }}</span>
            {{ task.title }}
          </div>

          <div v-if="tasks.filter((t) => t.status === 'done').length === 0" class="empty-state">
            No hay tareas completadas
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kanban-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.kanban-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  font-weight: 800;
}

.kanban-board {
  display: flex;
  gap: 2rem;
  min-height: 500px;
}

.column {
  flex: 1;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 3px solid transparent;
}

.column.todo {
  background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);
}

.column.done {
  background: linear-gradient(135deg, #f0fff4 0%, #e0ffe8 100%);
}

.column.drag-over {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  transform: scale(1.02);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.3);
}

.column-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-weight: 700;
}

.column-icon {
  font-size: 1.5rem;
}

.column-count {
  margin-left: auto;
  background: rgba(0, 0, 0, 0.1);
  padding: 0.2rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 100px;
}

.card {
  background: white;
  padding: 1rem 1.2rem;
  border-radius: 8px;
  cursor: grab;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #667eea;
  font-weight: 500;
  color: #2c3e50;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card:active {
  cursor: grabbing;
}

.card.dragging {
  opacity: 0.4;
  transform: rotate(2deg);
  cursor: grabbing;
}

.card-id {
  display: inline-block;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-right: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #999;
  font-style: italic;
}

@media (max-width: 768px) {
  .kanban-board {
    flex-direction: column;
  }
}
</style>
