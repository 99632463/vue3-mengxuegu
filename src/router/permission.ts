import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { initBackEndRoutes } from './backEnd'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
   const authStore = useAuthStore()
   const hasToken = authStore.accessToken

   if (hasToken) {
      if (to.path === '/login') {
         return next('/')
      } else {
         if (!authStore.userInfo || authStore.menuList?.length <= 0) {
            await initBackEndRoutes()
            next({path: to.path, query: to.query})
         } else {
            return next()
         }
      }
   } else {
      if (whiteList.indexOf(to.path) !== -1) {
         return next()
      } else {
         return next(`/login?redirect=${to.path}`)
      }
   }
})