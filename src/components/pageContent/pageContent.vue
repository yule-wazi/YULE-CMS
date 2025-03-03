<template>
  <div v-if="isQuery" class="userContent">
    <div class="head">
      <div class="title">
        {{ prop.contentConfig.header.headerTitle ?? '数据列表' }}
      </div>
      <div v-if="isCreate" class="addUser">
        <el-button type="primary" @click="createUser">{{
          prop.contentConfig.header.buttonTitle ?? '新建列表'
        }}</el-button>
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
import useSystem from '@/stores/modules/main/system'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import PageDialog from '../pageDialog/pageDialog.vue'
import useMain from '@/stores/modules/main/main'
import type { ElTree } from 'element-plus'
import { mapSubMenuId } from '@/utils/mapMenus'
import permissionHook from '@/hook/permissionHook'

interface IContent {
  contentConfig: {
    pageName: string,
    selectName?: string,
    header: any
    pageList: any[]
    childrenTree?: any
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
const postListInfo = (data?: any) => {
  if (!isQuery) return
  systemStore.postPageDepartmentListAction(prop.contentConfig.pageName, {
    offset: (currentPage.value - 1) * pageSize.value,
    size: pageSize.value,
    ...data
  })
}
postListInfo()
// 新建用户
const mainStore = useMain()
const createUser = () => {
  if (pageDialogRef.value) {
    mainStore.postPageSelectListAction(prop.contentConfig.selectName ?? prop.contentConfig.pageName)
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
