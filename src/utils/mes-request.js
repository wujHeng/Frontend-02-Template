import axios from 'axios'

console.log(process.env.NODE_MES_BASE_API, 'here')
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/mes' : '/api-mes', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000000000 // request timeout
})

export default service
