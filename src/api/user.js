import request from '@/utils/request'
import API from '@/api/url'
// import { data } from 'autoprefixer'

export function login(data) {
  return request({
    url: API.loginUrl,
    method: 'post',
    data
  })
}
// post {}
// get  params: { token }
export function weigh(method, data={}) {
  return request({
    url: API.weighUrl,
    method: method,
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
