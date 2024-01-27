import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;  // 菜单名称
    icon?: string;   // 菜单图标
    linkTo?: string;  // 外链地址
    cache?: boolean;  // 是否缓存
    hidden?: boolean;  // 是否在菜单中显示
    isBreadcrumd?: boolean;  // 是否显示在面包屑中
  }
}

export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/layout/index.vue'),
    redirect: '/home',
    children: [
      // {
      //   path: '/home',
      //   name: 'Home',
      //   component: () => import('@/views/home/index.vue'),
      //   meta: {
      //     title: '首页',
      //     icon: 'e-HomeFilled'
      //   }
      // },
      // {
      //   path: '/system',
      //   name: 'System',
      //   redirect: '/system/menu',
      //   meta: {
      //     title: '系统管理',
      //     icon: 'e-Setting'
      //   },
      //   children: [
      //     {
      //       path: '/system/menu',
      //       name: 'SystemMenu',
      //       component: () => import('@/views/system/menu/index.vue'),
      //       meta: {
      //         title: '菜单管理',
      //         icon: 'e-Menu',
      //         cache: true
      //       }
      //     },
      //     {
      //       path: '/system/role',
      //       name: 'SystemRole',
      //       component: () => import('@/views/system/role/index.vue'),
      //       meta: {
      //         title: '角色管理',
      //         icon: 'e-IceCream',
      //         cache: true
      //       }
      //     },
      //     {
      //       path: '/system/user',
      //       name: 'SystemUser',
      //       component: () => import('@/views/system/user/index.vue'),
      //       meta: {
      //         title: '用户管理',
      //         icon: 'e-User',
      //         cache: true
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: '/goods',
      //   name: 'Goods',
      //   redirect: '/goods/list',
      //   meta: {
      //     title: '商品管理',
      //     icon: 'e-Goods'
      //   },
      //   children: [
      //     {
      //       path: '/goods/list',
      //       name: 'GoodsList',
      //       component: () => import('@/views/goods/list/index.vue'),
      //       meta: {
      //         title: '商品列表',
      //         icon: 'e-GoodsFilled',
      //         cache: true
      //       }
      //     },
      //     {
      //       path: '/goods/category',
      //       name: 'GoodsCategory',
      //       component: () => import('@/views/goods/category/index.vue'),
      //       meta: {
      //         title: '商品分类',
      //         icon: 'e-Operation',
      //         cache: true
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: '/mengxuegu',
      //   name: 'Mengxuegu',
      //   component: () => import('@/views/link/index.vue'),
      //   meta: {
      //     title: '梦学谷官网',
      //     icon: 'e-Link',
      //     linkTo: 'https://www.mengxuegu.com'
      //   }
      // }
    ]
  }
]

export const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/401',
    name: 'NoPermission',
    component: () => import('@/views/error/401.vue'),
    meta: {
      title: '401页面',
      icon: 'e-Warning',
      cache: true,
      hidden: true
    }
  },
  {
    path: '/:path(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404页面',
      cache: true,
      hidden: true
    }
  }
]
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/login.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export default router
