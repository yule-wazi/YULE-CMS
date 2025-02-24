import { createApp } from 'vue'

import App from './App.vue'
import pinia from './stores'
import router from './router'
import 'normalize.css'
import '@/assets/css/index.less'
import 'element-plus/dist/index.css'
import registerIcons from './global/registerIcons'
import useLogin from './stores/modules/login/login'

const app = createApp(App)

app.use(pinia)
const loginStore = useLogin()
loginStore.dynamicAction()
app.use(router)
app.use(registerIcons)
app.mount('#app')
