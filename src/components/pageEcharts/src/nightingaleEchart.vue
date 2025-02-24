<template>
  <div class="pieEchart">
    <BaseEcharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseEcharts from './baseEcharts.vue'

interface INightNgale {
  showGetGoodsSaleTop10: any
}
const prop = defineProps<INightNgale>()
const option = computed(() => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'left',
      top: 'bottom',
      data: []
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: [20, 140],
        center: ['50%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 5
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: prop.showGetGoodsSaleTop10
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.pieEchart {
}
</style>
