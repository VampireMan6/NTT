import { getStorageSync, setStorageSync, removeStorageSync } from "./storage";

const tokenKey = "token";

// 获取用户的本地token
export function getToken() {
  return getStorageSync(tokenKey);
}

// 设置用户的本地token
export function setToken(toekn) {
  return setStorageSync(tokenKey, toekn);
}

// 删除登录信息
export function delToken() {
  return removeStorageSync(tokenKey);
}
