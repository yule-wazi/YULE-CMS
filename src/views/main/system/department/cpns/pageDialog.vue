<template>
  <div class="userDialog">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isEdit ? `编辑用户` : `新建用户`"
      width="500"
      center
    >
      <el-form
        :model="form"
        label-width="auto"
        style="max-width: 420px"
        size="large"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input v-model="form.leader" placeholder="请输入部门领导" />
        </el-form-item>
        <el-form-item label="选择上级部门" prop="parentId">
          <el-select v-model="form.parentId" placeholder="请选择上级部门">
            <template v-for="item in departmentList" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmBtn"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMain from '@/stores/modules/main/main'
import useSystem from '@/stores/modules/main/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

// 接收父组件
const prop = defineProps({
  pageInfo: {
    type: Object,
    default: () => {}
  }
})
const centerDialogVisible = ref(false)
// 判断是否为编辑模式
const isEdit = ref(false)

const mainStore = useMain()
const { departmentList } = storeToRefs(mainStore)
const form = reactive({
  name: '',
  leader: '',
  parentId: ''
})
const userId = ref(0)
const systemStore = useSystem()
// 表单确定
const confirmBtn = () => {
  centerDialogVisible.value = false
  if (isEdit.value) {
    // // 修改用户
    systemStore.updatePageDepartmentAction(form, userId.value).then(() => {
      // 重新请求数据
      systemStore.postPageDepartmentListAction({
        offset: (prop.pageInfo.currentPage - 1) * prop.pageInfo.pageSize,
        size: prop.pageInfo.pageSize
      })
    })
  } else {
    // 创建用户
    systemStore.postPageNewDepartmentAction(form).then(() => {
      // 重新请求数据
      systemStore.postPageDepartmentListAction({
        offset: 0,
        size: prop.pageInfo.pageSize
      })
    })
  }
}
const showDialog = () => {
  centerDialogVisible.value = true
}
defineExpose({ showDialog, isEdit, form, userId })
</script>

<style lang="less" scoped>
.userDialog {
  :deep(.el-dialog__body) {
    padding: 5px 40px;
  }
  :deep(.el-dialog__header) {
    margin: 20px;
    .el-dialog__title {
      font-size: 30px;
      font-weight: 700;
      margin-left: 30px;
    }
  }
}
</style>
