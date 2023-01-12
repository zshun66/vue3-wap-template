/**
 * 节流指令
 * binding.value(必填):
 * 	{
 *		event: 'input',	// 事件名称(必填)
 *		callback: (e) => { }, // 事件回调(必填)
 *		delay: 300, // 节流间隔时间
 *		leading: true, // 是否第一次立即执行
 *		training: true, // 是否最后一次也会被执行
 *	}
 */
export default {
	mounted(el, binding, vnode, prevVnode) {
		el.$handler = (el, binding) => {
			if (!binding.value) {
				throw new Error('v-throttle：缺失指令参数')
			}
			if (!binding.value.event) {
				throw new Error('v-throttle：缺失参数(事件类型：event)')
			}
			if (!binding.value.callback) {
				throw new Error('v-throttle：缺失参数(事件回调函数：callback)')
			}

			el.$event = binding.value.event
			const callback = binding.value.callback
			const delay = binding.value.delay || 300
			const leading = binding.value.leading 
			const training = binding.value.training

			el.$eventHanlde = () => {
				let context = null
				let args = null
				let timer = null
				let oldTime = 0

				return function() {
					context = this
					args = arguments
					let now = new Date().getTime()
					if (!leading) {
						oldTime = now
					}
					if (now - oldTime > delay) {
						if (timer) {
							clearTimeout(timer)
							timer = null
						}
						callback.apply(context, args)
						oldTime = now
					} else if (!timer && training) {
						timer = setTimeout(() => {
							oldTime = now
							timer = null
							callback.apply(context, args)
						}, delay)
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
