import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ej3',
      name: 'ejercicio3',
      component: () => import('../views/Ejercicio3View.vue'),
    },
  ],
})

export default router
