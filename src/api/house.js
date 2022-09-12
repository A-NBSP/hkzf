import request from '@/utils/request'
/**
 * 根据条件查询房屋
 * @returns promise
 */
export const getHousesAPI = (cityId) => {
  return request({
    url: '/houses',
    params: {
      cityId
    }
  })
}
/**
 * 获取房屋查询条件
 * @param {String} cityId 城市value
 * @returns promise
 */
export const getConditionAPI = (id) => {
  return request({
    url: '/houses/condition',
    params: {
      id
    }
  })
}
