<template>
  <div class="pieEchart">
    <BaseEcharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue'
import BaseEcharts from './baseEcharts.vue'

interface IDirect {
  showGetGoodsCategoryFavor: any
}
const prop = defineProps<IDirect>()

interface IData {
  name: any[],
  value: any[]
}
const data:IData = {
  name: [],
  value: []
}
const newData:IData = reactive({
  name: [],
  value: []
})
watchEffect(() => {
  data.name = prop.showGetGoodsCategoryFavor.name
  data.value = prop.showGetGoodsCategoryFavor.value
  // 删除值为空的元素
  data.value.forEach((item,index) => {
    if (!item) {
      data.name.splice(index, 1)
      data.value.splice(index, 1)
    }
  })
  newData.name = data.name.splice(0, 5)
  newData.value = data.value.splice(0, 5)
})

const dynamicData = (data: any) => {
  newData.name.push(data.name.shift())
  newData.value.push(data.value.shift())

  data.name.push(newData.name.shift())
  data.value.push(newData.value.shift())
}

setInterval(() => {
  dynamicData(data)
}, 2000);

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
        data: newData.name,
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
        data: newData.value
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.pieEchart {
}
</style>
