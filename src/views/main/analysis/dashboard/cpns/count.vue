<template>
  <div class="home">
    <div class="header">
      <span class="title">{{ title }}</span>
      <div class="tip">
        <el-tooltip :content="tips" placement="top" effect="dark">
          <el-icon><Warning /></el-icon>
        </el-tooltip>
      </div>
    </div>
    <div ref="count" class="count">{{ number1 }}</div>
    <div class="footer">
      <span class="text">{{ subtitle }}</span>
      <span class="subCount" ref="subCount">{{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CountUp } from 'countup.js'
import { onMounted, ref } from 'vue'

interface IProps {
  amount: string
  title: string
  tips: string
  subtitle: string
  number1: number
  number2: number
}
const props = withDefaults(defineProps<IProps>(), {
  amount: '',
  title: '商品总销量',
  tips: '所有商品的总销量',
  subtitle: '商品总销量',
  number1: 509989,
  number2: 509989
})
const count = ref<HTMLDivElement>()
const subCount = ref<HTMLDivElement>()
onMounted(() => {
  const prefix = props.amount === 'saleroom' ? '￥' : ''
  const countUp1 = new CountUp(count.value!, props.number1, { prefix })
  countUp1.start()
  const countUp2 = new CountUp(subCount.value!, props.number2, { prefix })
  countUp2.start()
})
</script>

<style lang="less" scoped>
.home {
  background-color: var(--mainBg-color);
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  padding: 10px;
  height: 100px;
  .header {
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 20px;
    font-size: 14px;
  }
  .count {
    flex: 1;
    font-size: 28px;
  }
  .footer {
    padding-top: 10px;
    border-top: 1px solid var(--el-border-color-lighter);
  }
}
</style>
