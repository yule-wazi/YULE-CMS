import useLogin from '@/stores/modules/login/login'
import { storeToRefs } from 'pinia'

const loginStore = useLogin()
const { permission } = storeToRefs(loginStore)
function permissionHook(permissionName: string) {
  return !!permission.value.find((item: any) => item.includes(permissionName))
}

export default permissionHook
