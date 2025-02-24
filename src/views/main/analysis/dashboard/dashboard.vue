<template>
  <div class="dashboard">
    <div class="count">
      <el-row :gutter="10">
        <template v-for="item in amountList" :key="item.amount">
          <el-col :span="6">
            <Count v-bind="item" />
          </el-col>
        </template>
      </el-row>
    </div>
    <div class="echart">
      <el-row :gutter="10">
        <el-col :span="7">
          <EchartCard :title="'分类商品数量(饼图)'">
            <PieEchart :showGoodsCategoryCount="showGoodsCategoryCount" />
          </EchartCard>
        </el-col>
        <el-col :span="10">
          <EchartCard title="不同城市商品销量">
            <MapEcharts :showGetGoodsAddressSale="showGetGoodsAddressSale" />
          </EchartCard>
        </el-col>
        <el-col :span="7">
          <EchartCard title="分类商品数量(玫瑰图)">
            <NightingaleEchart :showGetGoodsSaleTop10="showGetGoodsSaleTop10" />
          </EchartCard>
        </el-col>
        <el-col :span="12">
          <EchartCard title="分类商品销量">
            <LineEchart :showGetGoodsCategorySale="showGetGoodsCategorySale" />
          </EchartCard>
        </el-col>
        <el-col :span="12">
          <EchartCard title="分类商品的收藏">
            <DirectEcharts :showGetGoodsCategoryFavor="showGetGoodsCategoryFavor" />
          </EchartCard>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAnalysis from '@/stores/modules/main/analysis'
import EchartCard from './cpns/echartCard.vue'
import { PieEchart, LineEchart, NightingaleEchart, DirectEcharts, MapEcharts } from '@/components/pageEcharts'
import Count from './cpns/count.vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const analysisStore = useAnalysis()
analysisStore.getAllGoodsInfo()
const {
  amountList,
  GoodsCategoryCount,
  getGoodsSaleTop10,
  getGoodsCategorySale,
  getGoodsCategoryFavor,
  getGoodsAddressSale
} = storeToRefs(analysisStore)

// 分类商品数量
const showGoodsCategoryCount = computed(() => {
  return GoodsCategoryCount.value.map((item) => ({
    value: item.goodsCount,
    name: item.name
  }))
})
// 分类商品top10
const showGetGoodsSaleTop10 = computed(() => {
  return getGoodsSaleTop10.value.map((item) => ({
    value: item.saleCount,
    name: item.name
  }))
})
// 分类商品销量
const showGetGoodsCategorySale = computed(() => {
  const value = getGoodsCategorySale.value.map((item) => item.goodsCount)
  const name = getGoodsCategorySale.value.map((item) => item.name)
  return { value, name }
})
// 分类商品收藏
const showGetGoodsCategoryFavor = computed(() => {
  const value = getGoodsCategoryFavor.value.map((item) => item.goodsFavor)
  const name = getGoodsCategoryFavor.value.map((item) => item.name)
  return { value, name }
})
// 不同城市销量数据
const showGetGoodsAddressSale = computed(() => {
  return getGoodsAddressSale.value.map((item) => ({
    value: item.count,
    name: item.address
  }))
})
</script>

<style lang="less" scoped>
.dashboard {
  
}
</style>
