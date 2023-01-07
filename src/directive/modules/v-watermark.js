/**
 * 水印指令
 * 支持 PC端 和 移动端
 * binding.value	水印配置(必填)
 *		{
 *			bgcolor: '#fff',
 *			text: 'lzg版权所有',
 *			color: 'rgba(180, 180, 180, 0.4)',
 *			size: '16px',
 *			angle: 45
 *		}
 */
export default {
	mounted(el, binding, vnode, prevVnode) {
		let canvas = document.createElement('canvas')
		canvas.width = el.offsetWidth
		canvas.height = el.offsetHeight
		let ctx = canvas.getContext('2d')
		ctx.rotate((-30 * Math.PI) / 180)
		ctx.font = '16px Microsoft JhengHei'
		ctx.fillStyle = '#333'
		ctx.textAlign = 'left'
		ctx.textBaseline = 'Middle'
		ctx.fillText('lzg版权所有', canvas.width / 10, canvas.height / 2)
		el.style.backgroundImage = 'url(' + canvas.toDataURL('image/png') + ')'
	},
	updated(el, binding, vnode, prevVnode) {

	}
}
