<template>
  <div class="user">
    <PageSearch :searchConfig="searchConfig" @searchBtnEmit="handleSearchBtnEmit" @resetBtnEmit="handleResetBtnEmit" />
    <PageContent ref="pagecontentRef" :contentConfig="contentConfig" :dialogConfig="dialogConfig" />
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
