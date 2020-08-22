import request from '@/utils/request'
import API from '@/api/url'

export function weighCb(method, data={}) {
      return request({
        url: API.weighCbUrl,
        method: method,
        data
      })
    }

export function weighOil(method, data={}) {
      return request({
        url: API.weighOilUrl,
        method: method,
        data
      })
    }