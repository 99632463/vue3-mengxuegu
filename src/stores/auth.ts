import { defineStore } from 'pinia'
import { login } from '@/api/auth'
import { Session, Local } from '@/utils/storage'
import type { RouteRecordRaw } from 'vue-router'

export enum Key {
   rememberKey = 'isRemember',
   accessTokenKey = 'accessToken',
   userInfoKey = 'userInfo'
}

export const useAuthStore = defineStore('auth', {
   state: (): AuthState<RouteRecordRaw> => {
      return {
         accessToken: Session.get(Key.accessTokenKey),
         rememberData: Local.get(Key.rememberKey),
         userInfo: Local.get(Key.userInfoKey),
         buttonList: [],
         menuList: []
      }
   },
   getters: {

   },
   actions: {
      setRememberPwd(data?: LoginData) {
         this.rememberData = data
         if(data) {
            Local.set(Key.rememberKey, data)   
         } else {
            Local.remove(Key.rememberKey)
         }
      },
      userLogin(loginData: LoginData) {
         return new Promise((resolve, reject) => {
            login(loginData)
               .then(res => {
                  const { data: { access_token } } = res
                  this.accessToken = access_token
                  Session.set(Key.accessTokenKey, access_token)
                  resolve(res)
               }).catch((err: Error) => {
                  reject(err)
               })
         })
      },
      async setUserInfo(data: UserInfo) {
         this.userInfo = data
         Local.set(Key.userInfoKey, this.userInfo)
      },
      async setButtonList(data: string[]) {
         this.buttonList = data
      },
      async setMenuList(data: RouteRecordRaw[]) {
         this.menuList = data
      }
   }
})

