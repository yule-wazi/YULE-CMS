<template>
  <div class="pieEchart">
    <BaseEcharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseEcharts from './baseEcharts.vue'

interface IDirect {
  showGetGoodsCategoryFavor: any
}
const prop = defineProps<IDirect>()
const option = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: prop.showGetGoodsCategoryFavor.name,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        }
      }
    ],
    series: [
      {
        name: '收藏',
        type: 'bar',
        barWidth: '60%',
        data: prop.showGetGoodsCategoryFavor.value
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.pieEchart {
}
</style>
