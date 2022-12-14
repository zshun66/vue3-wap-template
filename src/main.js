import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

// Svg图标组件
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

const app = createApp(App)
app.use(router)
app.component('svg-icon', SvgIcon)
app.mount('#app')

console.log(import.meta.env)