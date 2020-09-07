import request from '@/utils/request'
import API from '@/api/url'
import axios from 'axios'

export function Synchronization() {
  return request({
    url: API.SynchronizationUrl,
    method: 'get'
  })
}

export function SynchronizationMes(lost_time) {
  return axios.get(API.SynchronizationMesUrl, {
    params: {
      lost_time
    }
  })
}
