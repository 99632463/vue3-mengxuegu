<template>
   <el-scrollbar>
      <el-menu router :default-active="$route.path" background-color="transparent" :collapse="isCollpase" :default-openeds="['/system']">
         <el-menu-item index="/home">
            <SvgIcon name="e-HomeFilled"></SvgIcon>
            <span>首页</span>
         </el-menu-item>

         <el-sub-menu index="/system">
            <template #title>
               <SvgIcon name="e-Setting"></SvgIcon>
               <span>系统管理</span>
            </template>
            <el-menu-item index="/system/menu">
               <SvgIcon name="e-Menu"></SvgIcon>
               <span>菜单管理</span>
            </el-menu-item>
            <el-menu-item index="/system/role">
               <SvgIcon name="e-IceCream"></SvgIcon>
               <span>角色管理</span>
            </el-menu-item>
            <el-menu-item index="/system/user">
               <SvgIcon name="e-User"></SvgIcon>
               <span>用户管理</span>
            </el-menu-item>
         </el-sub-menu>

         <el-sub-menu index="/goods">
            <template #title>
               <SvgIcon name="e-Goods"></SvgIcon>
               <span>商品管理</span>
            </template>
            <el-menu-item index="/goods/list">
               <SvgIcon name="e-GoodsFilled"></SvgIcon>
               <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="/goods/category">
               <SvgIcon name="e-Operation"></SvgIcon>
               <span>商品分类</span>
            </el-menu-item>
         </el-sub-menu>

         <el-menu-item index="/mengxuegu">
            <SvgIcon name="e-Link"></SvgIcon>
            <span>梦学谷官网</span>
         </el-menu-item>
         <el-menu-item index="/401">
            <SvgIcon name="e-Warning"></SvgIcon>
            <span>401</span>
         </el-menu-item>
      </el-menu>
   </el-scrollbar>
</template>

<script setup lang="ts">
import { useLayoutConfigStore } from '@/stores/layoutConfig'
import { storeToRefs } from 'pinia'

const layoutConfig = useLayoutConfigStore()
const { isCollpase } = storeToRefs(layoutConfig)
</script>

<style scoped lang="scss"></style>