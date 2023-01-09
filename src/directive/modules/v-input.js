/**
 * 输入框输入限制扩展指令
 * 支持 PC端 和 移动端
 * binding.arg(可选): number(数字) | decimal(小数) | custom(自定义)
 * binding.modifiers.positive(可选): positive(只能输入正数) - 默认可输入正负数
 * binding.value(可选): 当arg为decimal时，该值为小数精度。当arg为custom时，该值为正则表达式。
 */
export default {
	mounted(el, binding, vnode, prevVnode) {
		// console.log(binding)
		el.$handler = (el, binding) => {
			const arg = binding.arg || 'number'
			const positive = binding.modifiers.positive
			const value = binding.value

			const inputEl = getInputElement(el)
			switch(arg) {
				case 'number':
					handleNumber(inputEl, positive)
					break
				case 'decimal':
					handleDecimal(inputEl, positive, value)
					break
				case 'custom':
					inputEl.value = inputEl.value.replace(value, '')
					break
			}
			trigger(inputEl, 'input')
		}
		el.$handler(el, binding)
	},
	updated(el, binding, vnode, prevVnode) {
		el.$handler && el.$handler(el, binding)
	}
}

/**
 * 获取input元素
 * @param {Object} el 父元素
 */
function getInputElement(el) {
	if (el.tagName == 'INPUT') {
		return el
	} else {
		let inputEl = null
		const loop = function(el) {
			Array.from(el.children).forEach(child => {
				if (child.tagName == 'INPUT') inputEl = child
				else loop(child)
			})
		}
		loop(el)
		return inputEl
	}
}

/**
 * 处理整数情况
 * @param {Object} el input元素
 * @param {Object} positive 是否不可输入负数标识 true:不可输入负数 false:可输入负数
 */
function handleNumber(el, positive) {
	let negative = false
	if (el.value[0] == '-') {
		negative = true
		el.value = el.value.substr(1)
	}
	el.value = el.value.replace(/[^\d]/, '')
	el.value = el.value.replace(/^0{2,}/, '0')
	el.value = el.value.replace(/^0(\d+)/, '$1')
	el.value = (!positive && negative) ? `-${el.value}` : el.value
}

/**
 * 处理小数情况
 * @param {Object} el input元素
 * @param {Object} positive 是否不可输入负数标识 true:不可输入负数 false:可输入负数
 */
function handleDecimal(el, positive, precision) {
	let negative = false
	if (el.value[0] == '-') {
		negative = true
		el.value = el.value.substr(1)
	}
	el.value = el.value.replace(/[^\d.]/, '') // 清除数字和'.'以外的字符
	el.value = el.value.replace(/\.{2,}/, '.') // 连续两个'.', 只保留一个'.'
	el.value = el.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.') // 隔着字符, 也保证只有一个'.'
	if (precision) {
		el.value = el.value.replace(new RegExp(`(\\d+)\.(\\d{${precision}}).*$`), '$1.$2') // 只能输入指定位数小数
	}
	el.value.indexOf('.') == -1 && el.value != '' && (el.value = parseFloat(el.value)) // 保证不会出现重复的: 00, 01, 02 ...
	el.value.indexOf('.') == 0 && (el.value = el.value.substr(1)) // 第一位不能以'.'开头
	el.value = (!positive && negative) ? `-${el.value}` : el.value
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
