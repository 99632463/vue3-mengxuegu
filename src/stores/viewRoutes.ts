import { defineStore } from 'pinia'

export const useViewRoutesStore = defineStore('viewRoutes', {
   state: (): ViewRouteState => {
      return {
         cacheRouteNames: []
      }
   },
   actions: {
      setCacheRouteNames(data: string[]) {
         this.cacheRouteNames = data
      }
   }
})