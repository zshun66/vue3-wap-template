import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
	routes: routes
})

// 全局路由前置守卫
router.beforeEach(async (to, from) => {
	// console.log('from', from)
	// console.log('to', to)
	return true
})

// 全局路由后置守卫
router.afterEach((to, from) => {

})

export default router