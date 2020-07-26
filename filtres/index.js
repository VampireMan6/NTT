import { UPLOAD_IMAGE_URL } from "../config/app";

/**
 * 把上传的图片的 path 路径转为 url 地址
 * @param path
 * @returns {string}
 */
export function uploadImagePathToUrl(path) {

    if (["", undefined, null].includes(path)) {
        return path;
    }

    if (path.indexOf("http") === 0) {
        return path;
    } else if (path.indexOf("/") === 0) {
        return path;
    }

    return UPLOAD_IMAGE_URL + "/" + path;
}
/**
 * 时间戳格式化
 * @param {String} 内容
 */
export function _formatDate(inputTime){
    var date = new Date(parseInt(inputTime * 1000));
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d +' ' + h + ':' + minute + ':' + second;
}
export function _formatDatea(inputTime){
    var date = new Date(parseInt(inputTime * 1000));
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d;
}
/**
 * @return {string}
 */
export function FormatDate(date_str, fmt) {
    date_str =
        typeof date_str === "string" ? date_str.replace(/-/g, "/").replace(".000", "") : date_str;
    let date = new Date(date_str);
    if (isNaN(date.getDate())) {
        return "";
    }
    if (!fmt) {
        fmt = "yyyy-MM-dd";
    }
    const o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length)
            );
    return fmt;
}

/**
 * 处理科学计数的问题
 * @param num
 * @returns {string|number}
 */
export function toNonExponential(num) {
    if (!num) {
        return 0;
    }
    num = parseFloat(num);
    if (isNaN(num)) {
        return 0;
    }
    let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}
/**
 * 保留2位小数
 * @param num
 * @returns {string|number}
 */
export function toFixed(num) {
    if (!num) {
        return 0;
    }
    num = parseFloat(num);
    if (isNaN(num)) {
        return 0;
    }
    let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return num.toFixed(2);
}
/**
 * 处理富文本图片限制
 * @param num
 * @returns {string|number}
 */
export function richtextlimit(attr) {
	if(attr){
		const regex = new RegExp('<img', 'gi');
		let richtext = attr.replace(regex, `<img height='auto' style="max-width: 100%;"`);
		return richtext
	}
}
/**
 * 电话号码中间用*代替
 * @param cellValue
 * @returns {string|*}
 */
export function phoneMethod(cellValue){
    if (Number(cellValue) && String(cellValue).length === 11) {
        var mobile = String(cellValue);
        var reg = /^(\d{3})\d{4}(\d{4})$/;
        return mobile.replace(reg, '$1****$2');
    } else if (!cellValue){
        return "";
    } else {
        return cellValue;
    }
}
