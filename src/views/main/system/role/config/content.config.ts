const contentConfig = {
  pageName: 'role',
  header: {
    headerTitle: '角色列表',
    buttonTitle: '新建角色'
  },
  pageList: [
    {
      type: 'selection',
      width: '55'
    },
    {
      type: 'index',
      label: '序号',
      width: '55'
    },
    {
      prop: 'name',
      label: '角色名称',
      width: '180'
    },
    {
      prop: 'intro',
      label: '角色权限',
      width: '180'
    },
    {
      type: 'timer',
      prop: 'createAt',
      label: '创建时间'
    },
    {
      type: 'timer',
      prop: 'updateAt',
      label: '更新时间'
    },
    {
      type: 'handle',
      label: '操作',
      width: '120'
    }
  ],
  titleHeader: ['ID', '角色名称', '角色介绍', '创建时间', '更新时间'],
  dataHeader: ['id', 'name', 'intro', 'createAt', 'updateAt']
}

export default contentConfig
