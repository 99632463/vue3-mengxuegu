<template>
  <el-row justify="end" class="mt20">
    <el-pagination v-model:current-page="page.current" v-model:page-size="page.size" :small="small"
      :background="background" :layout="layout" :total="page.total" :pager-count="pagerCount"
      @size-change="emit('pageChange')" @current-change="emit('pageChange')" />
  </el-row>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  page: PageType;
  small?: boolean;
  background?: boolean;
  pagerCount?: number;
  layout?: string;
}>(), {
  small: false,
  background: true,
  layout: 'total, sizes, prev, pager, next, jumper',
  pagerCount: 7
})

const emit = defineEmits(['pageChange'])

function handleSizeChange(){

}

function handleCurrentChange() {

}
</script>

<style scoped lang="scss"></style>