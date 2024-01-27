import { defineStore } from 'pinia'
import { nextTick } from 'vue'
import { Local } from '@/utils/storage'
 
export const useLayoutConfigStore = defineStore('layoutConfig', {
   state: (): LayoutConfigState => {
      return {
         isCollpase: false,
         globalTitle: '梦学谷-vue3全家桶项目',
         isFullScreen: false,
         isDark: false
      }
   },
   getters: {

   },
   actions: {
      updateState(state: LayoutConfigState) {
         this.$patch(state)
      }
   }
})

nextTick(() => {
   const layoutConfig = useLayoutConfigStore()
   layoutConfig.$subscribe((mutation, state) => {
      Local.set('layoutConfig', state)
   })
})
