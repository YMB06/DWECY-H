/**
 * Tipos para el Tablero Kanban - Ejercicio 2
 */

export interface KanbanTask {
  id: number
  title: string
  status: 'todo' | 'done'
}

export type TaskStatus = 'todo' | 'done'
