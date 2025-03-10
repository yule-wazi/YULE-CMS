<template>
  <div v-if="isQuery" class="userContent">
    <div class="head">
      <div class="title">
        {{ prop.contentConfig.header.headerTitle ?? '数据列表' }}
      </div>
      <div class="handleBtn">
        <div v-if="isCreate" class="uploadUser">
          <form ref="uploadForm">
            <input ref="uploadInput" class="upload" type="file" @change="uploadClick" accept=".xlsx, .xls" />
          </form>
          <el-button type="warning" @click="uploadShow" plain>
            <span class="icon">
              <el-icon><Download /></el-icon>
            </span>
            导入
          </el-button>
          <UploadDialog ref="uploadDialog" @uploadClickEmit="uploadInputClick" @importClickEmit="importInputClick" />
        </div>
        <div v-if="prop.contentConfig.dataHeader" class="exportUser">
          <el-button type="success" @click="exportExcel" plain>
            <span class="icon">
              <el-icon><Upload /></el-icon>
            </span>
            导出
          </el-button>
        </div>
        <div v-if="isCreate" class="addUser">
          <el-button type="primary" @click="createUser">
            <span class="icon">
              <el-icon><Plus /></el-icon>
            </span>
            {{ prop.contentConfig.header.buttonTitle ?? '新建列表' }}</el-button
          >
        </div>
      </div>
    </div>
    <div class="table">
      <el-table :data="pageDepartmentList" border style="width: 100%" v-bind="prop.contentConfig.childrenTree">
        <template v-for="item in prop.contentConfig.pageList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handle'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                <el-button v-if="isUpdate" type="primary" icon="Edit" circle @click="editUser(scope.row)" />
                <el-button v-if="isDelete" type="danger" icon="Delete" circle @click="deleteUser(scope.row.id)" />
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item" show-overflow-tooltip align="center"></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:pageSize="pageSize"
        :page-sizes="[10, 20, 30]"
        size="large"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount ?? 4"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <PageDialog
      class="pageDialog"
      ref="pageDialogRef"
      :pageInfo="{ currentPage, pageSize }"
      :dialogConfig="dialogConfig"
      :otherInfo="otherInfo"
    >
      <template #menuList>
        <el-tree
          ref="ElTreeRef"
          style="max-width: 600px"
          :data="menuList"
          @check="elTreeCheck"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
        />
      </template>
    </PageDialog>
  </div>
  <div v-else class="userContent">
    <h2>抱歉，您没有访问该内容的权限哦~</h2>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { storeToRefs } from 'pinia'
import PageDialog from '../pageDialog/pageDialog.vue'
import UploadDialog from '../uploadDialog/uploadDialog.vue'
import useSystem from '@/stores/modules/main/system'
import useMain from '@/stores/modules/main/main'
import type { ElTree } from 'element-plus'
import { formatUTC } from '@/utils/format'
import { mapSubMenuId } from '@/utils/mapMenus'
import { export_json_to_excel, formatData } from '@/utils/exportToExcel'
import { readerData } from '@/utils/uploadToExcel'
import permissionHook from '@/hook/permissionHook'

interface IContent {
  contentConfig: {
    pageName: string
    selectName?: string
    header: any
    pageList: any[]
    childrenTree?: any
    titleHeader?: string[]
    dataHeader?: string[]
    templateHeader?: string[]
  }
  dialogConfig: {
    pageName: string
    dialogTitle: any
    formList: any[]
  }
}
const prop = defineProps<IContent>()
const systemStore = useSystem()
const { pageDepartmentList, pageTotalCount } = storeToRefs(systemStore)
const currentPage = ref(1)
const pageSize = ref(10)
const pageDialogRef = ref<InstanceType<typeof PageDialog>>()
//  展示权限控制
const isCreate = permissionHook(`${prop.contentConfig.pageName}:create`)
const isDelete = permissionHook(`${prop.contentConfig.pageName}:delete`)
const isQuery = permissionHook(`${prop.contentConfig.pageName}:query`)
const isUpdate = permissionHook(`${prop.contentConfig.pageName}:update`)

// 获取用户
const postListInfo = (data?: any, exportNumber?: number) => {
  if (!isQuery) return
  // 用exportNumber来判断是否为导出文件，若数字不为0则将只拿取list返回值并返回
  return systemStore.postPageDepartmentListAction(
    prop.contentConfig.pageName,
    {
      offset: exportNumber ? 0 : (currentPage.value - 1) * pageSize.value,
      size: exportNumber ?? pageSize.value,
      ...data
    },
    Boolean(exportNumber)
  )
}
postListInfo()

