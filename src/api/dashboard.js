import request from '@/utils/request'
import API from '@/api/url'

export function equipStatusSlanList(method, data) {
  const obj = {
    url: API.EquipStatusSlanListUrl,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
export function equipDetailedList(method, data) {
  const obj = {
    url: API.EquipDetailedListUrl,
    method: method
  }
  Object.assign(obj, data)
  return request(obj)
}
