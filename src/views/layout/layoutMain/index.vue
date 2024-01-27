<template>
  <el-main class="layout-main">
    <el-scrollbar>
      <div class="layout-main-warp">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cacheRouteNames">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </el-scrollbar>
  </el-main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useViewRoutesStore } from '@/stores/viewRoutes'

const viewRoutesStore = useViewRoutesStore()

const cacheRouteNames = computed(() => viewRoutesStore.cacheRouteNames)
</script>

<style scoped lang="scss">
:deep(.el-scrollbar__view) {
  height: 100%;
}
</style>