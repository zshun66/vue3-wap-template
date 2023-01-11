/**
 * 节流指令
 * binding.value(必填):
 * 	{
 *		event: 'input',	// 事件名称(必填)
 *		callback: (e) => { }, // 事件回调(必填)
 *		delay: 500, // 节流间隔时间
 *		leading: false, // 是否第一次立即执行
 *		training: false, // 是否最后一次也会被执行
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
			const leading = binding.value.leading
			const training = binding.value.training

			el.$eventHanlde = () => {
				let context, args, timeout
				let oldTime = 0
				
				let later = function() {
					oldTime = new Date().valueOf()
					timeout = null
					callback.apply(context, args)
				}
				return function(e) {
					context = this
					args = arguments
					let now = new Date().valueOf()
					if (leading === false) {
						oldTime = now
					}
					if (now - oldTime > delay) {
						if (timeout) {
							clearTimeout(timeout)
							timeout = null
						}
						callback.apply(context, args)
						oldTime = now
					} else if (!timeout && training !== false) {
						timeout = setTimeout(later, delay)
					}
				}
			}
			
			el.$eventCallback = el.$eventHanlde()

			el.addEventListener(el.$event, el.$eventCallback)
		}

		el.$handler(el, binding)
	},
	updated(el, binding, vnode, prevVnode) {
		el.removeEventListener(el.$event, el.$eventCallback)
		el.$handler(el, binding)
	},
	unmounted(el, binding, vnode, prevVnode) {
		el.removeEventListener(el.$event, el.$eventCallback)
	}
}