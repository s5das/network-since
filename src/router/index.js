import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/main-page.vue')
    },
    {
      path: '/visiual',
      component: () => import('../views/graph-visiual.vue')
    },
    {
      path: '/random',
      component: () => import('../views/graph-random.vue')
    }
  ]
})

export default router