<template>
  <div class="userDialog">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isEdit ? prop.dialogConfig.dialogTitle.editTitle : prop.dialogConfig.dialogTitle.newTitle"
      width="500"
      center
    >
      <el-form :model="form" label-width="auto" style="max-width: 420px" size="large">
        <template v-for="item in prop.dialogConfig.formList" :key="item.prop">
          <template v-if="item.type === 'input'">
            <el-form-item v-bind="item">
              <el-input v-model="form[item.prop]" :placeholder="item.placeholder" />
            </el-form-item>
          </template>
          <template v-else-if="item.type === 'select'">
            <el-form-item v-bind="item">
              <el-select v-model="form[item.prop]" :placeholder="item.placeholder">
                <template v-for="select in PageList" :key="select.value">
                  <el-option :label="select.name" :value="select.id" />
                </template>
              </el-select>
            </el-form-item>
          </template>
          <template v-else-if="item.type === 'custom'">
            <slot :name="item.slotName"></slot>
          </template>
        </template>
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

interface IDialog {
  pageInfo: any
  dialogConfig: {
    pageName: string
    dialogTitle: any
    formList: any[]
  }
  otherInfo?: any
}

// 接收父组件
const prop = defineProps<IDialog>()
const centerDialogVisible = ref(false)
// 判断是否为编辑模式
const isEdit = ref(false)

const mainStore = useMain()
const { PageList } = storeToRefs(mainStore)

const formList: any = {}
const dialogFormList: any = prop.dialogConfig.formList
for (const key of dialogFormList) {
  if (key.prop) {
    formList[key.prop] = ''
  }
}

const form = reactive(formList)
const userId = ref(0)
const systemStore = useSystem()
// 表单确定
let formInfo = form
const confirmBtn = () => {
  centerDialogVisible.value = false

  if (prop.otherInfo) {
    formInfo = { ...formInfo, ...prop.otherInfo }
  }

  if (isEdit.value) {
    // // 修改用户
    systemStore.updatePageDepartmentAction(prop.dialogConfig.pageName, formInfo, userId.value).then(() => {
      // 重新请求数据
      mainStore.postMenuListAction()
      systemStore.postPageDepartmentListAction(prop.dialogConfig.pageName, {
        offset: (prop.pageInfo.currentPage - 1) * prop.pageInfo.pageSize,
        size: prop.pageInfo.pageSize
      })
    })
  } else {
    // 创建用户
    systemStore.postPageNewDepartmentAction(prop.dialogConfig.pageName, formInfo).then(() => {
      // 重新请求数据
      mainStore.postMenuListAction()
      systemStore.postPageDepartmentListAction(prop.dialogConfig.pageName, {
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
