/**
 * 拖拽指令
 * 支持 PC端 和 移动端
 * binding.arg(可选): 父元素id
 * binding.modifiers.cross(可选): 是否可跨越父元素(默认false)
 * binding.value(可选): 阈值,单位px(默认50)
 */
export default {
	mounted(el, binding, vnode, prevVnode) {
		el.$handler = function(el, binding) {
			let parentId = binding.arg
			let crossable = binding.modifiers.cross
			let threshold = binding.value || 50

			// 父元素
			let parentEl = document.getElementById(parentId) || document.body
			parentEl.style.position = 'relative'
			let parentWidth = parentEl.offsetWidth // 元素宽度
			let parentHeight = parentEl.offsetHeight // 元素高度
			let parentOffsetLeft = parentEl.offsetLeft // 左边距离
			let parentOffsetTop = parentEl.offsetTop // 顶部距离
			let parentTopBorder = parseFloat(parentEl.style.borderTopWidth) // 上边框
			let parentRightBorder = parseFloat(parentEl.style.borderRightWidth) // 右边框
			let parentBottomBorder = parseFloat(parentEl.style.borderBottomWidth) // 下边框
			let parentLeftBorder = parseFloat(parentEl.style.borderLeftWidth) // 左边框

			// 目标元素
			el.style.position = 'absolute'
			let targetWidth = el.offsetWidth
			let targetHeight = el.offsetHeight
			let targetOffsetLeft = el.offsetLeft
			let targetOffsetTop = el.offsetTop

			if (el.parentElement != parentEl) {
				parentEl.appendChild(el)
				el.style.margin = '0px'
				el.style.left = targetOffsetLeft + 'px'
				el.style.top = targetOffsetTop + 'px'
			}


			let draggable = false
			let mouseX = 0
			let mouseY = 0

			// 移动端
			if (isMobile()) {
				el.$dragstart = (e) => {
					console.log(e.type, e)
					e.preventDefault()
					if (e.layerY <= threshold) {
						draggable = true
						mouseX = e.touches[0].clientX
						mouseY = e.touches[0].clientY
					} else {
						draggable = false
					}
					console.log(draggable)
				}

				el.addEventListener('touchstart', el.$dragstart)
			}
			// PC端
			else {
				// 检测是否可拖拽
				el.$draggableCheck = (e) => {
					// console.log(e.type, e)
					e.preventDefault()
					if (e.layerY <= threshold) {
						el.style.cursor = 'move'
						draggable = true
					} else {
						el.style.cursor = 'default'
						draggable = false
					}
				}

				// 开始拖拽
				el.$dragstart = (e) => {
					console.log(e.type, e)
					e.preventDefault()
					if (!draggable) return
					mouseX = e.clientX
					mouseY = e.clientY

					document.addEventListener('mousemove', el.$dragmove)
				}

				// 拖拽中
				el.$dragmove = (e) => {
					// console.log(e.type, e)
					e.preventDefault()
					let disX = e.clientX - mouseX
					let disY = e.clientY - mouseY
					let finalLeft = targetOffsetLeft + disX
					let finalTop = targetOffsetTop + disY

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

					el.style.left = finalLeft + 'px'
					el.style.top = finalTop + 'px'
					return false // 防止选中文本，文本拖动的问题
				}

				// 结束拖拽
				el.$dragend = (e) => {
					console.log(e.type, e)
					targetOffsetLeft = el.offsetLeft
					targetOffsetTop = el.offsetTop

					document.removeEventListener('mousemove', el.$dragmove)
				}

				el.addEventListener('mousemove', el.$draggableCheck)
				el.addEventListener('mousedown', el.$dragstart)
				el.addEventListener('mouseup', el.$dragend)
			}






			// el.$dragstart = (e) => {
			// 	console.log(e.type, e)
			// 	e.preventDefault()
			// 	if (e.type == 'mousedown') {
			// 		mouseX = e.clientX
			// 		mouseY = e.clientY

			// 		el.addEventListener('mousemove', el.$dragmove)
			// 		el.addEventListener('mouseup', el.$dragend)
			// 	} else if (e.type == 'touchstart') {
			// 		mouseX = e.touches[0].clientX
			// 		mouseY = e.touches[0].clientY
			// 	}
			// }

			// el.$dragmove = (e) => {
			// 	// console.log(e.type, e)
			// 	e.preventDefault()
			// 	let disX = 0
			// 	let disY = 0
			// 	if (e.type == 'mousemove') {
			// 		disX = e.clientX - mouseX
			// 		disY = e.clientY - mouseY
			// 	} else if (e.type == 'touchmove' && e.touches) {
			// 		disX = e.touches[0].clientX - mouseX
			// 		disY = e.touches[0].clientY - mouseY
			// 	}

			// 	let finalLeft = targetOffsetLeft + disX
			// 	let finalTop = targetOffsetTop + disY
			// 	if (parentEl) {
			// 		let minLeft = parentOffsetLeft + parentLeftBorder
			// 		if (finalLeft < minLeft) {
			// 			finalLeft = minLeft
			// 		}
			// 		let maxLeft = parentOffsetLeft + parentWidth - targetWidth - parentRightBorder
			// 		if (finalLeft > maxLeft) {
			// 			finalLeft = maxLeft
			// 		}
			// 		let minTop = parentOffsetTop + parentTopBorder
			// 		if (finalTop < minTop) {
			// 			finalTop = minTop
			// 		}
			// 		let maxTop = parentOffsetTop + parentHeight - targetHeight - parentBottomBorder
			// 		if (finalTop > maxTop) {
			// 			finalTop = maxTop
			// 		}
			// 	}

			// 	el.style.left = finalLeft + 'px'
			// 	el.style.top = finalTop + 'px'
			// 	return false // 防止选中文本，文本拖动的问题
			// }

			// el.$dragend = (e) => {
			// 	// console.log(e.type, e)
			// 	targetOffsetLeft = el.offsetLeft
			// 	targetOffsetTop = el.offsetTop

			// 	if (e.type == 'mouseup') {
			// 		el.removeEventListener('mousemove', el.$dragmove)
			// 		el.removeEventListener('mouseup', el.$dragend)
			// 	}
			// }

			// el.$dragleave = (e) => {
			// 	trigger(el, 'mouseup')
			// }

			// el.addEventListener('mousedown', el.$dragstart)
			// el.addEventListener('mouseleave', el.$dragleave)

			// el.addEventListener('touchstart', el.$dragstart)
			// el.addEventListener('touchmove', el.$dragmove)
			// el.addEventListener('touchend', el.$dragend)
		}

		el.$handler(el, binding)

		// el.$removeEvents = () => {
		// 	el.removeEventListener('mousedown', el.$dragstart)
		// 	el.removeEventListener('mouseleave', el.$dragleave)

		// 	el.removeEventListener('touchstart', el.$dragstart)
		// 	el.removeEventListener('touchmove', el.$dragmove)
		// 	el.removeEventListener('touchend', el.$dragend)
		// }

		// el.$triggerEvents = () => {
		// 	trigger(el, 'mousemove')
		// 	trigger(el, 'mouseup')

		// 	trigger(el, 'touchmove')
		// 	trigger(el, 'touchend')
		// }
	},
	updated(el, binding, vnode, prevVnode) {
		// el.$removeEvents()
		// el.$handler(el, binding)
		// el.$triggerEvents()
	},
	unmounted(el, binding, vnode, prevVnode) {
		// el.$removeEvents()
	}
}

/**
 * 判断PC端还是移动端
 * @returns {boolean} true为移动端 false为PC端
 */
function isMobile() {
	let mobileReg = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
	return mobileReg.test(navigator.userAgent)
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
