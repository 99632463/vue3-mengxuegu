<template>
   <el-scrollbar>
      <el-menu router :default-active="$route.path" background-color="transparent" :collapse="isCollpase" :default-openeds="['/system']">
         <subMenu v-for="menu in menuList" :key="menu.path" :menu="menu" />
      </el-menu>
   </el-scrollbar>
</template>

<script setup lang="ts">
import { useLayoutConfigStore } from '@/stores/layoutConfig'
import { storeToRefs } from 'pinia'
import type { RouteRecordRaw } from "vue-router";
import subMenu from './subMenu.vue'

const layoutConfig = useLayoutConfigStore()
const { isCollpase } = storeToRefs(layoutConfig)

withDefaults(defineProps<{
   menuList: RouteRecordRaw[];
}>(), {
   menuList: () => []
})
</script>

<style scoped lang="scss"></style>