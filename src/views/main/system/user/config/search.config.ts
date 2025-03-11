const searchConfig = {
  formItem: [
    {
      type: 'input',
      prop: 'name',
      label: '用户名',
      placeholder: '请输入查询的用户名'
    },
    {
      type: 'input',
      prop: 'realname',
      label: '真实姓名',
      placeholder: '请输入查询的真实姓名'
    },
    {
      type: 'input',
      prop: 'cellphone',
      label: '电话号码',
      placeholder: '请输入查询的电话号码'
    },
    {
      type: 'enable',
      prop: 'enable',
      label: '状态',
      placeholder: '请选择查询的状态'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间',
    },
  ]
}

export default searchConfig
