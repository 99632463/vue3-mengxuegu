<template>
   <div>goods/list</div>
</template>

<script setup lang="ts" name="GoodsList">
import { getPageList } from '@/api/goods/list'
import { useTablePage } from '@/hooks/useTablePage'

const {
   loading,
   page,
   query,
   tableList,
   queryData,
   handleQuery,
   handleAdd,
   handleEdit,
   handleDelete
} = useTablePage<GoodsType, GoodsQuery>({ getPageList }) 
</script>

<style scoped lang="scss"></style>