import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/ej1',
      name: 'ejercicio1',
      component: () => import('../views/Ejercicio1View.vue')
    }
  ]
})

export default router
