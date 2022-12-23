import axios from 'axios'
import { getCookie } from '@/utils/cookie.js'

// 创建axios实例
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
    },
})
axiosInstance.defaults.transformResponse.unshift(function(data) {
	return data
})

// 请求拦截器
axiosInstance.interceptors.request.use(function(config) {
	const token = getCookie('user_token')
	const isAuth = config.options.auth
	if (isAuth && token) {
		config.headers['Authorization'] = 'Bearer ' + token
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
		message = '系统接口' + message.substr(message.length - 3) + '异常'
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