import {
  getGoodsAddressSale,
  getGoodsAmountList,
  getGoodsCategoryCount,
  getGoodsCategoryFavor,
  getGoodsCategorySale,
  getGoodsSaleTop10
} from '@/service/modules/main/analysis'
import { defineStore } from 'pinia'

interface IAnalysis {
  amountList: any[]
  GoodsCategoryCount: any[]
  getGoodsCategorySale: any[]
  getGoodsCategoryFavor: any[]
  getGoodsAddressSale: any[]
  getGoodsSaleTop10: any[]
}
const useAnalysis = defineStore('analysis', {
  state: (): IAnalysis => ({
    amountList: [],
    GoodsCategoryCount: [],
    getGoodsCategorySale: [],
    getGoodsCategoryFavor: [],
    getGoodsAddressSale: [],
    getGoodsSaleTop10: []
  }),
  actions: {
    async getAllGoodsInfo() {
      const amountList = await getGoodsAmountList()
      this.amountList = amountList.data

      const GoodsCategoryCountRes = await getGoodsCategoryCount()
      this.GoodsCategoryCount = GoodsCategoryCountRes.data

      const getGoodsCategorySaleRes = await getGoodsCategorySale()
      this.getGoodsCategorySale = getGoodsCategorySaleRes.data

      const getGoodsCategoryFavorRes = await getGoodsCategoryFavor()
      this.getGoodsCategoryFavor = getGoodsCategoryFavorRes.data

      const getGoodsAddressSaleRes = await getGoodsAddressSale()
      this.getGoodsAddressSale = getGoodsAddressSaleRes.data

      const getGoodsSaleTop10Res = await getGoodsSaleTop10()
      this.getGoodsSaleTop10 = getGoodsSaleTop10Res.data
    }
  }
})

export default useAnalysis
