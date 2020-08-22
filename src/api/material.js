import request from '@/utils/request'
import API from '@/api/url'

export function getMaterials(params) {
  return request({
    url: API.materialsUrl,
    method: 'get',
    params
  })
}
