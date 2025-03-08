const contentConfig = {
  pageName: 'department',
  header: {
    headerTitle: '部门列表',
    buttonTitle: '新建部门'
  },
  pageList: [
    { type: 'selection', width: '55' },
    { type: 'index', label: '序号', width: '55' },
    { prop: 'name', label: '部门名称', width: '180' },
    { prop: 'leader', label: '部门领导', width: '180' },
    { prop: 'parentId', label: '上级部门', width: '180' },
    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' },
    { type: 'handle', label: '操作', width: '120' }
  ],
  titleHeader: ['ID', '部门名称', '部门领导', '创建事件', '更新事件'],
  dataHeader: ['id','name', 'leader', 'createAt', 'updateAt']
}

export default contentConfig
