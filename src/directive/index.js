import focus from './modules/v-focus.js'

export default {
	install(app) {
		app.directive('focus', focus)
	}
}
