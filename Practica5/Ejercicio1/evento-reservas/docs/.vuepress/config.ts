import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  lang: 'es-ES',
  title: 'Formulario de Reserva de Eventos',
  description: 'Documentación del sistema de reservas de eventos con Vue 3 y TypeScript',
  
  theme: defaultTheme({
    navbar: [
      {
        text: 'Inicio',
        link: '/',
      },
      {
        text: 'Guía de Usuario',
        link: '/user-guide',
      },
      {
        text: 'API',
        link: '/api',
      },
      {
        text: 'Validaciones',
        link: '/validations',
      }
    ],
    
    sidebar: [
      {
        text: 'Introducción',
        children: [
          '/README.md',
          '/installation.md'
        ]
      },
      {
        text: 'Funcionalidades',
        children: [
          '/user-guide.md',
          '/validations.md',
          '/accessibility.md'
        ]
      },
      {
        text: 'Desarrollo',
        children: [
          '/api.md',
          '/testing.md',
          '/architecture.md'
        ]
      }
    ]
  })
})