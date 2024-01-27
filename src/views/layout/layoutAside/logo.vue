<template>
   <div class="layout-logo">
      <img class="layout-logo-img" src="@/assets/logo.png">
      <span v-if="!layoutConfig.isCollpase">{{ layoutConfig.globalTitle }}</span>
   </div>
</template>

<script setup lang="ts">
import { useLayoutConfigStore } from '@/stores/layoutConfig'

const layoutConfig = useLayoutConfigStore()
</script>

<style scoped lang="scss"></style>