/**
 * 拖拽指令
 * 支持 PC端 和 移动端
 * binding.arg(可选): 父元素id
 * binding.modifiers.nocross(可选): 是否不可跨越父元素(默认false)
 * binding.value(可选): 阈值,单位px(默认50)
 */
export default {
	mounted(el, binding, vnode, prevVnode) {
		el.$handler = function(el, binding) {
			let parentId = binding.arg
			let nocross = binding.modifiers.nocross
			let threshold = binding.value || 50

			// 父元素
			let parentEl = document.getElementById(parentId) || document.body
			parentEl.style.position = 'relative'
			let parentWidth = parentEl.offsetWidth // 元素宽度
			let parentHeight = parentEl.offsetHeight // 元素高度
			let parentOffsetLeft = parentEl.offsetLeft // 左边距离
			let parentOffsetTop = parentEl.offsetTop // 顶部距离
			let parentTopBorder = parseFloat(parentEl.style.borderTopWidth || 0) // 上边框
			let parentRightBorder = parseFloat(parentEl.style.borderRightWidth || 0) // 右边框
			let parentBottomBorder = parseFloat(parentEl.style.borderBottomWidth || 0) // 下边框
			let parentLeftBorder = parseFloat(parentEl.style.borderLeftWidth || 0) // 左边框

			getScrollbarRect(el)

			// 目标元素
			el.style.position = 'absolute'
			let targetWidth = el.offsetWidth
			let targetHeight = el.offsetHeight
			let targetOffsetLeft = el.offsetLeft
			let targetOffsetTop = el.offsetTop

			parentEl.appendChild(el)
			el.style.margin = '0px'
			el.style.left = targetOffsetLeft + 'px'
			el.style.top = targetOffsetTop + 'px'


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
					// console.log(e.type, e)
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

					if (nocross) {
						let minLeft = 0
						if (finalLeft < minLeft) {
							finalLeft = minLeft
						}
						let maxLeft = parentWidth - targetWidth - parentLeftBorder - parentRightBorder
						if (finalLeft > maxLeft) {
							finalLeft = maxLeft
						}
						let minTop = 0
						if (finalTop < minTop) {
							finalTop = minTop
						}
						let maxTop = parentHeight - targetHeight - parentTopBorder - parentBottomBorder
						if (finalTop > maxTop) {
							finalTop = maxTop
						}
					}

					el.style.left = finalLeft + 'px'
					el.style.top = finalTop + 'px'
					return false // 防止选中文本，文本拖动的问题
				}

				// 结束拖拽
				el.$dragend = (e) => {
					// console.log(e.type, e)
					targetOffsetLeft = el.offsetLeft
					targetOffsetTop = el.offsetTop

					document.removeEventListener('mousemove', el.$dragmove)
					document.removeEventListener('mouseup', el.$dragend)
				}

				el.$mouseout = (e) => {
					document.addEventListener('mouseup', el.$dragend)
				}

				el.addEventListener('mousemove', el.$draggableCheck)
				el.addEventListener('mousedown', el.$dragstart)
				el.addEventListener('mouseup', el.$dragend)
				el.addEventListener('mouseout', el.$mouseout)
			}
			
			el.$removeEvents = () => {
				el.removeEventListener('mousemove', el.$draggableCheck)
				el.removeEventListener('mousedown', el.$dragstart)
				el.removeEventListener('mouseup', el.$dragend)
				el.removeEventListener('mouseout', el.$mouseout)
				
				el.removeEventListener('touchstart', el.$dragstart)
			}
		}

		el.$handler(el, binding)
	},
	updated(el, binding, vnode, prevVnode) {
		console.log('updated')
		// el.$removeEvents()
		// el.$handler(el, binding)
		// el.$triggerEvents()
	},
	unmounted(el, binding, vnode, prevVnode) {
		el.$removeEvents()
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

function getScrollbarRect(el) {
	let scrollbarWidth = 0
	let scrollbarHeight = 0
	
	const loop = (el) => {
		const parentEl = el.parentElement
		console.log(parentEl.scrollTop)
		if (parentEl.scrollTop > 0) {
			
		} else {
			loop(parentEl)
		}
	}
	loop(el)
}
