/**
 * 文件类型数据相互转换
 */
class FileOperation {
	constructor() {

	}

	// base64数据转File
	base64ToFile(dataURL, filename) {
		let arr = dataURL.split(',')
		let mime = arr[0].match(/:(.*?);/)[1]
		let bstr = atob(arr[1])
		let n = bstr.length
		let u8arr = new Uint8Array(n)
		while (n--) {
		    u8arr[n] = bstr.charCodeAt(n)
		}
		return new File([u8arr], filename, { type: mime })
	}
	
	// base64数据转Blob
	base64ToBlob(dataURL) {
		let arr = dataURL.split(',')
		let mime = arr[0].match(/:(.*?);/)[1]
		let bstr = atob(arr[1])
		let n = bstr.length
		let u8arr = new Uint8Array(n)
		while (n--) {
		    u8arr[n] = bstr.charCodeAt(n)
		}
		return new Blob([u8arr], { type: mime })
	}

	// File数据转base64
	fileToBase64(file) {
		new Promise(resolve => {
			var fr = new FileReader()
			fr.onload = function(e) {
				resolve(e.target.result)
			}
			fr.readAsDataURL(file)
		})
	}

	// Blob数据转base64
	blobToBase64(blob) {
		new Promise(resolve => {
			var fr = new FileReader()
			fr.onload = function(e) {
				resolve(e.target.result)
			}
			fr.readAsDataURL(blob)
		})
	}

	// 文件流转Blob
	filestreamToBlob(filestream) {
		return new Blob([filestream])
	}

	// 下载文件(支持传入base64和blob)
	downloadFile(data, filename = '') {
		// console.log(data)
		var href = ''
		if (data instanceof Blob) {
			href = URL.createObjectURL(data)
		} else {
			href = URL.createObjectURL(this.base64ToBlob(data))
		}
		const a = document.createElement('a')
		a.target = '_blank'
		a.style.display = 'none'
		a.download = filename
		a.href = href
		document.body.appendChild(a)
		// a.click()
		var event = new MouseEvent('click')
		a.dispatchEvent(event)
		document.body.removeChild(a)
		// URL.revokeObjectURL(a.href)
		// console.log(href)
	}
}

export default new FileOperation()