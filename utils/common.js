import { getToken } from "./userAuth";
// 跳转
export function navigateTo(path) {
    uni.navigateTo({
        url:"/pages/"+path
    });
}
// 跳转
export function redirectTo(path) {
    uni.redirectTo({
        url:"/pages/"+path
    });
}
// 跳转
export function navigateBack(delta) {
    uni.navigateBack({
        delta: delta
    });
}

// 跳转
export function switchTab(address){
    uni.switchTab({
        url:"/pages/"+address
    });
}

// 跳转
export function reLaunch(address){
    uni.reLaunch({
        url:"/pages/"+address
    });
}

// 需要判断登录的跳转
export function loginNavigateTo(address){
    if (!getToken()) {
        navigateTo("login/login");
        return false;
    }
    navigateTo(address);
}

// 跳转webView
export function jumpWebView(url){
    url = encodeURIComponent(url);
    navigateTo("utils/webView?url=" + url)
}

/**
 * 自动消失的提示窗
 */
export function _toast(msg){
    uni.showToast({
        icon: 'none',
        title: msg,
        duration: 2000
    });
}
/**
 * 将对象转为url参数
 * @param data
 * @param isPrefix
 */
export function queryParams(data, isPrefix = false) {
    let prefix = isPrefix ? '?' : '';
    let _result = [];
    for (let key in data) {
        let value = data[key];
        // 去掉为空的参数
        if (['', undefined, null].includes(value)) {
            continue
        }
        if (value.constructor === Array) {
            value.forEach(_value => {
                _result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value))
            })
        } else {
            _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
        }
    }

    return _result.length ? prefix + _result.join('&') : ''
}
