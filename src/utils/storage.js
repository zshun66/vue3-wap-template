import Cookies from 'js-cookie'

// cookie **********************************************************************************************************
/**
 * 存储cookie
 */
export const setCookieStorage = (key, value) => {
	if (!key) return
	if (typeof value === 'object') {
		value = JSON.stringify(value)
	}
	return Cookies.set(key, value)
}

/**
 * 获取cookie
 */
export const getCookieStorage = (key) => {
	if (!key) return
	try {
		return JSON.parse(Cookies.get(key))
	} catch (e) {
		return Cookies.get(key)
	}
}

/**
 * 删除cookie
 */
export const removeCookieStorage = (key) => {
	return Cookies.remove(key)
}

// localStorage *****************************************************************************************
/**
 * 存储localStorage
 */
export const setLocalStorage = (key, value) => {
	if (!key) return
	if (typeof value === 'object') {
		value = JSON.stringify(value)
	}
	localStorage.setItem(key, value)
}

/**
 * 获取localStorage
 */
export const getLocalStorage = (key) => {
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
export const removeLocalStorage = (key) => {
	if (!key) return
	localStorage.removeItem(key)
}

/**
 * 清除所有localStorage
 */
export const clearLocalStorage = () => {
	localStorage.clear()
}

// sessionStorage *****************************************************************************************
/**
 * 存储sessionStorage
 */
export const setSessionStorage = (key, value) => {
	if (!key) return
	if (typeof value === 'object') {
		value = JSON.stringify(value)
	}
	sessionStorage.setItem(key, value)
}

/**
 * 获取sessionStorage
 */
export const getSessionStorage = (key) => {
	if (!key) return
    try {
        return JSON.parse(sessionStorage.getItem(key))
    } catch (e) {
        return sessionStorage.getItem(key)
    }
}
