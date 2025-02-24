export let firstRoute: any
export function dynamicRouter(userMenu: any) {
  const localAllRoutes: any = []
  // 读取router/main所有ts文件
  const file: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })
  for (const key in file) {
    localAllRoutes.push(file[key].default)
  }
  // 动态路由
  const routes: any[] = []
  firstRoute = undefined //初始化首个动态路由
  let menuInfo = undefined //初始化菜单信息
  for (const menu of userMenu) {
    for (const subMenu of menu.children) {
      const route = localAllRoutes.find((item: { path: any }) => item.path === subMenu.url)
      if (route) {
        // 添加重定向路由（每个菜单的第一位）
        if (menuInfo != menu) {
          menuInfo = menu
          routes.push({ path: menu.url, redirect: route.path, name: menu.url })
        }

        routes.push(route)
      }
      if (!firstRoute) firstRoute = route.path
    }
  }
  return routes
}

// 根据路径查询子菜单
export function mapPathToSubMenu(path: string, userMenu: any) {
  for (const menu of userMenu) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        return subMenu
      }
    }
  }
}

// 根据路径查询菜单
interface ICrumb {
  name: string
  url?: string
}
export function mapPathToCrumb(path: string, userMenu: any) {
  const crumbs: ICrumb[] = []
  for (const menu of userMenu) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        crumbs.push({ name: menu.name, url: menu.url })
        crumbs.push({ name: subMenu.name })
        return crumbs
      }
    }
  }
}
// 获取所有菜单底层id
export function mapSubMenuId(menuList: any) {
  const list: any[] = []
  function _searchChildId(List: any) {
    for (const item of List) {
      if (item.children) {
        _searchChildId(item.children)
      } else {
        list.push(item.id)
      }
    }
  }
  _searchChildId(menuList)
  return list
}
// 获取角色菜单所有权限
export function mapMenuPermission(menuList: any[]) {
  const list: any[] = []
  function _searchChildPermission(List: any[]) {
    for (const item of List) {
      if (item.type === 3) {
        list.push(item.permission)
      } else {
        _searchChildPermission(item.children ?? [])
      }
    }
  }
  _searchChildPermission(menuList)
  return list
}
