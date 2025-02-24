<template>
  <div class="input_phone">
    <el-form
      :model="Phone"
      label-position="right"
      label-width="60px"
      size="large"
      status-icon
    >
      <el-form-item label="手机号">
        <el-input v-model="phone.number" />
      </el-form-item>
      <div class="verify">
        <el-form-item label="验证码">
          <el-input v-model="phone.verify" style="width: 220px" />
          <el-button  plain>获取验证码</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { Phone } from '@element-plus/icons-vue'
import { reactive } from 'vue'
const phone = reactive({
  number: '',
  verify: ''
})
</script>

<style lang="less" scoped>
.input_phone {
  .verify {
    :deep(.el-form-item__content) {
      display: flex;
      justify-content: space-between;
    }
    :deep(.el-button) {
      background-color: rgba(0, 0, 0, 0);
    }
  }
}
</style>
