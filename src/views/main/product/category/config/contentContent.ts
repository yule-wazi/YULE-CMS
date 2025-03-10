const contentConfig = {
  pageName: 'category',
  header: {
    headerTitle: '商品类别列表',
    buttonTitle: '新建商品类别'
  },
  pageList: [
    { type: 'selection', width: '55' },
    { type: 'index', label: '序号', width: '55' },
    { prop: 'name', label: '类别名称', width: '180' },
    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' },
    { type: 'handle', label: '操作', width: '120' }
  ],
  titleHeader: ['ID', '类别名称', '创建时间', '更新时间'],
  dataHeader: ['id', 'name', 'createAt', 'updateAt'],
  templateHeader: ['name']
}

export default contentConfig
