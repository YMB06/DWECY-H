import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Práctica 4 - Documentación',
  description: 'Documentación de estructuras de datos en JavaScript',
  
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Juego Cartas', link: '/pila' },
      { text: 'Sala Cine', link: '/sala-cine' },
      { text: 'Notificaciones', link: '/patron-factoria' },
      { text: 'Horarios', link: '/gestor-horarios' },
      { text: 'Singleton', link: '/singleton' }
    ],
    
    sidebar: [
      {
        text: 'Juego de Cartas (4-1)',
        items: [
          { text: 'Clase Pila', link: '/pila' },
          { text: 'Clase Carta', link: '/carta' },
          { text: 'Composable useJuego', link: '/use-juego' },
          { text: 'Componente JuegoCartas', link: '/juego-cartas' },
          { text: 'Flujo del Juego', link: '/flujo-juego' }
        ]
      },
      {
        text: 'Gestor de Sala de Cine (4-2)',
        items: [
          { text: 'SalaCine', link: '/sala-cine' }
        ]
      },
      {
        text: 'Sistema de Notificaciones (4-2)',
        items: [
          { text: 'Patrón Factoría', link: '/patron-factoria' }
        ]
      },
      {
        text: 'Gestor de Horarios (4-3)',
        items: [
          { text: 'GestorHorarios', link: '/gestor-horarios' },
          { text: 'Tipos', link: '/types' },
          { text: 'Ejemplos', link: '/examples' }
        ]
      },
      {
        text: 'Patrón Singleton (4-4)',
        items: [
          { text: 'AppConfig', link: '/singleton' }
        ]
      }
    ]
  }
})