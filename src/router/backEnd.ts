import { useAuthStore } from '@/stores/auth'
import { getMenuUser } from '@/api/system/menu'
import type { RouteComponent, RouteRecordRaw } from 'vue-router'
import router, { dynamicRoutes, defaultRoutes } from '@/router'
import { useViewRoutesStore } from '@/stores/viewRoutes'

const modules: Record<string, RouteComponent> = import.meta.glob(['@/views/**/*.vue', '!@/views/**/components/**'])
const viewModules: Record<string, RouteComponent> = Object.keys(modules).reduce((prevObj, currKey) => {
   const path = currKey.replace(/\/src\/views|..\/views/, '')
   return Object.assign(prevObj, { [path]: modules[currKey] })
}, {})

export async function initBackEndRoutes() {
   const authStore = useAuthStore()
   // if (!authStore.accessToken) return false

   const { data } = await getMenuUser()
   const { userInfo, buttonList, menuList } = data
   authStore.setUserInfo(userInfo)
   authStore.setButtonList(buttonList)
   // authStore.setMenuList(menuList)

   const targetRoutes = dynamicImportComponent(menuList)
   dynamicRoutes[0].children = targetRoutes
   addRoutesHandle()
   setDynamicRoutes()
   setCacheRouteNames()
}

export function dynamicImportComponent(dynamicRoutes: RouteRecordRaw[]): RouteRecordRaw[] {
   if (!dynamicRoutes || dynamicRoutes.length <= 0) return []
   const targetRoutes = dynamicRoutes.map(route => {
      const { component } = route
      if (component) {
         route.component = viewModules[`${component}`] || viewModules[`/${component}`]
      }
      if (route.children) {
         dynamicImportComponent(route.children)
      }
      return route
   })
   return targetRoutes
}

export function addRoutesHandle() {
   const layoutRouteChildren = [...dynamicRoutes[0].children || [], ...defaultRoutes]
   dynamicRoutes[0].children = layoutRouteChildren
   dynamicRoutes.forEach(route => {
      router.addRoute(route)
   })
}

function setDynamicRoutes() {
   const authStore = useAuthStore()
   authStore.setMenuList(dynamicRoutes[0].children || [])
}

function setCacheRouteNames() {
   const cacheRouteNames: string[] = []
   const _getNames = (route: RouteRecordRaw) => {
      if (route.meta?.cache && route.name) {
         cacheRouteNames.push(<string>route.name)
      }
      if(route.children && route.children.length){
         route.children.forEach(item => _getNames(item))
      }
   }
   _getNames(dynamicRoutes[0])
   const viewRoutesStore = useViewRoutesStore()
   viewRoutesStore.setCacheRouteNames(cacheRouteNames)
}