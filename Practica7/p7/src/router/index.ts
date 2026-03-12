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
    },
    {
      path: '/ej2',
      name: 'ejercicio2',
      component: () => import('../views/Ejercicio2View.vue')
    },
    {
      path: '/ej3',
      name: 'ejercicio3',
      component: () => import('../views/Ejercicio3View.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    }
  ]
})

export default router
