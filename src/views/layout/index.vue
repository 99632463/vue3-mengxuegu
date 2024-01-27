<template>
  <el-container class="layout-container">
    <layout-aside />
    <el-container direction="vertical">
      <layout-header />
      <layout-main />
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="Layout">
import { defineAsyncComponent } from 'vue'

const layoutHeader = defineAsyncComponent(() => import('./layoutHeader/index.vue'))
const layoutAside = defineAsyncComponent(() => import('./layoutAside/index.vue'))
const layoutMain = defineAsyncComponent(() => import('./layoutMain/index.vue'))
</script>

<style scoped lang="scss"></style>