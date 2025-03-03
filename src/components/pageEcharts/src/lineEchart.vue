<template>
  <div class="pieEchart">
    <BaseEcharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue'
import BaseEcharts from './baseEcharts.vue'

interface ILine {
  showGetGoodsCategorySale: any
}
const prop = defineProps<ILine>()

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
  data.name = prop.showGetGoodsCategorySale.name
  data.value = prop.showGetGoodsCategorySale.value
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
}, 3000);

const option = computed(() => {
  return {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: newData.name,
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
        data: newData.value,
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
