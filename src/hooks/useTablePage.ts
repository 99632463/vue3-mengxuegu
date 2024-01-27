import { reactive, toRefs, onMounted, nextTick, unref } from 'vue'
import type { Ref } from 'vue'

interface Params {
   disableMounted?: boolean | Ref;
   getPageList: Function;
   deleteById?: Function;
   editRef?: Ref;
}

function useTablePage<T = any, Q = any>(params: Params, emit?: Function, props?: any) {
   const state = reactive({
      loading: false,
      page: {
         current: 1,
         size: 20,
         total: 0,
      } as PageType,
      query: { } as Q,
      tableList: [] as T[]
   })

   onMounted(() => {
      if (unref(params.disableMounted)) return
      queryData()
   })

   async function queryData() {
      return new Promise(async (resolve, reject) => {
         state.loading = true
         const { current, size } = state.page
         const { data } = await params.getPageList(state.query, current, size)
         state.loading = false
         state.tableList = []
         nextTick(() => {
            state.page.total = data.total
            state.tableList = data.records
         })
         resolve(data)
      })
   }

   function handleQuery() {
      state.page.current = 1
      queryData()
   }

   function handleAdd() {
      params.editRef?.value.open('add', '新增')
   }

   function handleEdit(row: T) {
      params.editRef?.value.open('edit', '修改', row)
   }

   function handleDelete(id: string) {

   }

   return {
      ...toRefs(state),
      queryData,
      handleQuery,
      handleAdd,
      handleEdit,
      handleDelete
   }
}

export default useTablePage
export { useTablePage }