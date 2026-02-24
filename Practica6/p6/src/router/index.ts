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
      path: '/ej4',
      name: 'ejercicio4',
      component: () => import('../views/Ejercicio4View.vue')
    },
    {
      path: '/ej5',
      name: 'ejercicio5',
      component: () => import('../views/Ejercicio5View.vue')
    }
  ]
})

export default router
