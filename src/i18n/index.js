import { createI18n } from 'vue-i18n'
import zhCN from './lang/zh-CN.js'
import enUS from './lang/en-US.js'

const i18n = createI18n({
	legacy: false,
	globalInjection: true,
	locale: 'zh-CN',
	messages: {
		'zh-CN': zhCN,
		'en-US': enUS,
	}
})

export default i18n
