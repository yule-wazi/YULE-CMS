import { accountLogin, userInfoById, userMenuById } from '@/service/modules/login/login'
import type IAccount from '@/types/login'
import { localCache } from '@/utils/cache'
import { defineStore } from 'pinia'
import router from '@/router'
import { dynamicRouter, firstRoute, mapMenuPermission } from '@/utils/mapMenus'
import useMain from '../main/main'

interface ILogin {
  token: string
  userAccount: any
  userInfo: any
  userMenu: any
  permission: any
}

const useLogin = defineStore('login', {
  state: (): ILogin => ({
    token: localCache.getCache('token') ?? '',
    userAccount: localCache.getCache('userAccount') ?? {},
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenu: localCache.getCache('userMenu') ?? [],
    permission: []
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      // login登录
      const res = await accountLogin(account)
      const id = res.data.id
      this.token = res.data.token

      // 设置token
      localCache.setCache('token', this.token)

      // 获取角色信息&存入storage
      const userInfoRes = await userInfoById(id)
      const userInfo = userInfoRes.data
      this.userInfo = userInfo
      localCache.setCache('userInfo', userInfo)

      //获取角色菜单&存入storage
      const roleId = this.userInfo.role.id
      const userMenuRes = await userMenuById(roleId)
      const userMenu = userMenuRes.data
      this.userMenu = userMenu
      localCache.setCache('userMenu', userMenu)

      //获取角色菜单权限
      const menuPermission = mapMenuPermission(userMenu)
      this.permission = menuPermission

      // 动态路由
      const routes = dynamicRouter(userMenu)
      routes.forEach((item) => {
        router.addRoute('main', item)
      })
      // 路由跳转(跳转至首个动态路由)
      router.push(firstRoute)
    },

    // 动态路由(每次刷新后请求)
    dynamicAction(remove: boolean = false) {
      const token = localCache.getCache('token')
      const userMenu = localCache.getCache('userMenu')

      if (remove) {
        // 删除动态路由
        const routes = dynamicRouter(userMenu)
        routes.forEach((item) => {
          router.removeRoute(item.name)
        }) //添加动态路由&&获取角色菜单权限
      } else if (token && userMenu) {
        const menuPermission = mapMenuPermission(userMenu)
        this.permission = menuPermission

        const routes = dynamicRouter(userMenu)
        routes.forEach((item) => {
          router.addRoute('main', item)
        })
        // 请求（角色/部门）列表
        const mainStore = useMain()
        mainStore.postRoleListAction()
        mainStore.postDepartmentListAction()
      }
    }
  }
})

export default useLogin
