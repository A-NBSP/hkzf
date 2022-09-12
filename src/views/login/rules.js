// 匹配正则
// 账号
export const usernameRule = [
  { required: true, message: '账号不能为空' },
  {
    pattern: /^\w+$/,
    message: '账号格式错误'
  }
]
// 密码
export const passwordRule = [
  { required: true, message: '密码不能为空' },
  {
    pattern: /[0-9]{6}/,
    message: '密码格式错误'
  }
]
