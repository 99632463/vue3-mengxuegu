<template>
   <el-menu-item v-if="!menu.children || menu.children.length <= 0" :index="menu.path" :key="menu.path">
      <SvgIcon v-if="menu.meta && menu.meta.icon" name="e-HomeFilled"></SvgIcon>
      <template #title>
         <span>{{ menu.meta?.title }}</span>
      </template>
   </el-menu-item>

   <el-sub-menu v-else :index="menu.path">
      <template #title>
         <SvgIcon v-if="menu.meta && menu.meta.icon" name="e-Setting"></SvgIcon>
         <span>{{ menu.meta?.title }}</span>
      </template>
      <sub-menu v-for="childMenu in menu.children" :menu="childMenu" :key="childMenu.path" />
   </el-sub-menu>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router";

defineProps<{
   menu: RouteRecordRaw;
}>()
</script>

<style scoped lang="scss"></style>