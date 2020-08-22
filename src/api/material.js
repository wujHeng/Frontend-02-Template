import request from '@/utils/request'
import API from '@/api/url'

export function getMaterials(params) {
  return request({
    url: API.materialsUrl,
    method: 'get',
    params
  })
}

export function updateMaterial(data, id) {
  return request({
    url: API.materialsUrl + id + '/',
    method: 'put',
    data
  })
}

export function deleteMaterial(id) {
  return request({
    url: API.materialsUrl + id + '/',
    method: 'delete',
  })
}

export function createMaterial(data) {
  return request({
    url: API.materialsUrl,
    method: 'post',
    data
  })
}

export function getMaterialTypes() {
  return request({
    url: API.globalCodesUrl,
    method: 'get',
    params: {
      class_name: '原材料类别'
    }
  })
}

export function getPackingUnits() {
  return request({
    url: API.globalCodesUrl,
    method: 'get',
    params: {
      class_name: '包装单位'
    }
  })
}
