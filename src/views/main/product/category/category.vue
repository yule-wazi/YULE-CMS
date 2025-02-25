<template>
  <div class="category">
    <PageSearch :searchConfig="searchConfig" @resetBtnEmit="handleResetBtnEmit" @searchBtnEmit="handleSearchBtnEmit" />
    <PageContent ref="pagecontentRef" :contentConfig="contentConfig" :dialogConfig="dialogConfig"/>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/pageSearch/pageSearch.vue'
import PageContent from '@/components/pageContent/pageContent.vue'
import searchConfig from './config/searchConfig'
import contentConfig from './config/contentContent'
import dialogConfig from './config/dialogConfig'
import pageHook from '@/hook/pageHook'

const { pagecontentRef, handleResetBtnEmit, handleSearchBtnEmit } = pageHook()
</script>

<style lang="less" scoped>
.category {
  background-color: var(--mainBg-color);
  border-radius: 5px;
}
</style>
