import request from '@/utils/request'
import mesRequest from '@/utils/mes-request'
import API from '@/api/url'

export function Synchronization() {
  return request({
    url: API.SynchronizationUrl,
    method: 'get'
  })
}

export function SynchronizationMes(lost_time) {
  return mesRequest({
    url: API.SynchronizationUrl,
    method: 'get',
    params: { lost_time }
  })
}
