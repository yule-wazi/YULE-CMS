<template>
  <div class="main">
    <el-container class="container">
      <el-aside :width="!isFold ? `220px` : `75px`">
        <mainAside :isFold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="100px">
          <mainHeader @isFold="collapse" />
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import mainAside from '@/components/mainAside/mainAside.vue'
import mainHeader from '@/components/mainHeader/mainHeader.vue'
import { ref } from 'vue'
import { RouterView } from 'vue-router'
// 接收状态
const isFold = ref(false)
const collapse = (flag: boolean) => {
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    .el-aside {
      background-color: var(--bg-color);
      transition: all 0.5s ease;
      overflow: hidden;
    }
    .el-header {
      background-color: var(--bg-color);
      padding: 0;
    }
    .el-main {
      --el-main-padding: 5px;
      background-color: #000;
      color: #fff;
      &::-webkit-scrollbar {
        display: none; /* Chrome、Safari 和新版 Edge */
      }
    }
  }
}
</style>
