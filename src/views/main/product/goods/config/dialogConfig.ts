const dialogConfig = {
  pageName: 'goods',
  dialogTitle: {
    editTitle: '编辑商品',
    newTitle: '新建商品'
  },
  formList: [
    {
      type: 'input',
      prop: 'name',
      label: '商品名称',
      placeholder: '请输商品名称'
    },
    {
      type: 'select',
      prop: 'categoryId',
      label: '商品类别',
      placeholder: '请选择品类别'
    },
    {
      type: 'input',
      prop: 'oldPrice',
      label: '原价',
      placeholder: '请输入原始价格'
    },
    {
      type: 'input',
      prop: 'newPrice',
      label: '现价',
      placeholder: '请输入现在价格'
    },
    {
      type: 'input',
      prop: 'desc',
      label: '商品描述',
      placeholder: '请输入商品描述'
    },
    {
      type: 'input',
      prop: 'status',
      label: '状态',
      placeholder: '请输商品类别名称'
    },
    {
      type: 'input',
      prop: 'imgUrl',
      label: '图片',
      placeholder: '请输入(有效)图片链接'
    },
    {
      type: 'input',
      prop: 'inventoryCount',
      label: '库存',
      placeholder: '请输入商品库存'
    },
    {
      type: 'input',
      prop: 'saleCount',
      label: '已售',
      placeholder: '请输入商品销售额'
    },
    {
      type: 'input',
      prop: 'favorCount',
      label: '收藏',
      placeholder: '请输入商品收藏量'
    },
    {
      type: 'input',
      prop: 'address',
      label: '地址',
      placeholder: '请输入商品地址'
    },
  ]
}

export default dialogConfig
