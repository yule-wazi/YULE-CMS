<template>
  <div class="list">
    <div class="story">
      <template v-for="item in pageDepartmentList" :key="item.id">
        <ListStory :item="item" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystem from '@/stores/modules/main/system'
import { storeToRefs } from 'pinia'
import ListStory from './cpns/listStory.vue'

const systemStore = useSystem()
systemStore.postPageDepartmentListAction('story', {
  offset: 0,
  size: 100
})
const { pageDepartmentList } = storeToRefs(systemStore)
</script>

<style lang="less" scoped>
.list {
  .story {
    column-count: 4;
    column-gap: 10px;
    break-inside: avoid;
    margin-bottom: 10px;
  }
}
</style>
