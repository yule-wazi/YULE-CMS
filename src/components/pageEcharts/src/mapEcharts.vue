<template>
  <div class="pieEchart">
    <BaseEcharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseEcharts from './baseEcharts.vue'
import provinceToCapital from '../utils/provinceToCapital'

interface IMap {
  showGetGoodsAddressSale: any
}
const prop = defineProps<IMap>()
const option = computed(() => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c} (p / km2)'
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: '10%',

      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    visualMap: {
      min: 800,
      max: 50000,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered']
      },
      textStyle: {
        color: '#fff',
        fontsize: 20
      }
    },
    series: [
      {
        type: 'map',
        map: 'China',
        zoom: 1.3,
        top: '20%',
        roam: true,
        label: {
          show: false
        },
        data: provinceToCapital(prop.showGetGoodsAddressSale),
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
