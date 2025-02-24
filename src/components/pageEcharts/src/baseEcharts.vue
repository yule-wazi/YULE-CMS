<template>
  <div class="baseEcharts">
    <div ref="echartRef" class="echart"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref, watchEffect } from 'vue'
import chinaJson from '.././data/china.json'

interface IProp {
  option: any
}
const prop = defineProps<IProp>()

// 基于准备好的dom，初始化echarts实例
const echartRef = ref<HTMLElement>()
onMounted(() => {
  echarts.registerMap('China', chinaJson as any)
  const echartInstance = echarts.init(echartRef.value, 'light', { renderer: 'canvas' })
  // 绘制图表
  watchEffect(() => {
    echartInstance.setOption(prop.option)
  })

  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
})
</script>

<style lang="less" scoped>
.baseEcharts {
  .echart {
    height: 320px;
  }
}
</style>
