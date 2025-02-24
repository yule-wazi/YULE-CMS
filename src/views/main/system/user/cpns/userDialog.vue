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
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="form.realname" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item v-if="!isEdit" label="密码" prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="电话号码" prop="cellphone">
          <el-input v-model="form.cellphone" placeholder="请输入电话号码" />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="form.roleId" placeholder="请选择角色">
            <template v-for="item in roleList" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select v-model="form.departmentId" placeholder="请选择部门">
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
const { roleList, departmentList } = storeToRefs(mainStore)
const form = reactive({
  name: '',
  realname: '',
  cellphone: '',
  password: '',
  roleId: '',
  departmentId: ''
})
const userId = ref(0)
const systemStore = useSystem()
// 表单确定
const confirmBtn = () => {
  centerDialogVisible.value = false
  if (isEdit.value) {
    // // 修改用户
    systemStore.updateUserAction(form, userId.value).then(() => {
      // 重新请求数据
      systemStore.postUserListAction({
        offset: (prop.pageInfo.currentPage - 1) * prop.pageInfo.pageSize,
        size: prop.pageInfo.pageSize
      })
    })
  } else {
    // 创建用户
    systemStore.postNewUserAction(form).then(() => {
      // 重新请求数据
      systemStore.postUserListAction({
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
