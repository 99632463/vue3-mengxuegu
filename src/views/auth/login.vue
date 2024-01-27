<template>
   <div class="login-container">
      <div class="login-wrap">
         <img class="login-logo" src="@/assets/login-logo.png">
         <div class="login-title">账号登陆</div>
         <el-form class="login-form" ref="formRef" :model="loginData" size="large">
            <el-form-item prop="username">
               <el-input v-model="loginData.username" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item prop="password">
               <el-input v-model="loginData.password" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
               <div class="login-other">
                  <el-checkbox v-model="isRemember">
                     <span>记住密码</span>
                  </el-checkbox>
               </div>
               <el-button class="login-submit" :loading="loading" type="primary" @click="submitForm">登 陆</el-button>
            </el-form-item>
         </el-form>
      </div>
   </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const state = reactive({
   isRemember: false,
   loading: false,
   loginData: {
      username: <string>authStore.rememberData?.username,
      password: <string>authStore.rememberData?.password
   }
})

const { loginData, isRemember, loading } = { ...toRefs(state) }

function submitForm() {
   state.loading = true
   authStore.setRememberPwd(isRemember ? state.loginData : undefined)
   authStore.userLogin(loginData.value)
      .then(() => {
         router.replace({
            path: <string>route.query?.redirect || '/'
         })
      }).finally(() => {
         state.loading = false
      })
}
</script>

<style scoped lang="scss">
.login-container{
   width: 100%;
   height: 100%;
   background: url(@/assets/login-bj.png) no-repeat;
   background-size: cover;
   overflow: hidden;
   display: flex;
   align-items: center;
   .login-wrap{
      width: 410px;
      height: 460px;
      background: #fff;
      padding: 30px;
      margin-right: 130px;
      margin: auto;
      .login-logo{
         max-width: 130px;
         margin: auto;
         display: flex;
      }
      .login-title{
         font-size: 20px;
         height: 70px;
         line-height: 70px;
         text-align: left;
         color: #0d1234;
         letter-spacing: 2px;
      }
      .login-form{
         .el-form-item{
            margin-bottom: 27px;
         }
         .login-other{
            span{
               font-size: 13px;
               color: #999;
            }
         }
         .login-submit{
            width: 100%;
            height: 40px;
            letter-spacing: 3px;
         }
      }
   }
}
</style>