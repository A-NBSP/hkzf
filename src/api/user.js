import request from '@/utils/request'
import store from '@/store'
/**
 * 用户登录
 * @param {String} username 账号
 * @param {String} password 密码
 * @returns promise
 */
export const loginAPI = (username, password) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data: {
      username,
      password
    }
  })
}
/**
 * 获取用户的信息资料
 * @param {String} token token
 * @returns promise
 */
export const userInfoAPI = () => {
  return request({
    url: '/user',
    // 设置请求头
    headers: {
      authorization: store.state.tokenObj
    }
  })
}
