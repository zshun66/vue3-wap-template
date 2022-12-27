/**
 * 格式化时间
 * @param {Date} value
 * @param {String} format
 */
export function format(value, format = 'YYYY-MM-DD HH:mm:ss') {
    if (!value) return ''
    let date = new Date(value)
    // console.dir(date)
    if (date.toString() == 'Invalid Date') return value
    const config = {
        YYYY: date.getFullYear(),
        MM: (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
        DD: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        HH: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        mm: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        ss: date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(),
    }
    for (const key in config) {
        format = format.replace(key, config[key])
    }
    return format
}

/**
 * @param {Date} value
 */
export function dateDiff(value) {
	if (!value) return ''
	let oldDate = new Date(value)
	// console.dir(oldDate)
	if (oldDate.toString() == 'Invalid Date') return value
	
	let minute = 1000 * 60
	let hour = minute * 60
	let day = hour * 24
	let halfMonth = day * 15
	let month = day * 30

	let nowDate = new Date()
	let diffValue = nowDate.getTime() - oldDate.getTime()
	
	let monthC = diffValue / month
	let weekC = diffValue / (7 * day)
	let dayC = diffValue / day
	let hourC = diffValue / hour
	let minC = diffValue / minute
	
	if (monthC >= 1) {
		result = parseInt(monthC) + '个月前'
	} else if (weekC >= 1) {
		result = parseInt(weekC) + '周前'
	} else if (dayC >= 1) {
		result = parseInt(dayC) + '天前'
	} else if (hourC >= 1) {
		result = parseInt(hourC) + '个小时前'
	} else if (minC >= 1) {
		result = parseInt(minC) + '分钟前'
	} else {
		result = '刚刚'
	}
	return result
}

/**
 * @param {Date} value
 */
export function monthDayDiff(value) {
    let flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2]
    let start = new Date(value)
    let end = new Date()
    let year = end.getFullYear() - start.getFullYear()
    let month = end.getMonth() - start.getMonth()
    let day = end.getDate() - start.getDate()
    if (month < 0) {
        year--
        month = end.getMonth() + (12 - start.getMonth())
    }
    if (day < 0) {
        month--
        let index = flag.findIndex((temp) => {
            return temp === start.getMonth() + 1
        })
        let monthLength
        if (index <= 6) {
            monthLength = 31
        } else if (index > 6 && index <= 10) {
            monthLength = 30
        } else {
            monthLength = 28
        }
        day = end.getDate() + (monthLength - start.getDate())
    }
    let result = ''
    if (year !== 0) {
        if (month !== 0) {
            result = `${year}年${month}个月${day}天`
        } else {
            result = `${day}天`
        }
    } else {
        result = `${month}个月${day}天`
    }
    return result
}