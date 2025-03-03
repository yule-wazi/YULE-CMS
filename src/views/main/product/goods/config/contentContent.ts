const contentConfig = {
  pageName: 'goods',
  selectName: 'category',
  header: {
    headerTitle: '商品列表',
    buttonTitle: '新建商品'
  },
  pageList: [
    { type: 'selection', width: '55' },
    { type: 'index', label: '序号', width: '55' },
    { prop: 'name', label: '类别名称', width: '280' },
    { prop: 'oldPrice', label: '原价', width: '55' },
    { prop: 'newPrice', label: '现价', width: '55' },
    { type: 'custom', slotName: 'Img', prop: 'imgUrl', label: '图片', width: '55' },
    { prop: 'inventoryCount', label: '库存', width: '100' },
    { prop: 'saleCount', label: '已售', width: '55' },
    { prop: 'favorCount', label: '收藏', width: '55' },
    { prop: 'address', label: '地址', width: '55' },
    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' },
    { type: 'handle', label: '操作', width: '120' }
  ]
}

export default contentConfig
