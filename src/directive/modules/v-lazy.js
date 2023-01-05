export default {
	beforeMount(el, binding, vnode, prevVnode) {
		el.$data_src = binding.value
	},
	mounted(el, binding, vnode, prevVnode) {
		const io = new IntersectionObserver(entries => {
			const realSrc = el.$data_src
			// 通过isIntersecting判断是否在可视区域内
			entries[0].isIntersecting && realSrc && (el.src = realSrc)
		})
		// 监听目标对象
		io.observe(el)
		// 挂载实例, 提供给后续的unmounted钩子操作
		el.$io = io
	},
	updated(el, binding, vnode, prevVnode) {
		// 实时更新最新的图片路径
		el.$data_src = binding.value
	},
	unmounted(el, binding, vnode, prevVnode) {
		// 停止监听工作
		el.$io.disconnect()
	}
}
