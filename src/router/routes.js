export default [
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
	},
	{
		path: '/baby/list',
		name: 'baby-list',
		component: () => import('@/pages/baby/baby-list/baby-list.vue'),
		meta: {
			title: '宝宝列表',
			keepAlive: true,
			auth: true,
			index: 10,
		}
	},
	{
		path: '/baby/detail/:id',
		name: 'baby-detail',
		component: () => import('@/pages/baby/baby-detail/baby-detail.vue'),
		meta: {
			title: '宝宝详情',
			keepAlive: true,
			auth: true,
			index: 11,
		}
	},
	{
		path: '/baby/add',
		name: 'baby-add',
		component: () => import('@/pages/baby/baby-add/baby-add.vue'),
		meta: {
			title: '添加宝宝',
			keepAlive: true,
			auth: true,
			index: 12,
		}
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('@/pages/about/about.vue'),
		meta: {
			title: '关于我们',
			keepAlive: true,
			auth: true,
			index: 20,
		}
	}
]