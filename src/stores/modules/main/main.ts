import { postDepartmentList, postMenuList, postRoleList } from "@/service/modules/main/main";
import { defineStore } from "pinia";

interface IMain {
  roleList: any[],
  departmentList: any[],
  menuList: any
}
const useMain = defineStore('main',{
  state: ():IMain => ({
    roleList: [],
    departmentList: [],
    menuList: []
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
    }
  }
  
})

export default useMain