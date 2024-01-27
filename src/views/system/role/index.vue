<template>
   <div class="layout-padding">
      <el-form inline :model="query">
         <el-form-item label="角色名称">
            <el-input v-model="query.name" placeholder="请输入" clearable></el-input>
         </el-form-item>
         <el-form-item>
            <el-button @click="handleQuery()" icon="e-Search" type="primary">查询</el-button>
            <el-button @click="handleAdd()" icon="e-Plus" type="success">新增角色</el-button>
         </el-form-item>
      </el-form>
      <el-table ref="tableListRef" v-loading="loading" :data="tableList" border stripe>
         <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
         <el-table-column align="center" prop="roleName" label="角色名称"></el-table-column>
         <el-table-column align="center" prop="roleCode" label="角色编码"></el-table-column>
         <el-table-column align="center" label="角色状态">
            <template #default="{ row }">
               <el-tag :type="row.status ? 'success' : 'warning'">{{ row.status ? '启用' : '停用' }}</el-tag>
            </template>
         </el-table-column>
         <el-table-column align="center" prop="remark" label="备注"></el-table-column>
         <el-table-column align="center" label="操作" width="260">
            <template #default="{ row }">
               <el-button @click.stop="handlePermission(row)" icon="e-Check" type="primary" link>分配权限</el-button>
               <el-button @click.stop="handleEdit(row)" icon="e-Edit" type="warning" link>修改</el-button>
               <el-button @click.stop="handleDelete(row.id)" icon="e-Delete" type="danger" link>删除</el-button>
            </template>
         </el-table-column>
      </el-table>
      <MPage :page="page" @pageChange="queryData" />
      <roleEdit ref="editRef" @refresh="queryData" />
      <permission ref="permissionRef" />
   </div>
</template>

<script setup lang="ts" name="SystemRole">
import { ref } from 'vue'
import { getPageList } from '@/api/system/role'
import permission from './components/permission.vue'
import { useTablePage } from '@/hooks/useTablePage'
import roleEdit from './components/role-edit.vue'

const editRef = ref()

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
} = useTablePage<SysRoleType, SysRoleQuery>({
   getPageList,
   editRef
})


const permissionRef = ref()
function handlePermission(role: SysRoleType) {
   permissionRef.value.open(role)
}
</script>

<style scoped lang="scss"></style>