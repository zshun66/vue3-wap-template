export default {
	mounted(el, binding, vnode, prevVnode) {
		el.$handler = (el) => {
			const regRule = /[^\a-\z\A-\Z0-9\u4e00-\u9fa5\？\#]/
			replaceAndSetPos(el, regRule, '')
			// 派发自定义事件, 防止出现视图更新数据没有数据的情况
			const e = document.createEvent('HTMLEvents')
			e.initEvent('input', true, true)
			el.dispatchEvent(e)
		}
		el.$handler(el)
	},
	updated(el, binding, vnode, prevVnode) {
		el.$handler && el.$handler(el)
	},
}

/**
 * 替换后定位光标在原处,可以这样调用οnkeyup = replaceAndSetPos(this,/[^/d]/g,'')
 * @param el: getElementsByTagName('INPUT')
 * @param pattern: 正则
 * @param text
 */
const replaceAndSetPos = function(el, pattern, text) {
	/* if(event.shiftKey||event.altKey||event.ctrlKey||
	      event.keyCode==16||event.keyCode==17||event.keyCode==18||
	      (event.shiftKey&&event.keyCode==36)
	   )
	  return
	*/
	// 保存原始光标位置
	let pos = getCursorPos(el)
	// 保存原始值
	let temp = el.value
	// 替换掉非法值
	el.value = temp.replace(pattern, text)
	// 截掉超过长度限制的字串(要求设置maxlength属性)
	let max_length = el.getAttribute && el.getAttribute('maxlength') ? parseInt(el.getAttribute(
		'maxlength')) : ''
	if (max_length && el.value.length > max_length) {
		// (1) el.value = el.value.substring(0, max_length) 若用户在中间进行输入，此方法则达不到效果

		// (2) 可以满足任何情况,当超过输入了,去掉新输入的字符
		let str1 = el.value.substring(0, pos - 1)
		let str2 = el.value.substring(pos, max_length + 1)
		el.value = str1 + str2

		/* (3) 在支持keycode等一系列的情况下使用
		 * var e=e||event
		 * currKey=e.keyCode||e.which||e.charCode
		 * currKey = 0
		 * or
		 * window.οnkeydοwn=function(){
		 * if( event.keyCode!=37 && event.keyCode!=39 && event.keyCode!=8 ){ // 左、右、删除
		 *   return false
		 * }
		 */
	}

	pos = pos - (temp.length - el.value.length) // 当前光标位置
	setCursorPos(el, pos) // 设置光标
}

/**
 * 获取光标位置
 * @param el: getElementsByTagName('INPUT')
 * @returns {number}: 光标位置
 */
function getCursorPos(el) {
	let CaretPos = 0
	// IE Support
	if (document.selection) {
		el.focus() // 获取光标位置函数
		let Sel = document.selection.createRange()
		Sel.moveStart('character', -el.value.length)
		CaretPos = Sel.text.length
	}
	// Firefox/Safari/Chrome/Opera support
	else if (el.selectionStart || el.selectionStart == '0') {
		CaretPos = el.selectionEnd
	}
	return CaretPos
}

/**
 * 设置光标位置
 * @param el: getElementsByTagName('INPUT')
 * @param pos: 光标位置
 */
function setCursorPos(el, pos) {
	// Firefox/Safari/Chrome/Opera
	if (el.setSelectionRange) {
		el.setSelectionRange(pos, pos)
	}
	// IE
	else if (el.createTextRange) {
		let range = el.createTextRange()
		range.collapse(true)
		range.moveEnd('character', pos)
		range.moveStart('character', pos)
		range.select()
	}
}
