/**
 * 长按指令
 * 支持 PC端 和 移动端
 * binding.arg		触发长按的时长, 单位(ms)(可选)
 * binding.value	触发长按的回调钩子(必填)
 */
export default {
	beforeMount(el, binding, vnode, prevVnode) {
		const callback = binding.value
		el.$duration = Number(binding.arg) || 1000

		if (typeof callback !== 'function') {
			return console.warn('v-longpress指令必须接收一个回调函数')
		}

		let timer = null
		// 重置计时器
		el.$resetTimer = (e) => {
			if (timer !== null) {
				clearTimeout(timer)
				timer = null
			}
		}

		el.$startPress = (e) => {
			// 保证只点击左键会触发
			if (e.type == 'mousedown' && e.button !== 0) return
			e.preventDefault()
			if (timer == null) {
				timer = setTimeout(() => {
					callback()
					timer = null
				}, el.$duration)
			}
		}
		
		el.addEventListener('mousedown', el.$startPress)
		el.addEventListener('mouseup', el.$resetTimer)

		el.addEventListener('touchstart', el.$startPress)
		el.addEventListener('touchend', el.$resetTimer)
	},
	updated(el, binding, vnode, prevVnode) {
		el.$duration = Number(binding.arg) || 1000
	},
	unmounted(el, binding, vnode, prevVnode) {
		el.removeEventListener('mousedown', el.$startPress)
		el.removeEventListener('mouseup', el.$resetTimer)
		
		el.removeEventListener('touchstart', el.$startPress)
		el.removeEventListener('touchend', el.$resetTimer)
	}
}
