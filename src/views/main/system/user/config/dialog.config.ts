const dialogConfig = {
  pageName: 'users',
  dialogTitle: {
    editTitle: '编辑用户',
    newTitle: '新建用户'
  },
  formList: [
    {
      type: 'input',
      prop: 'name',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      type: 'input',
      prop: 'realname',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      type: 'password',
      prop: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      type: 'input',
      prop: 'cellphone',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      type: 'enable',
      prop: 'enable',
      label: '用户状态',
      placeholder: '请选择用户状态'
    },
    {
      type: 'select',
      prop: 'roleId',
      label: '选择角色',
      placeholder: '请选择角色'
    },
    {
      type: 'select',
      prop: 'departmentId',
      label: '选择部门',
      placeholder: '请选择部门'
    }
  ]
}

export default dialogConfig
