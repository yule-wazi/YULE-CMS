<template>
  <div class="mainHeader">
    <div class="tab">
      <div class="left">
        <div class="fold" @click="collapse">
          <el-icon><component :is="isFold ? `Fold` : `Expand`" /></el-icon>
        </div>
        <div class="breadcrumb">
          <HeaderCrumb/>
        </div>
      </div>
      <div class="right">
        <div class="info"><headerInfo /></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineEmits } from 'vue'
import headerInfo from './cpns/headerInfo.vue'

const emit = defineEmits(['isFold'])

const isFold = ref(false)
const collapse = () => {
  isFold.value = !isFold.value
  emit('isFold', isFold.value)
}
</script>

<style lang="less" scoped>
.mainHeader {
  width: 100%;
  .tab {
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    border-bottom: 1px #666 solid;
    justify-content: space-between;
    color: #fff;
    line-height: 50px;

    .left {
      display: flex;
      margin-left: 20px;
      .fold {
        margin-right: 20px;
        font-size: 25px;
        :hover {
          color: var(--primary-color);
        }
      }
      .breadcrumb {
      }
    }
    .right {
      margin-right: 20px;
      .info {
      }
    }
  }
}
</style>
