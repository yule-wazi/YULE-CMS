<template>
  <div class="mainAside">
    <div class="title">
      <div class="Img"><img src="/favicon.ico" alt="" /></div>
      <div v-show="!isFold" class="text">YULE-CMS</div>
    </div>
    <div class="menu">
      <el-menu
        :default-active="active"
        class="el-menu-vertical-demo"
        :collapse="isFold"
      >
        <template v-for="item in login.userMenu" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon
                ><component :is="item.icon.split('-icon-')?.[1]"
              /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="`${subItem.id}`"
                @click="itemEnter(subItem)"
              >
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import useLogin from '@/stores/modules/login/login'
import { mapPathToSubMenu } from '@/utils/mapMenus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const login = useLogin()

// 接收状态
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
// 点击切换路由
const itemEnter = (subItem: any) => {
  router.push(subItem.url)
}
// 菜单自动跳转
const route = useRoute()
const loginStore = useLogin()
const userMenu = loginStore.userMenu
let activeMenu = mapPathToSubMenu(route.path, userMenu)

const active = computed(() => {
  activeMenu = mapPathToSubMenu(route.path, userMenu)
  return activeMenu.id + ''
})
</script>

<style lang="less" scoped>
.mainAside {
  width: 220px;
  .title {
    display: flex;
    justify-content: left;
    align-items: center;
    height: 70px;
    width: 100%;
    .Img {
      width: 40px;
      height: 40px;
      // border-radius: 50%;
      margin-left: 10px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      font-size: 20px;
      margin-left: 20px;
      font-weight: 700;
      color: #2a92ff;
    }
  }
  .menu {
    :deep(.el-menu-item) {
      padding-left: 60px;
    }
    :deep(.el-menu-item:focus) {
      background-color: var(--primary-bg-color);
    }
  }
}
</style>
