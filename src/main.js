import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import pinia from './store/index.js'

// 导入样式表
import '@/assets/css/app.css'

// Svg图标组件
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.component('svg-icon', SvgIcon)
app.mount('#app')

console.log(import.meta.env)