<template>
  <div class="loginForm">
    <div class="title">
      <h1>后台管理系统</h1>
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName" class="demo-tabs" stretch>
        <el-tab-pane name="account">
          <template #label>
            <div class="content">
              <el-icon size="18px"><User /></el-icon>
              <div class="text">账号登陆</div>
            </div>
          </template>
          <InputAccount ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="content">
              <el-icon size="18px"><Cellphone /></el-icon>
              <div class="text">手机登录</div>
            </div>
          </template>
          <InputPhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="other">
      <el-checkbox v-model="remember" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="loginBtn" type="primary" size="large" @click="loginBtn"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import InputAccount from './InputAccount.vue'
import InputPhone from './InputPhone.vue'
import { localCache } from '@/utils/cache'
// 记住密码
const userAccount = localCache.getCache('userAccount')
const remember = ref(userAccount?.isRemember ?? false)
watch(remember, () => {
  if (userAccount) {
    userAccount.isRemember = remember.value
    localCache.setCache('userInfo', userAccount)
  }
})
// tabs控制
const activeName = ref('account')
// 获取子组件变量
const accountRef = ref<InstanceType<typeof InputAccount>>()
// 登录
const loginBtn = () => {
  
  if (activeName.value === 'account') {
    accountRef.value?.submit(remember.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<style lang="less" scoped>
.loginForm {
  width: 400px;
  text-align: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  .title {
    margin-bottom: 20px;
  }
  .tabs {
    height: 200px;
    --el-text-color-primary: #fff;
    --el-text-color-regular: #fff;
    :deep(.el-form-item) {
      margin-bottom: 30px;
    }
    :deep(.el-input__wrapper) {
      background-color: rgba(0, 0, 0, 0);
    }
    :deep(.el-input__inner) {
      color: #000;
      font-size: 18px;
    }
    .content {
      display: flex;
      .text {
        margin-left: 5px;
      }
    }
  }
  .other {
    display: flex;
    width: 100%;
    justify-content: space-between;
    --el-text-color-regular: #fff;
  }
  .loginBtn {
    width: 100%;
    --el-button-size: 50px;
    --el-font-size-base: 18px;
  }
}
</style>
