<template>
  <div class="goods">
    <PageSearch :searchConfig="searchConfig" @searchBtnEmit="handleSearchBtnEmit" @resetBtnEmit="handleResetBtnEmit" />
    <PageContent ref="pagecontentRef" :contentConfig="contentConfig" :dialogConfig="dialogConfig">
      <template #Img="scope">
        <div class="imgElem">
          <img :src="scope.row.imgUrl" alt="" />
        </div>
      </template>
    </PageContent>
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
.goods {
  background-color: var(--mainBg-color);
  border-radius: 5px;
  .imgElem {
    height: 50px;
    width: 40px;
    img {
      object-fit: contain;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
