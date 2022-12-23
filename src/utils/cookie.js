import Cookies from 'js-cookie'

export const setCookie = (key, value) => {
	if (!key) return
	if (typeof value == 'object') {
		value = JSON.stringify(value)
	}
	return Cookies.set(key, value)
}

export const getCookie = (key) => {
	if (!key) return
	try {
	    return JSON.parse(Cookies.get(key))
	} catch (e) {
	    return Cookies.get(key)
	}
}

export const removeCookie = (key) => {
	return Cookies.remove(key)
}