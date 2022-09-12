// area区域请求模块
import request from '@/utils/request'
/**
 * 获取城市列表
 * @returns promise
 */
export const cityAPI = (level) => {
  return request({
    url: '/area/city',
    params: {
      level
    }
  })
}
/**
 * 获取热门城市
 * @returns promise
 */
export const hotCityAPI = () => {
  return request({
    url: '/area/hot'
  })
}
/**
 * 根据城市名称查询该城市信息
 * @param {String} name 城市名称
 * @returns promise
 */
export const getHouseInfoAPI = (name) => {
  return request({
    url: '/area/info',
    params: {
      name
    }
  })
}
/**
 * 获取子级城市列表
 * @param {String} id 城市id
 * @returns promise
 */
export const sonCityAPI = (id) => {
  return request({
    url: '/area',
    params: {
      id
    }
  })
}
/**
 * 使用关键词查询小区信息
 * @param {Object} data 城市的name及id
 * @returns promise
 */
export const getCommunityAPI = (data) => {
  return request({
    url: '/area/community',
    params: data
  })
}
