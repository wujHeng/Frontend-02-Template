import request from '@/utils/request'
import API from '@/api/url'

export function getAllProductBatchings() {
  return request({
    url: API.RubberMaterialUrl,
    method: 'get',
    params: { all: 1 }
  })
}
