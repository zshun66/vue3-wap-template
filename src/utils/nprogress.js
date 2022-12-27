// 封装nprogress页面加载进度条插件
// 官网: https://ricostacruz.com/nprogress/
// github: https://github.com/rstacruz/nprogress
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

class NProgress {
	constructor() {
		// 全局进度条的配置
		nprogress.configure({
			// easing: 'ease',  // 动画方式
			// speed: 1000,  // 递增进度条的速度
			// showSpinner: false, // 是否显示加载ico
			// trickleSpeed: 200, // 自动递增间隔
			// minimum: 0.3 // 初始化时的最小百分比
		})
	}

	// 打开进度条
	start() {
		nprogress.start()
	}

	// 关闭进度条
	done() {
		nprogress.done()
	}
}

export default new NProgress()
