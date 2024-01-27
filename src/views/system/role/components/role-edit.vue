<template>
   <el-dialog v-model="visible" :title="title + '角色'" center draggable width="500px" :before-close="close"
      destroy-on-close>
      <el-form :model="formData" ref="formRef" label-width="85px" label-position="right" status-icon label-suffix=":">
         <el-form-item label="角色名称" prop="roleName" :rules="{ required: true, message: '请输入', trigger: 'blur' }">
            <el-input v-model="formData.roleName" placeholder="请输入" clearable></el-input>
         </el-form-item>
         <el-form-item label="角色编码" prop="roleCode" :rules="{ required: true, message: '请输入', trigger: 'blur' }">
            <el-input v-model="formData.roleCode" placeholder="请输入" clearable></el-input>
         </el-form-item>
         <el-form-item label="角色状态" prop="status" :rules="{ required: true, message: '请输入', trigger: 'change' }">
            <el-switch v-model="formData.status" inline-prompt active-text="启" inactive-text="停">
            </el-switch>
         </el-form-item>
         <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="formData.remark" placeholder="请输入"></el-input>
         </el-form-item>
      </el-form>
      <el-row justify="center" class="mt10">
         <el-button @click="close">取消</el-button>
         <el-button type="primary" @click="submitForm">确定</el-button>
      </el-row>
   </el-dialog>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from 'vue'
import { add, update } from '@/api/system/role'

const formRef = ref()
const initData = { status: true }
const state = reactive({
   visible: false,
   title: '新增',
   type: 'edit',
   formData: {} as SysRoleType
})
const { visible, title, formData } = { ...toRefs(state) }

defineExpose({
   open
})

const emit = defineEmits(['refresh'])

function open(type: FormType, title: string, data = {} as any) {
   state.type = type
   state.title = title
   state.formData = JSON.parse(JSON.stringify({ ...initData, ...data }))
   state.visible = true
}

function close() {
   formRef.value.resetFields()
   state.visible = false
}

function submitForm() {
   formRef.value.validate((valid: boolean) => {
      if (!valid) return
      submitData()
   })
}

async function submitData() {
   try {
      let res = {}
      if (state.type === 'edit') {
         res = await update(state.formData)
      } else {
         res = await add(state.formData)
      }
      alert('操作成功')
      close()
      emit('refresh')
   } finally {

   }
}
</script>

<style scoped lang="scss"></style>