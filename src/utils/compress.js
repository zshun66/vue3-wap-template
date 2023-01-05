/**
 * 压缩图片, 返回base64数据
 * file: 需要压缩的文件
 * option: 压缩选项(quality: 压缩质量 width: 图片宽度 height: 图片高度 scale: 压缩比例)
 * callback: 结果回调函数
 */
function image(file, option, callback) {
	let fileReader = new FileReader()
	fileReader.readAsDataURL(file)
	fileReader.onload = () => {
	    let fileResult = fileReader.result
	    canvasDataURL(fileResult, option, callback)
	}
	// 图片渲染至画布 并获取指定质量图片
	const canvasDataURL = (path, option, callback) => {
	    let img = new Image()
	    img.src = path
	    img.onload = () => {
	        // 设置压缩后图片宽度
	        let width = option.width || img.width * option.scale || img.width
	        // 设置压缩后图片高度
	        let height = option.height || img.height * option.scale || (option.width ? option.width * img.height / img.width : '') || img.height
	        // console.log(width, height)
	        // 生成canvas
	        let canvas = document.createElement('canvas')
	        // 设置宽高
	        canvas.width = width
	        canvas.height = height
	        // 渲染图片
	        let ctx = canvas.getContext('2d')
	        ctx.drawImage(img, 0, 0, width, height)
	        let base64 = canvas.toDataURL(file.type || option.type, option.quality || 1)
	        // 回调函数返回base64的值
	        callback(base64)
	    }
	}
}

export default {
	image: image
}
