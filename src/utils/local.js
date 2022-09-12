// 存储本地
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
// 设置本地
export const setItem = (key, value) => {
  if (value instanceof Object) {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
