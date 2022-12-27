/**
 * 压缩图片, 返回base64数据
 * file: 需要压缩的文件
 * compressedOption: 压缩选项(quality: 压缩质量 width: 图片宽度 height: 图片高度 scale: 压缩比例)
 * callback: 结果回调函数
 */
export default function compressImage(file, compressedOption, callback) {
	let fileReader = new FileReader()
	fileReader.readAsDataURL(file)
	fileReader.onload = () => {
	    let fileResult = fileReader.result
	    canvasDataURL(fileResult, compressedOption, callback)
	}
	// 图片渲染至画布 并获取指定质量图片
	const canvasDataURL = (path, compressedOption, callback) => {
	    let img = new Image()
	    img.src = path
	    img.onload = () => {
	        // 设置压缩后图片宽度
	        let width = compressedOption.width || img.width * compressedOption.scale || img.width
	        // 设置压缩后图片高度
	        let height = compressedOption.height || img.height * compressedOption.scale || (compressedOption.width ? compressedOption.width * img.height / img.width : '') || img.height
	        // console.log(width, height)
	        // 生成canvas
	        let canvas = document.createElement('canvas')
	        // 设置宽高
	        canvas.width = width
	        canvas.height = height
	        // 渲染图片
	        let ctx = canvas.getContext('2d')
	        ctx.drawImage(img, 0, 0, width, height)
	        let base64 = canvas.toDataURL(file.type || compressedOption.type, compressedOption.quality || 1)
	        // 回调函数返回base64的值
	        callback(base64)
	    }
	}
}