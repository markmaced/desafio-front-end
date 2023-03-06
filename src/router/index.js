import { createRouter, createWebHistory } from 'vue-router'
import mktPlace from '../views/MktPlace.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mktPlace',
      component: mktPlace
    },
    {
      path: '/carrinho',
      name: 'carrinho',
      component: () => import('../views/Carrinho.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/Checkout.vue')
    },
  ]
})

export default router