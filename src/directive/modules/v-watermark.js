/**
 * 水印指令
 * 支持 PC端 和 移动端
 * binding.value {object | string} 水印配置(*必填*)
 * 		object: {
 *			width: 200,							画布宽度(可选)
 *			height: 100,						画布高度(可选)
 *			bgColor: 'transparent',				背景颜色(可选)
 *			text: '',							文本内容(*必填*)
 *			fontColor: 'rgba(0, 0, 0, 0.12)',	文本颜色(可选)
 *			fontSize: '16px',					文本大小(可选)
 *			fontFamily: 'Microsoft JhengHei',	文本字体(可选)
 *			angle: -45,							旋转角度(可选)
 *		}
 * 		string: text
 */
export default {
	mounted(el, binding, vnode, prevVnode) {
		el.$handler = (el, binding) => {
			let config = {}
			
			if (!binding.value) {
				throw new Error('v-watermark：缺失必要的配置信息')
			} else {
				if (typeof binding.value == 'object') {
					if (!binding.value.text) {
						throw new Error('v-watermark：text不可为空')
					}
					config = binding.value
				} else {
					config = { text: binding.value }
				}
			}
			
			const {
				width = 200,
				height = 100,
				bgColor = 'transparent',
				text = '',
				fontColor = 'rgba(0, 0, 0, 0.12)',
				fontSize = '16px',
				fontFamily = 'Microsoft JhengHei',
				angle = -45
			} = config
			
			let canvas = document.createElement('canvas')
			canvas.width = width
			canvas.height = height
			let ctx = canvas.getContext('2d')
			// console.log(ctx)
			ctx.fillStyle = bgColor
			ctx.fillRect(0, 0, width, height)
			
			ctx.translate(width / 2, height / 2)
			ctx.rotate(angle * Math.PI / 180)
			ctx.font = `${fontSize} ${fontFamily}`
			ctx.fillStyle = fontColor
			ctx.textAlign = 'center'
			ctx.textBaseline = 'middle'
			ctx.fillText(text, 0, 0)
			
			el.style.background = 'url(' + canvas.toDataURL('image/png') + ') left top repeat'
		}
		
		watch(() => binding.value, (newv, oldv) => {
			el.$handler(el, binding)
		}, { immediate: true ,deep: true })
	},
	updated(el, binding, vnode, prevVnode) {
		el.$handler(el, binding)
	}
}
