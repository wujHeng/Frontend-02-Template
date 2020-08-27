import request from '@/utils/request'
import API from '@/api/url'

export function getChildSystems() {
  return request({
    url: API.ChildSystemsUrl,
    method: 'get',
    params: { all: 1 }
  })
}
