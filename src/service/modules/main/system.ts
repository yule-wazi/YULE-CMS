import hyRequest from "@/service";

export function postUserList(queryInfo: any) {
  return hyRequest.post({
    url: "/users/list",
    data: queryInfo
  })
}

export function deleteUserList(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}

export function postNewUser(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo
  })
}

export function updateUser(userInfo:any, id: number) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

// page的增删查改
export function postPageList(url:string, info: any) {
  return hyRequest.post({
    url: `${url}/list`,
    data: info
  })
}

export function deletePage(url: string, id: number) {
  return hyRequest.delete({
    url: `${url}/${id}`
  })
}

export function postNewPage(url: string, info: any) {
  return hyRequest.post({
    url: url,
    data: info
  })
}

export function updatePage(url: string, id: number, info: any) {
  return hyRequest.patch({
    url: `${url}/${id}`,
    data: info
  })
}