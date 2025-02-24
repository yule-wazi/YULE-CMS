<template>
  <div class="input_account">
    <el-form
      :model="account"
      :rules="rules"
      label-position="right"
      label-width="60px"
      size="large"
      status-icon
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useLogin from '@/stores/modules/login/login'
import type IAccount from '@/types/login'
import { localCache } from '@/utils/cache'
import type { ElForm, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
// 账号信息
const account = reactive<IAccount>({
  name: localCache.getCache('userAccount')?.name ?? '',
  password: localCache.getCache('userAccount')?.password ?? ''
})
// 表单校验
const rules: FormRules = {
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, message: '长度应不少于3个字符', trigger: 'blur' },
    { max: 10, message: '字符长度超过最大限制', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 10, message: '长度应在6到10个字符', trigger: 'blur' }
  ]
}
// 提交信息
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLogin()
const submit = (isRemember: boolean) => {
  // 表单校验
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password
      const userAccount = {
        name: name,
        password: password,
        isRemember
      }
      loginStore.accountLoginAction({ name, password }).then(() => {
        if (isRemember) {
          localCache.setCache('userAccount', userAccount)
        } else {
          userAccount.password = ''
          localCache.setCache('userAccount', userAccount)
        }
        // 首次刷新数据
        loginStore.dynamicAction()
      })
    } else {
      ElMessage.error('请按照正确格式输入后再操作')
    }
  })
}
// 暴露变量
defineExpose({
  account,
  submit
})
</script>

<style lang="less" scoped>
.input_account {
}
</style>