const uploadInput = ref<HTMLElement>()
const uploadForm = ref<HTMLFormElement>()
const uploadDialog = ref<InstanceType<typeof UploadDialog>>()
// 展示导入弹窗
const uploadShow = () => {
  // 清空上一次传入的文件
  uploadForm.value?.reset()
  uploadDialog.value!.toggleDialog()
}
// 导入模板确定
const uploadInputClick = () => {
  uploadDialog.value!.toggleDialog()
  uploadInput.value!.click()
}
//导入Excel模板
async function uploadClick(event: any) {
  const files = event.target.files
  const rawFile = files[0] // only use files[0]
  if (!rawFile) return
  const data = (await readerData(rawFile)) as any[]
  //创建请求
  await data.forEach((item) => systemStore.postPageNewDepartmentAction(prop.contentConfig.pageName, item))
  // 重新请求数据
  mainStore.postMenuListAction()
  systemStore.postPageDepartmentListAction(prop.contentConfig.pageName, {
    offset: 0,
    size: pageSize.value
  })
}
// 导出Excel表格
const exportExcel = (isTemplate?: any) => {
  if (isTemplate && prop.contentConfig.templateHeader) {
    export_json_to_excel({
      header: prop.contentConfig.templateHeader,
      data: [],
      filename: `${prop.contentConfig.pageName}——导入模板`,
      autoWidth: true,
      bookType: 'xlsx'
    })
  } else if (!isTemplate && prop.contentConfig.titleHeader && prop.contentConfig.dataHeader) {
    const titleHeader = prop.contentConfig.titleHeader
    const dataHeader = prop.contentConfig.dataHeader
    postListInfo(undefined, pageTotalCount.value)?.then((response) => {
      const data = formatData(response, dataHeader)
      export_json_to_excel({
        header: titleHeader,
        data,
        filename: `YULE-CMS——${prop.contentConfig.pageName}`,
        autoWidth: true,
        bookType: 'xlsx'
      })
    })
  }
}
// 导出Excel模板
const importInputClick = () => {
  exportExcel(true)
}
// 新建用户
const mainStore = useMain()
const createUser = () => {
  if (pageDialogRef.value) {
    mainStore.postPageSelectListAction(prop.contentConfig.selectName ?? prop.contentConfig.pageName, {
      size: pageTotalCount.value
    })
    pageDialogRef.value.showDialog()
    pageDialogRef.value.isEdit = false
    // 清空表单勾选框
    nextTick(() => {
      ElTreeRef.value?.setCheckedKeys([])
    })
    // 清空表单内容
    const form: any = pageDialogRef.value.form
    for (const key in form) {
      form[key] = ''
    }
  }
}
//删除用户
const deleteUser = (id: number) => {
  systemStore.deletePageDepartmentAction(prop.contentConfig.pageName, id).then(() => {
    // 重新请求数据
    mainStore.postMenuListAction()
    systemStore.postPageDepartmentListAction(prop.contentConfig.pageName, {
      offset: (currentPage.value - 1) * pageSize.value,
      size: pageSize.value
    })
  })
}
const ElTreeRef = ref<InstanceType<typeof ElTree>>()
// 编辑用户
const editUser = (userInfo: any) => {
  if (pageDialogRef.value) {
    mainStore.postPageSelectListAction(prop.contentConfig.selectName ?? prop.contentConfig.pageName)
    pageDialogRef.value.showDialog()
    pageDialogRef.value.isEdit = true
    pageDialogRef.value.userId = userInfo.id
    // 填充表单勾选框
    nextTick(() => {
      ElTreeRef.value?.setCheckedKeys(mapSubMenuId(userInfo.menuList))
    })
    const form: any = pageDialogRef.value.form
    // 填充表单内容
    for (const key in form) {
      form[key] = userInfo[key]
    }
  }
}
// 分页器
const handleSizeChange = () => {
  postListInfo()
}
const handleCurrentChange = () => {
  postListInfo()
}
//获取menu列表
mainStore.postMenuListAction()
const { menuList } = storeToRefs(mainStore)
// 点击menu复选框
const otherInfo: any = {}
const elTreeCheck = (data1: any, data2: any) => {
  otherInfo.menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
}

// 暴露函数
defineExpose({ postListInfo })
</script>

<style lang="less" scoped>
.userContent {
  padding: 25px;
  border-top: 2px solid #666;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: end;
    .title {
      font-size: 25px;
    }
    .handleBtn {
      display: flex;
      .uploadUser {
        margin-right: 10px;
        .icon {
          margin-right: 5px;
        }
        .upload {
          display: none;
        }
      }
      .exportUser {
        margin-right: 10px;
        .icon {
          margin-right: 5px;
        }
      }
      .addUser {
        .icon {
          margin-right: 5px;
        }
      }
    }
  }
  .table {
    margin-top: 15px;
  }
  .page {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
}
</style>
