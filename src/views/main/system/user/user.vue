<template>
  <div class="user">
    <PageSearch :searchConfig="searchConfig" @searchBtnEmit="handleSearchBtnEmit" @resetBtnEmit="handleResetBtnEmit" />
    <PageContent ref="pagecontentRef" :contentConfig="contentConfig" :dialogConfig="dialogConfig">
      <template #enableBtn="scope">
        <template v-if="scope.row.enable"><el-button type="primary" plain>启用</el-button></template>
        <template v-else><el-button type="danger" plain>禁用</el-button></template>
      </template>
    </PageContent>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/pageSearch/pageSearch.vue'
import PageContent from '@/components/pageContent/pageContent.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import dialogConfig from './config/dialog.config'
import pageHook from '@/hook/pageHook'

const { pagecontentRef, handleResetBtnEmit, handleSearchBtnEmit } = pageHook()
</script>

<style lang="less" scoped>
.user {
  background-color: var(--mainBg-color);
  border-radius: 5px;
}
</style>
