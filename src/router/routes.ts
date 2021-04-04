import { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/room/:name',
    component: () => import('@/views/Room.vue'),
    meta: { requiresAuth: true },
  },
]
