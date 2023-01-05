import focus from './modules/v-focus.js'
import lazy from './modules/v-focus.js'
import emoji from './modules/v-emoji.js'

export default {
	install(app) {
		app.directive('focus', focus)
		app.directive('lazy', lazy)
		app.directive('emoji', emoji)
	}
}
