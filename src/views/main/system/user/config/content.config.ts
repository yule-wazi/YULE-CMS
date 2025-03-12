const contentConfig = {
  pageName: 'users',
  selectName: 'role',
  header: {
    headerTitle: '用户列表',
    buttonTitle: '新建用户'
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
      label: '用户名',
      width: '180'
    },
    {
      prop: 'realname',
      label: '真实姓名',
      width: '180'
    },
    {
      prop: 'cellphone',
      label: '电话号码',
      width: '180'
    },
    {
      type: 'custom',
      slotName: 'enableBtn',
      prop: 'enable',
      label: '状态',
      width: '100'
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
  titleHeader: ['ID', '用户名', '真实姓名', '电话号码', '状态', '创建时间', '更新时间'],
  dataHeader: ['id', 'name', 'realname', 'cellphone', 'enable', 'createAt', 'updateAt'],
  templateHeader: ['name', 'realname', 'password', 'cellphone', 'departmentId', 'roleId']
}

export default contentConfig
