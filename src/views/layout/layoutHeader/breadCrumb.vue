<template>
   <div class="layout-header-breadcrumb">
      <SvgIcon :name="layoutConfig.isCollpase ? 'e-Expand' : 'e-Fold'" class="layout-header-expand-icon"
         @click="handleChangeCollpase" />
      <el-breadcrumb separator="/">
         <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
            <span v-if="index === breadcrumbList.length - 1" class="flex-center">
               <SvgIcon v-if="item.meta.icon" :name="item.meta.icon" />
               {{ item.meta && item.meta.title }}
            </span> 
            <a v-else class="flex-center" @click.prevent="handleLink(item)" >
               <SvgIcon v-if="item.meta.icon" :name="item.meta.icon" />
               {{ item.meta && item.meta.title }}
            </a>
         </el-breadcrumb-item>
      </el-breadcrumb>
   </div>
</template>

<script setup lang="ts">
import { useLayoutConfigStore } from '@/stores/layoutConfig'
import { onMounted, ref } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'

const layoutConfig = useLayoutConfigStore()
let breadcrumbList = ref<RouteRecordNormalized[]>([])

const route = useRoute()
const router = useRouter()

function handleChangeCollpase() {
   layoutConfig.isCollpase = !layoutConfig.isCollpase
}

onMounted(() => {
   getBreadcrumb(route)
})

onBeforeRouteUpdate((to) => {
   getBreadcrumb(to)
})

function getBreadcrumb(to: RouteLocationNormalized) {
   const matched = to.matched.filter(item => item.meta && item.meta.title && item.meta.isBreadcrumd !== false)
   breadcrumbList.value = matched
}

function handleLink(_route: RouteRecordNormalized) {
   const { redirect, path } = _route
   if (redirect) {
      router.push(<string>redirect)
   } else {
      router.push(path)
   }
}
</script>

<style scoped lang="scss"></style>