const dialogConfig = {
  pageName: 'role',
  dialogTitle: {
    editTitle: '编辑角色',
    newTitle: '新建角色'
  },
  formList: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      type: 'input',
      prop: 'intro',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'custom',
      slotName: 'menuList'
    }
  ]
}

export default dialogConfig
