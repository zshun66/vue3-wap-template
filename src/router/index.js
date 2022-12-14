import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			redirect: '/index',
			component: () => import('@/pages/home/home.vue'),
			children: [
				{
					path: '/index',
					name: 'index',
					component: () => import('@/pages/home/index/index.vue'),
					meta: {
						title: '首页',
						keepAlive: true,
						auth: false,
						index: 1,
					}
				},
				{
					path: '/box',
					name: 'box',
					component: () => import('@/pages/home/box/box.vue'),
					meta: {
						title: '百宝箱',
						keepAlive: true,
						auth: false,
						index: 2,
					}
				},
				{
					path: '/my',
					name: 'my',
					component: () => import('@/pages/home/my/my.vue'),
					meta: {
						title: '我的',
						keepAlive: true,
						auth: false,
						index: 3,
					}
				}
			],
		}
	]
})

// 全局路由前置守卫
router.beforeEach(async (to, from) => {
	return true
})

// 全局路由后置守卫
router.afterEach((to, from) => {

})

export default router