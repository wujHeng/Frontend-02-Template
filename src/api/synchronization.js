import request from '@/utils/request'
import API from '@/api/url'

export function Synchronization() {
  return request({
    url: API.SynchronizationUrl,
    method: 'get'
  })
}

export function ManualSync() {
  return request({
    url: API.ManualSyncUrl,
    method: 'post'
  })
}
