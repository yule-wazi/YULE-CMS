<template>
  <div class="userSearch">
    <el-form ref="formRef" size="large" label-width="80px" :model="form">
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" placeholder="请输入查询的用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="form.realname"
              placeholder="请输入查询的真实姓名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input
              v-model="form.cellphone"
              placeholder="请输入查询的电话号码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select v-model="form.enable" placeholder="请选择查询的状态">
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <div class="block">
              <el-date-picker
                v-model="form.createAt"
                type="daterange"
                range-separator=" - "
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                size="large"
                style="width: 100%"
              />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="btn">
        <el-button icon="Refresh" @click="resetBtn">重置</el-button>
        <el-button type="primary" icon="Search" @click="searchBtn"
          >查询</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '1',
  createAt: ''
})
const emit = defineEmits(['searchBtnEmit', 'resetBtnEmit'])
const formRef = ref<InstanceType<typeof ElForm>>()
//重置
const resetBtn = () => {
  formRef.value?.resetFields()
  emit('resetBtnEmit')
}
//查询
const searchBtn = () => {
  emit('searchBtnEmit',form)
}
</script>

<style lang="less" scoped>
.userSearch {
  position: relative;
  padding: 20px 90px;
  height: 170px;

  .el-form-item {
    margin-bottom: 0;
    margin-left: -100px;
    padding: 20px 50px;
  }
  .btn {
    position: absolute;
    display: flex;
    right: 80px;
    bottom: 30px;
  }
}
</style>
