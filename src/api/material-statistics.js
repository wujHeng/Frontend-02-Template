import request from '@/utils/request'
import API from '@/api/url'

export function getMaterialStatistics(params) {
  return request({
    url: API.MaterialStatisticsUrl,
    method: 'get',
    params
  })
}
