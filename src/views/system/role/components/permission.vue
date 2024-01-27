<template>
   <el-drawer v-model="visible" :title="`分配[${role.roleName}]权限`" direction="rtl" :before-close="close">
      <div v-loading="loading">
         <el-tree ref="treeRef" :data="menuList" node-key="id" show-checkbox :props="{}" highlight-current
            :default-expand-all="defaultExpandAll">
            <template #default="{ node, data }">
               <span class="custom-tree-node">
                  <span>{{ data.meta.title }}</span>
               </span>
            </template>
         </el-tree>
      </div>

      <template #footer>
         <el-button :loading="submitting" @click="submitForm" type="primary">提交</el-button>
         <el-button @click="handleCheckAll">全选/不选</el-button>
         <el-button @click="handleExpand">展开/收起</el-button>
         <el-button @click="close">取消</el-button>
      </template>
   </el-drawer>
</template>

<script setup lang="ts">
import { getList } from '@/api/system/menu'
import { getMenuIdsByRoleId, saveRoleMenu } from '@/api/system/role'
import { ref, reactive, toRefs } from 'vue'

const treeRef = ref()
const state = reactive({
   visible: false,
   loading: false,
   role: {} as SysRoleType,
   menuList: [] as SysMenuType[],
   menuIds: [] as string[],
   checked: false,
   expandAll: false,
   defaultExpandAll: false,
   submitting: false
})
const { visible, loading, role, menuList, menuIds, defaultExpandAll, submitting } = { ...toRefs(state) }

defineExpose({
   open
})

function close() {
   state.visible = false
   state.checked = false
   state.menuIds = []
   state.menuList = []
   state.defaultExpandAll = false
}

async function open(role: SysRoleType) {
   state.role = role
   state.visible = true
   await loadMenuList()
   await loadRoleMenuIds()
   await checkOldMenuNode()
}

async function loadMenuList() {
   try {
      state.loading = true
      const { data } = await getList()
      state.menuList = data
   } finally {
      state.loading = false
   }
}

async function loadRoleMenuIds() {
   try {
      state.loading = true
      const { data } = await getMenuIdsByRoleId(state.role.id)
      state.menuIds = data
   } finally {
      state.loading = false
   }
}

function checkOldMenuNode() {
   const { menuIds } = state
   menuIds.forEach(id => {
      const node = treeRef.value.getNode(id)
      if (node && node.isLeaf) {
         treeRef.value.setChecked(id, true)
      }
   })
}

function handleCheckAll() {
   state.checked = !state.checked
   if (state.checked) {
      treeRef.value.setCheckedNodes(state.menuList)
   } else {
      treeRef.value.setCheckedNodes([])
   }
}

function handleExpand() {
   state.expandAll = !state.expandAll
   changeTreeNodeStatus(treeRef.value.store.root)
}

function changeTreeNodeStatus(node: any) {
   node.expanded = state.expandAll
   for (let i = 0; i < node.childNodes.length; i++) {
      node.childNodes[i].expanded = state.expandAll
      if (node.childNodes[i].childNodes.length) {
         changeTreeNodeStatus(node.childNodes[i])
      }
   }
}

async function submitForm() {
   try {
      state.submitting = true
      const parentIds = treeRef.value.getHalfCheckedKeys()
      const checkedMenuIds = treeRef.value.getCheckedKeys()
      const menuIds: string[] = parentIds.concat(checkedMenuIds)

      await saveRoleMenu(state.role.id, menuIds)
      alert('分配权限成功')
      close()
   } finally {
      state.submitting = false
   }
}
</script>

<style scoped lang="scss"></style>