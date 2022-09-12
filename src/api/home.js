import request from '@/utils/request'
/**
 * 获取轮播图信息
 * @returns promise
 */
export const swiper = () => {
  return request({
    url: '/home/swiper'
  })
}
/**
 * 获取租房小组
 * @returns promise
 */
export const tenements = () => {
  return request({
    url: '/home/groups'
  })
}
