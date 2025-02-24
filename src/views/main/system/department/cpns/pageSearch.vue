<template>
  <div class="userSearch">
    <el-form ref="formRef" size="large" label-width="80px" :model="form">
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入查询的部门名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="form.leader" placeholder="请输入查询的部门领导" />
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
        <el-button type="primary" icon="Search" @click="searchBtn">查询</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  createAt: '',
  leader: ''
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
  console.log(form)
  emit('searchBtnEmit', form)
}
</script>

<style lang="less" scoped>
.userSearch {
  position: relative;
  height: 170px;
  padding: 20px 90px;

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
