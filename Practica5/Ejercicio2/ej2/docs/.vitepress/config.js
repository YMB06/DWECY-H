import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Sistema de Checkout',
  description: 'Documentación completa del sistema de checkout con Vue 3 y VeeValidate',
  
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Guía de Usuario', link: '/user-guide' },
      { text: 'Arquitectura', link: '/architecture' },
      { text: 'API', link: '/api' }
    ],

    sidebar: [
      {
        text: 'Introducción',
        items: [
          { text: 'Descripción del Sistema', link: '/' },
          { text: 'Características', link: '/features' }
        ]
      },
      {
        text: 'Guía de Usuario',
        items: [
          { text: 'Cómo usar el Checkout', link: '/user-guide' },
          { text: 'Datos de Prueba', link: '/test-data' }
        ]
      },
      {
        text: 'Documentación Técnica',
        items: [
          { text: 'Arquitectura', link: '/architecture' },
          { text: 'Validaciones', link: '/validations' },
          { text: 'VeeValidate Integration', link: '/veevalidate' }
        ]
      },
      {
        text: 'API y Servicios',
        items: [
          { text: 'API de Servicios', link: '/api' },
          { text: 'Validaciones Asíncronas', link: '/async-validations' }
        ]
      },
      {
        text: 'Extensibilidad',
        items: [
          { text: 'Guía de Extensión', link: '/extension-guide' },
          { text: 'Nuevos Métodos de Pago', link: '/payment-methods' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})