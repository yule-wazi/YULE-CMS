<template>
  <div class="echartCard">
    <div class="title">{{ prop.title }}</div>
    <div class="content">
      <slot>默认的内容</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ICard {
  title: string
}
const prop = defineProps<ICard>()
</script>

<style lang="less" scoped>
.echartCard {
  background-color: var(--mainBg-color);
  margin-top: 10px;
  border-radius: 2px;
  .title {
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    margin-left: 20px;
  }
  .content {
    padding-top: 10px;
    border-top: 1px solid var(--el-border-color-lighter);
  }
}
</style>
