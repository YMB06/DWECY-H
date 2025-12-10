import { defineConfig } from 'vuepress/config'

export default defineConfig({
  title: 'Gestor de Horarios - Documentación',
  description: 'Documentación del sistema de gestión de horarios de aulas',
  base: '/gestor-horarios/',
  
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: '4-1: Juego Cartas', link: '/4-1/juego-cartas/' },
      { text: '4-3: Horarios', link: '/4-3/components/' },
      { text: '4-4: Singleton', link: '/4-4/' }
    ],
    
    sidebar: {
      '/4-1/': [
        {
          title: 'Juego de Cartas',
          children: [
            'juego-cartas/',
            'juego-cartas/pila',
            'juego-cartas/carta',
            'juego-cartas/use-juego',
            'juego-cartas/juego-cartas',
            'juego-cartas/flujo-juego'
          ]
        }
      ],
      '/4-3/': [
        {
          title: 'Componentes',
          children: [
            'components/',
            'components/gestor-horarios',
            'components/horario-modal'
          ]
        },
        {
          title: 'API',
          children: [
            'api/',
            'api/types',
            'api/horario-manager'
          ]
        },
        {
          title: 'Guía',
          children: [
            'guide/',
            'guide/getting-started',
            'guide/examples'
          ]
        }
      ],
      '/4-4/': [
        ''
      ]
    }
  }
})