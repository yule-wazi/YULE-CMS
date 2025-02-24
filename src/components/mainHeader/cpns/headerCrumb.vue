<template>
  <div class="headerCrumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in crumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.url }">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { mapPathToCrumb } from '@/utils/mapMenus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userMenu = localCache.getCache('userMenu')
const crumbs = computed(() => {
  return mapPathToCrumb(route.path, userMenu)
})
</script>

<style lang="less" scoped>
.headerCrumb {
  display: flex;
  height: 100%;
  align-items: center;
  margin-top: -3px;
  .el-breadcrumb {
    font-size: 14px;
  }
}
</style>
