<template>
  <div class="user">
    <div class="search">
      <UserSearch
        @searchBtnEmit="handleSearchBtnEmit"
        @resetBtnEmit="handleResetBtnEmit"
      />
    </div>
    <div class="content">
      <UserContent
        ref="userContentRef"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserContent from './cpns/userContent.vue'
import UserSearch from './cpns/userSearch.vue'
const userContentRef = ref<InstanceType<typeof UserContent>>()

// 搜索
const handleSearchBtnEmit = (form: any) => {
  userContentRef.value?.fetchUserListInfo(form)
}
//重置
const handleResetBtnEmit = () => {
  userContentRef.value?.fetchUserListInfo()
}
</script>

<style lang="less" scoped>
.user {
  background-color: var(--mainBg-color);
  border-radius: 5px;
}
</style>
