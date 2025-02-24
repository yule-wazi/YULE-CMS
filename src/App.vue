<template>
  <div class="home">
    <el-config-provider :locale="zhCn">
      <RouterView />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<style scoped>
.home {
  height: 100vh;
  width: 100vw;
}
</style>
