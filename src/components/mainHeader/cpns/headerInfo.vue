<template>
  <div class="headerInfo">
    <div class="msg">
      <el-icon>
        <Message />
      </el-icon>
    </div>
    <div class="search">
      <el-icon><Search /></el-icon>
    </div>
    <div class="userInfo">
      <el-dropdown class="dropDown">
        <span class="dropDownBtn">
          <el-avatar class="avatar" :size="50" src="/userImg.jpg" />
          <div class="text">{{ loginStore.userInfo.name }}</div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logOff">退出登录</el-dropdown-item>
            <el-dropdown-item divided>个人中心</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import useLogin from '@/stores/modules/login/login'
import { localCache } from '@/utils/cache'

const loginStore = useLogin()
// 登出
const logOff = () => {
  // 删除动态路由
  const loginStore = useLogin()
  loginStore.dynamicAction(true)
  // 删除必要缓存
  localCache.removeCache('token')
  localCache.removeCache('userMenu')
  localCache.removeCache("userInfo")

  router.push('/login')
}
</script>

<style lang="less" scoped>
.headerInfo {
  display: flex;
  font-size: 20px;
  .msg {
    margin-right: 20px;
  }
  .search {
    margin-right: 20px;
  }
  .userInfo {
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;

    // background-color: #fff;
    .dropDown {
      cursor: pointer;
      .dropDownBtn {
        display: flex;
        outline: none;
        justify-content: center;
        align-items: center;
        .avatar {
          width: 35px;
          height: 35px;
          margin-right: 8px;
        }
        .text {
          font-size: 15px;
          color: #fff;
        }
      }
    }
  }
}
</style>
