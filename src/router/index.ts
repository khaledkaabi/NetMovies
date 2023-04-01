import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../pages/login/login.vue'),
      beforeEnter: (to, from, next) => {
        if (to.path === '/') {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/register/register.vue')
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('../pages/Movies/movies.vue')
    }
  ]
})

export default router
