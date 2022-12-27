/**
 * 存储localStorage
 */
export const setStorage = (key, value) => {
	if (!key) return
	if (typeof value === 'object') {
		value = JSON.stringify(value)
	}
	localStorage.setItem(key, value)
}

/**
 * 获取localStorage
 */
export const getStorage = (key) => {
	if (!key) return
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch (e) {
        return localStorage.getItem(key)
    }
}

/**
 * 删除localStorage
 */
export const removeStorage = (key) => {
	if (!key) return
	localStorage.removeItem(key)
}

/**
 * 清除所有localStorage
 */
export const clearStorage = () => {
	localStorage.clear()
}