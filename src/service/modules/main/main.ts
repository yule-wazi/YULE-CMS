import hyRequest from "@/service";

export function postRoleList() {
  return hyRequest.post({
    url: 'role/list'
  })
}

export function postDepartmentList() {
  return hyRequest.post({
    url: 'department/list'
  })
}

export function postMenuList() {
  return hyRequest.post({
    url: 'menu/list'
  })
}

// 公共函数
export function postPageList(pageName: string, info?: any) {
  return hyRequest.post({
    url: `${pageName}/list`,
    data: info
  })
}