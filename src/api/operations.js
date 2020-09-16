import request from '@/utils/request'
import API from '@/api/url'

export function GetOperations(params) {
  return request({
    url: API.OperationsUrl,
    method: 'get',
    params
  })
}
