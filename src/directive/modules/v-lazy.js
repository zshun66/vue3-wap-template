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
		io.observe(el)
		el.$io = io
	},
	updated(el, binding, vnode, prevVnode) {
		el.$data_src = binding.value
	},
	unmounted(el, binding, vnode, prevVnode) {
		el.$io.disconnect()
	}
}
