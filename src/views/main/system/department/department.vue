<template>
  <div class="department">
    <PageSearch @searchBtnEmit="handleSearchBtnEmit" @resetBtnEmit="handleResetBtnEmit" :searchConfig="searchConfig" />
    <PageContent ref="pagecontentRef" :contentConfig="contentConfig" :dialogConfig="dialogConfig"/>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/pageContent/pageContent.vue'
import PageSearch from '@/components/pageSearch/pageSearch.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import pageHook from '@/hook/pageHook'
import dialogConfig from './config/dialog.config'

const { pagecontentRef, handleResetBtnEmit, handleSearchBtnEmit } = pageHook()
</script>

<style lang="less" scoped>
.department {
  background-color: var(--mainBg-color);
  border-radius: 5px;
}
</style>
