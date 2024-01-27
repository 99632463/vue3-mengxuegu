<template>
  <el-header class="layout-header">
    <div class="layout-header-index">
      <BreadCrumb />
      <UserDropdown />
    </div>
  </el-header>
</template>

<script setup lang="ts">
import BreadCrumb from './breadCrumb.vue';
import UserDropdown from './userDropdown.vue';
</script>

<style scoped lang="scss"></style>