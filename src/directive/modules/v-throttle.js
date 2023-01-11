/**
 * 节流指令
 * binding.value(必填):
 * 	{
 *		event: 'input',	// 事件名称(必填)
 *		callback: (e) => { }, // 事件回调(必填)
 *		delay: 500, // 节流间隔时间
 *		immediate: false, // 是否立即执行
 *	}
 */
export default {
	mounted(el, binding, vnode, prevVnode) {
		el.$handler = (el, binding) => {
			if (!binding.value) {
				throw new Error('v-debounce：缺失指令参数')
			}
			if (!binding.value.event) {
				throw new Error('v-debounce：缺失参数(事件类型：event)')
			}
			if (!binding.value.callback) {
				throw new Error('v-debounce：缺失参数(事件回调函数：callback)')
			}

			el.$event = binding.value.event
			const callback = binding.value.callback
			const delay = binding.value.delay || 300
			const immediate = binding.value.immediate

			el.$eventHanlde = () => {
				let timer = null
				return function(e) {
					clearTimeout(timer)
					if (immediate) {
						if (!timer) callback(...arguments)
						timer = setTimeout(() => {
							timer = null
						}, delay)
					} else {
						timer = setTimeout(() => {
							callback(...arguments)
						}, delay)
					}
				}
			}

			el.addEventListener(el.$event, el.$eventHanlde())
		}

		el.$handler(el, binding)
	},
	updated(el, binding, vnode, prevVnode) {
		el.removeEventListener(el.$event, el.$handler)
		el.$handler(el, binding)
	},
	unmounted(el, binding, vnode, prevVnode) {
		el.removeEventListener(el.$event, el.$handler)
	}
}