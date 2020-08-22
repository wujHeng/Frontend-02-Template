import request from '@/utils/request'
import API from '@/api/url'

export function equipStatusSlanList(method, data) {
    let obj = {
        url: API.EquipStatusSlanListUrl,
        method: method
    }
    Object.assign(obj, data)
    return request(obj)
}
export function equipDetailedList(method, data) {
    let obj = {
        url: API.EquipDetailedList + data.params.id + '/',
        method: method
    }
    Object.assign(obj, data)
    return request(obj)
}