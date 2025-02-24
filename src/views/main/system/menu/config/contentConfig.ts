const contentConfig = {
  pageName: 'menu',
  header: {
    headerTitle: '菜单列表',
    buttonTitle: '新建菜单'
  },
  pageList: [
    { label: '菜单名称', prop: 'name', width: '180' },
    { label: '级别', prop: 'type', width: '60' },
    { label: '菜单url', prop: 'url', width: '200' },
    { label: '菜单ico', prop: 'icon', width: '200' },
    { label: '排序', prop: 'sort', width: '80' },
    { label: '权限', prop: 'permission', width: '220' },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handle', label: '操作', width: '120' }
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: { children: 'children', hasChildren: 'hasChildren' }
  }
}

export default contentConfig
