/**
 * 拖拽指令
 * 支持 PC端 和 移动端
 * binding.arg	父元素id(可选)
 */
export default {
	mounted(el, binding, vnode, prevVnode) {
		el.$handler = function(el, binding) {
			el.style.cursor = 'move'
			el.style.position = 'fixed'

			let targetWidth = el.offsetWidth
			let targetHeight = el.offsetHeight
			let targetLeft = el.offsetLeft
			let targetTop = el.offsetTop

			// 父元素
			let parentEl = document.getElementById(binding.arg)
			let parentWidth = 0 // 元素宽度
			let parentHeight = 0 // 元素高度
			let parentOffsetLeft = 0 // 左边距离
			let parentOffsetTop = 0 // 顶部距离
			let parentTopBorder = 0 // 上边框
			let parentRightBorder = 0 // 右边框
			let parentBottomBorder = 0 // 下边框
			let parentLeftBorder = 0 // 左边框
			if (parentEl) {
				parentWidth = parentEl.offsetWidth
				parentHeight = parentEl.offsetHeight
				parentOffsetLeft = parentEl.offsetLeft
				parentOffsetTop = parentEl.offsetTop
				parentTopBorder = parseFloat(parentEl.style.borderTopWidth)
				parentRightBorder = parseFloat(parentEl.style.borderRightWidth)
				parentBottomBorder = parseFloat(parentEl.style.borderBottomWidth)
				parentLeftBorder = parseFloat(parentEl.style.borderLeftWidth)
			}

			let mouseX = 0
			let mouseY = 0

			el.$dragstart = (e) => {
				console.log(e.type, e)
				e.preventDefault()
				if (e.type == 'mousedown') {
					mouseX = e.clientX
					mouseY = e.clientY

					el.addEventListener('mousemove', el.$dragmove)
					el.addEventListener('mouseup', el.$dragend)
				} else if (e.type == 'touchstart') {
					mouseX = e.touches[0].clientX
					mouseY = e.touches[0].clientY
				}
			}

			el.$dragmove = (e) => {
				// console.log(e.type, e)
				e.preventDefault()
				let disX = 0
				let disY = 0
				if (e.type == 'mousemove') {
					disX = e.clientX - mouseX
					disY = e.clientY - mouseY
				} else if (e.type == 'touchmove' && e.touches) {
					disX = e.touches[0].clientX - mouseX
					disY = e.touches[0].clientY - mouseY
				}

				let finalLeft = targetLeft + disX
				let finalTop = targetTop + disY
				if (parentEl) {
					let minLeft = parentOffsetLeft + parentLeftBorder
					if (finalLeft < minLeft) {
						finalLeft = minLeft
					}
					let maxLeft = parentOffsetLeft + parentWidth - targetWidth - parentRightBorder
					if (finalLeft > maxLeft) {
						finalLeft = maxLeft
					}
					let minTop = parentOffsetTop + parentTopBorder
					if (finalTop < minTop) {
						finalTop = minTop
					}
					let maxTop = parentOffsetTop + parentHeight - targetHeight - parentBottomBorder
					if (finalTop > maxTop) {
						finalTop = maxTop
					}
				}

				el.style.left = finalLeft + 'px'
				el.style.top = finalTop + 'px'
				return false // 防止选中文本，文本拖动的问题
			}

			el.$dragend = (e) => {
				// console.log(e.type, e)
				targetLeft = el.offsetLeft
				targetTop = el.offsetTop

				if (e.type == 'mouseup') {
					el.removeEventListener('mousemove', el.$dragmove)
					el.removeEventListener('mouseup', el.$dragend)
				}
			}

			el.$dragleave = (e) => {
				trigger(el, 'mouseup')
			}

			el.addEventListener('mousedown', el.$dragstart)
			el.addEventListener('mouseleave', el.$dragleave)

			el.addEventListener('touchstart', el.$dragstart)
			el.addEventListener('touchmove', el.$dragmove)
			el.addEventListener('touchend', el.$dragend)
		}

		el.$handler(el, binding)

		el.$removeEvents = () => {
			el.removeEventListener('mousedown', el.$dragstart)
			el.removeEventListener('mouseleave', el.$dragleave)

			el.removeEventListener('touchstart', el.$dragstart)
			el.removeEventListener('touchmove', el.$dragmove)
			el.removeEventListener('touchend', el.$dragend)
		}

		el.$triggerEvents = () => {
			trigger(el, 'mousemove')
			trigger(el, 'mouseup')

			trigger(el, 'touchmove')
			trigger(el, 'touchend')
		}
	},
	updated(el, binding, vnode, prevVnode) {
		el.$removeEvents()
		el.$handler(el, binding)
		el.$triggerEvents()
	},
	unmounted(el, binding, vnode, prevVnode) {
		el.$removeEvents()
	}
}

/**
 * 派发自定义事件
 * @param {Object} el 派发事件的元素
 * @param {String} type 事件类型
 */
function trigger(el, type) {
	const e = document.createEvent('HTMLEvents')
	e.initEvent(type, true, true)
	el.dispatchEvent(e)
}
