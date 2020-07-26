/**
 * 存储localStorage
 */
export const setStorageSync = (key, val) => {
    if (!key) return;
	try {
	    uni.setStorageSync(key, val);
	} catch (e) {
	    // error
	}
};

/**
 * 获取localStorage
 */
export const getStorageSync = key => {
    if (!key) return;
    let val = uni.getStorageSync(key);
    return val;
};

/**
 * 删除localStorage
 */
export const removeStorageSync = key => {
    if (!key) return;
    uni.removeStorageSync(key);
};
