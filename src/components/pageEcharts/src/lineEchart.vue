<template>
  <div class="pieEchart">
    <BaseEcharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseEcharts from './baseEcharts.vue'

interface ILine {
  showGetGoodsCategorySale: any
}
const prop = defineProps<ILine>()
const option = computed(() => {
  return {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: prop.showGetGoodsCategorySale.name,
      axisLabel: {
        textStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        textStyle: {
          color: '#fff'
        }
      }
    },
    series: [
      {
        data: prop.showGetGoodsCategorySale.value,
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.pieEchart {
}
</style>
