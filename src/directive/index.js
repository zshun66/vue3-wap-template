import focus from './modules/v-focus.js'
import lazy from './modules/v-focus.js'
import emoji from './modules/v-emoji.js'
import input from './modules/v-input.js'
import drag from './modules/v-drag.js'
import longpress from './modules/v-longpress.js'
import watermark from './modules/v-watermark.js'
import throttle from './modules/v-throttle.js'
import debounce from './modules/v-debounce.js'

export default {
	install(app) {
		app.directive('focus', focus)
		app.directive('lazy', lazy)
		app.directive('emoji', emoji)
		app.directive('input', input)
		app.directive('drag', drag)
		app.directive('longpress', longpress)
		app.directive('watermark', watermark)
		app.directive('throttle', throttle)
		app.directive('debounce', debounce)
	}
}
