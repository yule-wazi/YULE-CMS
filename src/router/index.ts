import { localCache } from '@/utils/cache'
import { firstRoute } from '@/utils/mapMenus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/notFound/notFount.vue')
    }
  ]
})

// 导航守卫
router.beforeEach((to) => {
  const token = localCache.getCache('token')
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  } else if(to.path === '/main') {
    return firstRoute
  }


})

export default router
