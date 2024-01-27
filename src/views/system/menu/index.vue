<template>
   <div class="layout-padding">
      <el-form inline :model="query">
         <el-form-item label="菜单名称">
            <el-input v-model="query.keyword" placeholder="请输入" clearable></el-input>
         </el-form-item>
         <el-form-item>
            <el-button @click="queryData()" icon="e-Search" type="primary">查询</el-button>
            <el-button @click="handleAdd()" icon="e-Plus" type="success">新增</el-button>
         </el-form-item>
      </el-form>
      
      <el-table ref="tableListRef" v-loading="loading" :data="tableList" row-key="id" border stripe @row-click="toggleRow">
         <el-table-column prop="meta.title" label="菜单名称" header-align="center" align="left">
            <template #default="{ row }">
               <SvgIcon :name="row.meta?.icon || ''" />
               <span class="ml10">{{ row.meta?.title }}</span>
            </template>
         </el-table-column>
         <el-table-column prop="path" label="路由地址" header-align="center" align="left" show-overflow-tooltip />
         <el-table-column prop="component" label="组件路径" header-align="center" align="left" show-overflow-tooltip />
         <el-table-column prop="code" label="权限标识" header-align="center" align="left" show-overflow-tooltip />
         <el-table-column prop="type" label="类型" align="center">
            <template #default="{ row }">
               <el-tag effect="plain" :type="row.type == 1 ? '' : 'success'">{{ row.type == 1 ? '菜单' : '按钮' }}</el-tag>
            </template>
         </el-table-column>
         <el-table-column prop="sort" label="排序" align="center" />
         <el-table-column label="操作" align="center" width="240">
            <template #default="{ row }">
               <el-button @click.stop="handleAdd(row.id)" v-if="row.type != 2" icon="e-Plus" type="primary" link>新增下一级</el-button>
               <el-button @click.stop="handleEdit(row)" icon="e-Edit" type="warning" link>修改</el-button>
               <el-button @click.stop="handleDelete(row.id)" icon="e-Delete" type="danger" link>删除</el-button>
            </template> 
         </el-table-column>
      </el-table>

      <menuEdit ref="editRef" @refresh="queryData" />
   </div>
</template>

<script setup lang="ts" name="SystemMenu">
import { getList } from '@/api/system/menu'
import { reactive, toRefs, onMounted, ref } from 'vue'
import menuEdit from './components/menu-edit.vue'

const tableListRef = ref()
const editRef = ref()
const state = reactive({
   loading: false,
   query: {
      keyword: ''
   } as SysMenuQuery,
   tableList: [] as SysMenuType[]
})

const { loading, query, tableList } = { ...toRefs(state) }

onMounted(() => {
   queryData()
})

async function queryData() {
   try {
      state.loading = true
      const { data } = await getList(state.query)
      state.tableList = data || []
   } catch (error) {

   } finally {
      state.loading = false
   }
}

function toggleRow(row?: SysMenuType) {
   // tableListRef.value.toggleRowExpansion()
}

function handleAdd(parentId?: string) {
   editRef.value.open('add', '新增', { parentId })
}

function handleEdit(row?: SysMenuType) {
   editRef.value.open('edit', '修改', row)
}

function handleDelete(id: string) {
   
}
</script>

<style scoped lang="scss"></style>