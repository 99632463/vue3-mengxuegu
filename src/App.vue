<template>
  <div class="h100">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { Local } from '@/utils/storage'
import { useLayoutConfigStore } from '@/stores/layoutConfig'
import { onMounted } from 'vue';

const layoutConfigStore = useLayoutConfigStore()

onMounted(() => {
  const layoutConfigState = Local.get('layoutConfig')
  if (layoutConfigState) layoutConfigStore.updateState(layoutConfigState)
})
</script>

<style scoped lang="scss"></style>
