<template>
  <div class="userContent">
    <div class="head">
      <div class="title">用户列表</div>
      <div class="addUser">
        <el-button type="primary" @click="createUser">新建用户</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="55" align="center" />
        <el-table-column
          prop="name"
          label="用户名"
          width="120"
          align="center"
        />
        <el-table-column
          prop="realname"
          label="真实姓名"
          width="120"
          align="center"
        />
        <el-table-column prop="cellphone" label="电话号码" align="center" />
        <el-table-column prop="enable" label="状态" width="100" align="center">
          <template #default="scope">
            <el-button
              :type="scope.row.enable ? 'primary' : 'danger'"
              plain
              size="small"
            >
              {{ scope.row.enable ? '启动' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="创建时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              icon="Edit"
              circle
              @click="editUser(scope.row)"
            />
            <el-button
              type="danger"
              icon="Delete"
              circle
              @click="deleteUser(scope.row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:pageSize="pageSize"
        :page-sizes="[10, 20, 30]"
        size="large"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <UserDialog ref="userDialogRef" :pageInfo="{ currentPage, pageSize }" />
  </div>
</template>

<script setup lang="ts">
import useSystem from '@/stores/modules/main/system'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import UserDialog from './userDialog.vue'
const systemStore = useSystem()
const { usersList, totalCount } = storeToRefs(systemStore)
const currentPage = ref(1)
const pageSize = ref(10)

const userDialogRef = ref<InstanceType<typeof UserDialog>>()
// 获取用户
const fetchUserListInfo = (data?: any) => {
  systemStore.postUserListAction({
    offset: (currentPage.value - 1) * pageSize.value,
    size: pageSize.value,
    ...data
  })
}
fetchUserListInfo()
// 新建用户
const createUser = () => {
  if (userDialogRef.value) {
    userDialogRef.value?.showDialog()
    userDialogRef.value!.isEdit = false
    // 清空表单内容
    const form: any = userDialogRef.value.form
    for (const key in form) {
      form[key] = ''
    }
  }
}
//删除用户
const deleteUser = (id: number) => {
  systemStore.deleteUserListAction(id).then(() => {
    
    // 重新请求数据
    systemStore.postUserListAction({
      offset: (currentPage.value - 1) * pageSize.value,
      size: pageSize.value
    })
  })
}
// 编辑用户
const editUser = (userInfo: any) => {
  if (userDialogRef.value) {
    userDialogRef.value.showDialog()
    userDialogRef.value.isEdit = true
    userDialogRef.value.userId = userInfo.id
    // 填充表单内容
    const form: any = userDialogRef.value.form
    for (const key in form) {
      form[key] = userInfo[key]
    }
  }
}
// 分页器
const handleSizeChange = () => {
  fetchUserListInfo()
}
const handleCurrentChange = () => {
  fetchUserListInfo()
}
// 暴露函数
defineExpose({ fetchUserListInfo })
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
