/**
 * 节流：节流是指如果持续触发某个事件，则每隔n秒执行一次。
 * @param {*} func 
 * @param {*} delay 等待时间
 * @param {*} options 一个对象，leading =true时代表第一次立即执行，training = true 表示最后一次也会被执行
 */
function throttle(func, delay, options) {
	let context, args, timeout
	let oldTime = 0
	if (!options) options = {}
	let later = function() {
		oldTime = new Date().valueOf()
		timeout = null
		func.apply(context, args)
	}
	return function() {
		context = this
		args = arguments
		let now = new Date().valueOf()
		if (options.leading === false) {
			oldTime = now
		}
		if (now - oldTime > delay) {
			if (timeout) {
				clearTimeout(timeout)
				timeout = null
			}
			func.apply(context, args)
			oldTime = now
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, delay)
		}
	}
}