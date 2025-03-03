import { postDepartmentList, postMenuList, postPageList, postRoleList } from "@/service/modules/main/main";
import { defineStore } from "pinia";

interface IMain {
  roleList: any[],
  departmentList: any[],
  menuList: any,

  PageList: any[]
}
const useMain = defineStore('main',{
  state: ():IMain => ({
    roleList: [],
    departmentList: [],
    menuList: [],

    PageList: []
  }),
  actions: {
    async postRoleListAction() {
      const res = await postRoleList()
      this.roleList = res.data.list
    },
    async postDepartmentListAction() {
      const res = await postDepartmentList()
      this.departmentList = res.data.list
    },
    async postMenuListAction() {
      const res =await postMenuList()
      this.menuList = res.data.list
    },

    // 公共函数
    async postPageSelectListAction(pageName: string) {
      if (pageName === 'role') {
        const res = await postPageList(pageName)
        this.roleList = res.data.list
        this.PageList = this.roleList
      } else if (pageName === 'department'){
        const res = await postPageList(pageName)
        this.departmentList = res.data.list
        this.PageList = this.departmentList
      } else {
        const res = await postPageList(pageName)
        this.PageList = res.data.list
      }

    }
  }
  
})

export default useMain