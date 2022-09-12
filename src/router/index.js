import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        component: () => import('@/views/home')
      },
      {
        path: '/seek',
        component: () => import('@/views/seek')
      },
      {
        path: '/consult',
        component: () => import('@/views/consult')
      },
      {
        path: '/profile',
        component: () => import('@/views/profile')
      }
    ]
  },
  {
    path: '/city',
    component: () => import('@/views/home/city.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
