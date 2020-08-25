import request from '@/utils/request'
import API from '@/api/url'
// import { data } from 'autoprefixer'

export function login(data) {
  return request({
    url: API.LoginUrl,
    method: 'post',
    data
  })
}
// export function getInfo(token) {
//   return request({
//     url: API.UserInfoUrl,
//     method: 'post',
//     data:{token}
//   })
// }

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
