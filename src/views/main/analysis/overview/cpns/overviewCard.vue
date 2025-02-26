<template>
  <div class="card">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="content">
      <slot name="content" ></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.card {
  background-color: var(--mainBg-color);
  border-radius: 5px;
  margin-bottom: 10px;
  .title {
    font-size: 20px;
    font-weight: 700;
    height: 60px;
    padding-left: 30px;
    line-height: 60px;
    border-bottom: 2px solid var(--el-border-color-lighter);
  }
  .content {
    font-size: 18px;
    padding: 30px;
  }
}
</style>
