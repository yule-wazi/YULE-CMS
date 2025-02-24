<template>
  <div class="menu">
    <PageContent :contentConfig="contentConfig" :dialogConfig="dialogConfig"/>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/pageContent/pageContent.vue'
import contentConfig from './config/contentConfig'
import dialogConfig from './config/dialogConfig'
</script>

<style lang="less" scoped>
.menu {
  background-color: var(--mainBg-color);
  border-radius: 5px;
}
</style>
