const dialogConfig = {
  pageName: 'department',
  dialogTitle: {
    editTitle: '编辑用户',
    newTitle: '新建用户'
  },
  formList: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入部门名称'
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入部门领导'
    },
    {
      type: 'select',
      prop: 'parentId',
      label: '上级部门',
      placeholder: '请选择上级部门',
      selects: []
    }
  ]
}

export default dialogConfig
