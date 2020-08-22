import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (config.method === 'get') {
      // console.log(config, 'config')
      // config.url = config.url
      // let urlTest = config.url
      // console.log(urlTest.match(/\{[\S\s]+\}/g)[0], '11111111111')
      // let params_ = urlTest.match(/\{[\S\s]+\}/g)[0]
      // let result = params_.substring(1, params_.length - 1)

      // console.log(config.parame,999)
      // config.url+'/'+
    }
    if (store.getters.token) {
      config.headers['Authorization'] = 'JWT ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    return Promise.resolve(res)
  },
  error => {
    console.log(error.response.data)
    if (Object.prototype.toString.call(error.response.data) === '[object Object]') {
      let obj = error.response.data
      let str = ''
      for (let key in obj) {
        if (!(obj[key] instanceof Array)) {
          str += obj[key]
        } else {
          obj[key].forEach(element => {
            str += element + ';'
          });
        }
      }
      // console.log(str, 'strstr')
      Message({
        message: str,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(error.response.data)
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
