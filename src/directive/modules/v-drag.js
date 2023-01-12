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

			let parentEl = null
			let parentWidth = 0
			let parentHeight = 0
			let parentTopBorder = 0
			let parentRightBorder = 0
			let parentBottomBorder = 0
			let parentLeftBorder = 0

			let targetWidth = 0
			let targetHeight = 0
			let targetOffsetLeft = 0
			let targetOffsetTop = 0

			let isInit = false
			let draggable = false
			let mouseX = 0
			let mouseY = 0

			el.$initInfo = () => {
				// 父元素
				parentEl = document.getElementById(parentId) || document.body
				parentEl.style.position = 'relative'
				parentWidth = parentEl.offsetWidth // 元素宽度
				parentHeight = parentEl.offsetHeight // 元素高度
				parentTopBorder = parseFloat(parentEl.style.borderTopWidth || 0) // 上边框
				parentRightBorder = parseFloat(parentEl.style.borderRightWidth || 0) // 右边框
				parentBottomBorder = parseFloat(parentEl.style.borderBottomWidth || 0) // 下边框
				parentLeftBorder = parseFloat(parentEl.style.borderLeftWidth || 0) // 左边框

				// 目标元素
				el.style.position = 'absolute'
				targetWidth = el.offsetWidth
				targetHeight = el.offsetHeight
				targetOffsetLeft = el.offsetLeft
				targetOffsetTop = el.offsetTop

				parentEl.appendChild(el)
				el.style.margin = '0px'
				el.style.left = targetOffsetLeft + 'px'
				el.style.top = targetOffsetTop + 'px'
			}

			// 移动端
			if (isMobile()) {
				el.$initInfo()

				el.$dragstart = (e) => {
					// console.log(e.type, e)
					e.preventDefault()
					mouseX = e.touches[0].clientX
					mouseY = e.touches[0].clientY
				}
				
				el.$dragmove = (e) => {
					// console.log(e.type, e)
					e.preventDefault()
					let disX = e.touches[0].clientX - mouseX
					let disY = e.touches[0].clientY - mouseY
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
					
					el.$dragend = (e) => {
						// console.log(e.type, e)
						targetOffsetLeft = el.offsetLeft
						targetOffsetTop = el.offsetTop
					}
				
					el.style.left = finalLeft + 'px'
					el.style.top = finalTop + 'px'
					return false // 防止选中文本，文本拖动的问题
				}

				el.addEventListener('touchstart', el.$dragstart)
				el.addEventListener('touchmove', el.$dragmove)
				el.addEventListener('touchend', el.$dragend)
			}
			// PC端
			else {
				// 检测是否可拖拽
				el.$draggableCheck = (e) => {
					// console.log(e.type, e)
					e.preventDefault()

					if (!isInit) {
						el.$initInfo()
						isInit = true
					}

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
