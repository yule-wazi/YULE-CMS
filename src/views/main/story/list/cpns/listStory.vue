<template>
  <div class="story">
    <div ref="titleRef" class="title">{{ item.title }}</div>
    <div ref="contentRef" class="content"></div>
    <div class="time">{{ formatUTC(item.createAt) }}</div>
  </div>
</template>

<script setup lang="ts">
import { formatUTC } from '@/utils/format'
import { onMounted, ref } from 'vue'
interface IStory {
  item: any
}
const prop = defineProps<IStory>()
const contentRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
onMounted(() => {
  if (titleRef.value) {
    titleRef.value.innerHTML = prop.item.title
  }
  if (contentRef.value) {
    contentRef.value.innerHTML = prop.item.content
  }
})
</script>

<style lang="less" scoped>
.story {
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: var(--mainBg-color);
  border-radius: 5px;
  .title {
    height: 40px;
    font-weight: 700;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    border-bottom: 2px var(--el-border-color-lighter) solid;
  }
  .content {
    padding: 10px;
    text-align: justify;
    overflow: auto;
    font-size: 18px;
    text-indent: 2em;
  }
  .time {
    height: 20px;
    font-size: 14px;
    padding: 5px;
    right: 10xp;
    bottom: 10px;
    display: flex;
    justify-content: right;
  }
}
</style>
