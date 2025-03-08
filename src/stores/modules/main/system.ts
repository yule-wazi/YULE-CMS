import {
  deleteUserList,
  postPageList,
  postNewUser,
  postUserList,
  updateUser,
  deletePage,
  updatePage,
  postNewPage
} from '@/service/modules/main/system'
import { defineStore } from 'pinia'

interface ISystem {
  totalCount: number
  usersList: any[]
  pageTotalCount: number
  pageDepartmentList: any[]
}
const useSystem = defineStore('system', {
  state: (): ISystem => ({
    totalCount: 0,
    usersList: [],

    pageTotalCount: 0,
    pageDepartmentList: []
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const usersListRes = await postUserList(queryInfo)
      const { totalCount, list } = usersListRes.data
      this.totalCount = totalCount
      this.usersList = list
    },
    async deleteUserListAction(id: number) {
      const deleteUserRes = await deleteUserList(id)
      console.log(deleteUserRes)
    },
    async postNewUserAction(userInfo: any) {
      const postNewUserRes = await postNewUser(userInfo)
      console.log(postNewUserRes)
    },
    async updateUserAction(userInfo: any, id: number) {
      const updateUserRes = await updateUser(userInfo, id)
      console.log(updateUserRes)
    },

    // page的增删查改
    async postPageDepartmentListAction(pageName: string, pageInfo: any, isExport?: boolean) {
      const postPageDepartmentListRes = await postPageList(pageName, pageInfo)
      const { totalCount, list } = postPageDepartmentListRes.data
      if(isExport) {
        return list
      } else {
        this.pageTotalCount = totalCount
        this.pageDepartmentList = list
      }
    },
    async deletePageDepartmentAction(pageName: string, pageId: any) {
      const deletePageDepartmentRes = await deletePage(pageName, pageId)
      console.log(deletePageDepartmentRes)
    },
    async postPageNewDepartmentAction(pageName: string, pageInfo: any) {
      const postPageNewDepartmentRes = await postNewPage(pageName, pageInfo)
      console.log(postPageNewDepartmentRes)
    },
    async updatePageDepartmentAction(pageName: string, pageInfo: any, pageId: number) {
      const updatePageDepartmentRes = await updatePage(pageName, pageId, pageInfo)
      console.log(updatePageDepartmentRes)
    }
  }
})

export default useSystem
