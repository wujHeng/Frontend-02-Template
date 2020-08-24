import request from '@/utils/request'
import API from '@/api/url'

export function getAllEquips() {
  return request({
    url: API.EquipUrl,
    method: 'get',
    params: { all: 1 }
  })
}
