import hyRequest from '@/service'
import type IAccount from '@/types/login'

export function accountLogin(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function userInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}

export function userMenuById(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
