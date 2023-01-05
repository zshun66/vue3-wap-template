import axios from 'axios'
import {
	getCookieStorage,
	setSessionStorage
	getSessionStorage,
} from '@/utils/storage.js'

// 创建axios实例
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
    },
})
// axiosInstance.defaults.transformResponse.unshift(function(data) {
// 	return data
// })

// 请求拦截器
axiosInstance.interceptors.request.use(function(config) {
	const isAuth = config.options.auth
	const token = getCookieStorage('user_token')
	if (isAuth && token) {
		config.headers['Authorization'] = 'Bearer ' + token
	}

	// post 和 put 请求拦截重复请求
	if (config.method == 'post' || config.method == 'put') {
		const requestObj = {
			url: config.url,
			data: config.data,
			time: new Date().getTime()
		}
		const sessionObj = getSessionStorage('sessionObj')
		if (!sessionObj) {
			setSessionStorage('sessionObj', requestObj)
		} else {
			const r_url = sessionObj.url
			const r_data = sessionObj.data
			const r_time = sessionObj.time
			const interval = 1000
			if (r_data === requestObj.data && requestObj.time - r_time < interval && r_url === requestObj.url) {
				return Promise.reject(new Error('数据正在处理，请勿重复提交'))
			} else {
				setSessionStorage('sessionObj', requestObj)
			}
		}
	}
    return config
}, function (error) {
	console.log('请求拦截器-发生错误', error)
    return Promise.reject(error)
})

// 响应拦截器
axiosInstance.interceptors.response.use(function(response) {
	const code = response.data.code || 200
	const msg = response.data.msg || ''
    if (code == 200) {
        return response
    } else if (code == 401) {
		console.log('异常请求', response)
        Dialog.confirm({
			title: '登录失效, 请重新登录',
		}).then(() => {

		})
    } else {
        console.log('异常请求', response)
        if (response.config.options.alertErrorMsg) {
            Toast.fail(msg)
        }
    }
}, function (error) {
    console.log('响应拦截器-发生错误', error)
	let { message } = error
	if (message == 'Network Error') {
		message = '网络异常'
	} else if (message.includes('timeout')) {
		message = '请求超时'
	} else if (message.includes('Request failed with status code')) {
		message = '服务异常'
	}
	Toast.fail(message)
    return Promise.reject(error)
})

// 封装公共请求方法
export default function request({
    method = 'get',
    url = '',
    params = null,
    data = null,
    extend = null
}) {
    let options = {
        alertErrorMsg: true
    }
    Object.assign(options, extend)

    return axiosInstance({
        method: method,
        url: url,
        params: params,
        data: data,
        options
    })
}
