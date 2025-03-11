<template>
  <div class="userSearch">
    <el-form ref="formRef" size="large" label-width="80px" :model="form">
      <el-row :gutter="80">
        <template v-for="item in prop.searchConfig.formItem" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="form[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-else-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="form.createAt"
                  type="daterange"
                  range-separator=" - "
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="large"
                  style="width: 100%"
                />
              </template>
              <template v-else-if="item.type === 'enable'">
                <el-select v-model="form.enable" placeholder="请选择查询的状态">
                  <el-option label="启用" value="1" />
                  <el-option label="禁用" value="0" />
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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

interface ISearch {
  searchConfig: {
    formItem: any[]
  }
}
const prop = defineProps<ISearch>()

const formItem: any = {}
for (const item of prop.searchConfig.formItem) {
  formItem[item.prop] = ''
}
const form = reactive(formItem)

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
