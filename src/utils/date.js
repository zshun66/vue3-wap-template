/**
 * 格式化时间
 * value: 传入的值
 * format: 格式器
 */
export function formatTime(value, format = 'YYYY-MM-DD HH:mm:ss') {
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