<template>
   <div class="layout-header-user">
      <div class="layout-header-user-icon" @click="handleToggleFullScreen">
         <SvgIcon name="e-FullScreen" />
      </div>
      <div>
         <el-switch v-model="isDark" inline-prompt style="--el-switch-on-color: #333;" active-icon="e-Moon"
            inactive-icon="e-Sunny" />
      </div>
      <el-dropdown>
         <span class="user-dropdown-link ml5">
            <el-avatar class="mr3" size="50" icon="e-UserFilled"></el-avatar>
            admin
            <SvgIcon class="ml3" name="e-ArrowDown" />
         </span>
         <template #dropdown>
            <el-dropdown-menu>
               <el-dropdown-item @click="$router.push('/')">首页</el-dropdown-item>
               <el-dropdown-item divided>退出系统</el-dropdown-item>
            </el-dropdown-menu>
         </template>
      </el-dropdown>
   </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useFullscreen, useDark } from '@vueuse/core'
import { useLayoutConfigStore } from '@/stores/layoutConfig'

const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()
const layoutConfig = useLayoutConfigStore()

async function handleToggleFullScreen() {
   await toggleFullScreen()
   layoutConfig.isFullScreen = isFullscreen.value
}

const isDark = useDark({
   initialValue: 'dark',
   valueDark: 'dark',
   valueLight: ''
})

watch(isDark, (newVal) => {
   layoutConfig.isDark = newVal
}, {
   immediate: true
})
</script>

<style scoped lang="scss"></style>