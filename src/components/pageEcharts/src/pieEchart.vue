<template>
  <div class="pieEchart">
    <BaseEcharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseEcharts from './baseEcharts.vue'

interface IPie {
  showGoodsCategoryCount: any
}
const prop = defineProps<IPie>()
const option = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },

    legend: {
      left: 'center',
      textStyle: {
        color: '#fff',
        fontsize: 20
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: prop.showGoodsCategoryCount,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.pieEchart {
}
</style>
