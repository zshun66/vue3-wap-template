/**
 * 防抖函数：防抖是指在事件触发n秒后再执行回调，如果在n秒内再次被触发，则重新计算时间。
 * @param {*} func 回调函数
 * @param {*} delay 延迟时间
 * @param {*} immediate 是否立即执行
 */
export default function debounce(func, delay, immediate) {
	let timer = null
	return function() {
		clearTimeout(timer)
		if (immediate) {
			if (!timer) func(...arguments)
			timer = setTimeout(() => {
				timer = null
			}, delay)
		} else {
			timer = setTimeout(() => {
				func(...arguments)
			}, delay)
		}
	}
}