<template>
   <el-drawer v-model="visible" :title="title + '菜单'" direction="rtl" :before-close="close">
      <el-form v-loading="loading" :model="formData" ref="formRef" label-width="85px" label-position="right" status-icon
         label-suffix=":">
         <el-form-item label="上级菜单" prop="parentId">
            <el-cascader class="w100" v-model="formData.parentId" :options="menuList"
               :props="{ checkStrictly: true, value: 'id', label: 'title', emitPath: false }" clearable />
         </el-form-item>
         <el-form-item label="菜单类型" prop="type">
            <el-radio v-model="formData.type" label="1" border>菜单</el-radio>
            <el-radio v-model="formData.type" label="2" border>按钮</el-radio>
         </el-form-item>
         <el-form-item label="菜单名称" prop="meta.title" :rules="{ required: true, message: '请输入权限标识', trigger: 'blur' }">
            <el-input v-model="formData.meta.title" placeholder="请输入"></el-input>
         </el-form-item>
         <template v-if="formData.type == '2'">
            <el-form-item label="权限标识" prop="code">
               <el-input v-model="formData.code" placeholder="请输入"></el-input>
            </el-form-item>
         </template>
         <template v-else>
            <el-form-item label="路由地址" prop="path">
               <el-input v-model="formData.path" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="路由名称" prop="name">
               <el-input v-model="formData.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="菜单图标" prop="meta.icon">
               <el-input v-model="formData.meta.icon" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="重定向" prop="redirect">
               <el-input v-model="formData.redirect" placeholder="请输入"></el-input>
            </el-form-item>
            <el-row>
               <el-col :span="8">
                  <el-form-item label="是否外链" prop="isLink">
                     <el-radio-group v-model="formData.isLink" @change="changeIsLink">
                        <el-radio :label="false">否</el-radio>
                        <el-radio :label="true">是</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
               <el-col :span="16" v-if="formData.isLink">
                  <el-form-item label="外链地址" prop="linkTo">
                     <el-input v-model="formData.meta.linkTo" placeholder="请输入"></el-input>
                  </el-form-item>
               </el-col>
            </el-row>
            <el-row>
               <el-col :span="12">
                  <el-form-item label="是否隐藏" prop="meta.hidden"
                     :rules="{ required: true, message: '是否隐藏为必选项', trigger: 'change' }">
                     <el-radio-group v-model="formData.meta.hidden">
                        <el-radio :label="false">不隐藏</el-radio>
                        <el-radio :label="true">隐藏</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item label="是否缓存" prop="meta.cache"
                     :rules="{ required: true, message: '是否缓存为必选项', trigger: 'change' }">
                     <el-radio-group v-model="formData.meta.cache">
                        <el-radio :label="false">不缓存</el-radio>
                        <el-radio :label="true">缓存</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
            </el-row>
            <el-form-item label="排序号" prop="sort">
               <el-input-number v-model="formData.sort" :min="1" :max="10000" style="width: 300px"></el-input-number>
            </el-form-item>
         </template>
         <el-form-item label="备注" prop="remark">
            <el-input v-model="formData.remark" type="textarea" placeholder="请输入"></el-input>
         </el-form-item>
      </el-form>
      <template #footer>
         <el-row justify="center">
            <el-button>取消</el-button>
            <el-button type="primary" @click="submitForm">保存</el-button>
         </el-row>
      </template>
   </el-drawer>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import { getMenuSelect, add, update } from '@/api/system/menu'

const formRef = ref()
const initData = { type: '1', isLink: false, sort: 1, meta: { hidden: false, cache: true, isBreadcrumb: true } }
const state = reactive({
   title: '新增',
   type: 'add' as FormType,
   visible: false,
   loading: false,
   menuList: [],
   formData: {
      // type: '1',
      // meta: {
      //    title: '',
      //    linkTo: ''
      // },
      // code: '',
      meta: {}
   } as SysMenuType
})

const { title, type, visible, loading, menuList, formData } = { ...toRefs(state) }

defineExpose({
   open
})

const emit = defineEmits(['refresh'])

function open(type: FormType, title: string, data = {} as any) {
   state.type = type
   state.title = title
   state.formData = JSON.parse(JSON.stringify({ ...initData, ...data }))
   state.visible = true
   loadMenuSelect()
}

function close() {
   state.visible = false
}

function changeIsLink(val: boolean) {
   if (!val) state.formData.meta.linkTo = ''
}

async function loadMenuSelect() {
   try {
      state.loading = true
      const { data } = await getMenuSelect()
      state.menuList = data
   } catch (error) {

   } finally {
      state.loading = false
   }
}

function submitForm() {
   formRef.value.validate((valid: boolean) => {
      if (!valid) {
         return
      }
      if (state.formData.type == '2') {
         state.formData.path = ''
         state.formData.name = ''
         state.formData.redirect = ''
         state.formData.component = ''
         state.formData.isLink = false
         state.formData.meta.linkTo = ''
         state.formData.meta.icon = ''
         state.formData.meta.hidden = false
         state.formData.meta.cache = false
         state.formData.meta.isBreadcrumd = false
      }
      submitData()
   })
}

async function submitData() {
   try {
      state.loading = true
      let res: any = {}
      if (state.type === 'edit') {
         res = await update(state.formData)
      } else {
         res = await add(state.formData)
      }
      state.loading = false
      alert('操作成功')
      close()
      emit('refresh')
   } finally {
      state.loading = false
   }
}
</script>)

<style scoped lang="scss"></style>