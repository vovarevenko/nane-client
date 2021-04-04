import { store } from '@/store'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHashHistory(process.env.VUE_APP_PUBLIC_PATH),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.username) {
      next('/login')
      return
    }
  }

  next()
})

export { router }
