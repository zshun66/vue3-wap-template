export default [
	{
		path: '/',
		name: '/',
		redirect: '/home',
	},
	{
		path: '/home',
		name: 'home',
		redirect: '/home/index',
		component: () => import('@/pages/home/home.vue'),
		children: [
			{
				path: '/home/index',
				name: 'home:index',
				component: () => import('@/pages/home/index/index.vue'),
				meta: {
					title: '首页',
					keepAlive: true,
					auth: false,
				}
			},
			{
				path: '/home/box',
				name: 'home:box',
				component: () => import('@/pages/home/box/box.vue'),
				meta: {
					title: '百宝箱',
					keepAlive: true,
					auth: false,
				}
			},
			{
				path: '/home/my',
				name: 'home:my',
				component: () => import('@/pages/home/my/my.vue'),
				meta: {
					title: '我的',
					keepAlive: true,
					auth: false,
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
		}
	},
	{
		path: '/baby/add',
		name: 'baby-add',
		component: () => import('@/pages/baby/baby-add/baby-add.vue'),
		meta: {
			title: '添加宝宝',
			keepAlive: false,
			auth: true,
		}
	},
	{
		path: '/baby/add',
		name: 'baby-add',
		component: () => import('@/pages/baby/baby-add/baby-add.vue'),
		meta: {
			title: '添加宝宝',
			keepAlive: false,
			auth: true,
		}
	},
	{
		path: '/baby/modify',
		name: 'baby-modify',
		component: () => import('@/pages/baby/baby-modify/baby-modify.vue'),
		meta: {
			title: '修改宝宝',
			keepAlive: false,
			auth: true,
		}
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('@/pages/about/about.vue'),
		meta: {
			title: '关于我们',
			keepAlive: false,
			auth: true,
		}
	}
]