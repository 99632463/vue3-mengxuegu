<template>
  <div class="h100">
    <el-aside class="layout-aside" :class="layoutConfig.isCollpase ? 'layout-aside-menu-60' : 'layout-aside-menu-200'">
      <Logo />
      <VerticalMenu :menu-list="state.menuList" />
    </el-aside>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useLayoutConfigStore } from '@/stores/layoutConfig'
import { useAuthStore } from '@/stores/auth'
import type { RouteRecordRaw } from "vue-router";
import { reactive, onMounted } from 'vue';

const Logo = defineAsyncComponent(() => import('./logo.vue'))
const VerticalMenu = defineAsyncComponent(() => import('./verticalMenu.vue'))

const layoutConfig = useLayoutConfigStore()

const authStore = useAuthStore()

const state = reactive({
   menuList: [] as RouteRecordRaw[]
})

onMounted(() => {
   setFilterRoutes()
})

function setFilterRoutes() {
   const _filterRoutes = (routes: RouteRecordRaw[]) => {
      const targetRoutes = routes.filter(item => !item.meta?.hidden)
      targetRoutes.forEach(item => {
         if(item.children && item.children.length){
            item.children = _filterRoutes(item.children)
         }
      })
      return targetRoutes
   }
   const copyMenuList = JSON.parse(JSON.stringify(authStore.menuList))
   state.menuList = _filterRoutes(copyMenuList)
}
</script>

<style scoped lang="scss"></style>