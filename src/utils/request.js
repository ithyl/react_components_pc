/*
 * @Author: 姜跃龙
 * @Date: 2019-08-08 17:17:15
 * @LastEditors: 姜跃龙
 * @LastEditTime: 2019-08-29 10:39:58
 * @Description: file content
 */
import axios from 'axios'
import qs from 'qs'

const $axios = axios.create({
  timeout: 150000, // 150秒
  responseType: 'json'
})

// 请求拦截器
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
$axios.interceptors.response.use(response => {
  return response.data
}, e => {
  return Promise.reject(e)
})

export const get = (url, params, headers) => {
  return new Promise((resolve, reject) => {
    $axios({
      method: 'GET',
      url,
      params,
      paramsSerializer: function(params) {
        return qs.stringify(params)
      },
      headers: {
        ...headers,
        'Content-Type': 'application/json;charset=UTF-8', // 指定消息格式
        Authorization: JSON.parse(sessionStorage.getItem('token'))
      }
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}
export const post = (url, params, headers) => {
  return new Promise((resolve, reject) => {
    $axios({
      method: 'POST',
      url,
      data: params,
      headers: {
        ...headers,
        'Content-Type': 'application/json;charset=UTF-8', // 指定消息格式
        Authorization: JSON.parse(sessionStorage.getItem('token'))
      },
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}
export const post2 = (url, params, headers) => {
  return new Promise((resolve, reject) => {
    $axios({
      method: 'POST',
      url,
      data: qs.stringify(params),
      headers: {
        ...headers,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        // 'Content-Type': 'application/json;charset=UTF-8', // 指定消息格式
        Authorization: JSON.parse(sessionStorage.getItem('token'))
      },
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}
export const postUpload = (url, params, headers) => {
  const formData = new FormData()
  for (let [key, value] of Object.entries(params)) {
    formData.append(key, value)
  }
  return new Promise((resolve, reject) => {
    $axios({
      method: 'POST',
      url,
      data: formData,
      headers: {
        ...headers,
        'Content-Type': 'form-data;', // 指定消息格式
        Authorization: sessionStorage.getItem('token')
      },
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}
export const postForm = (url, params, headers) => {
  return new Promise((resolve, reject) => {
    $axios({
      method: 'POST',
      url,
      params,
      paramsSerializer: function(params) {
        return qs.stringify(params)
      },
      headers: {
        ...headers,
        Authorization: JSON.parse(sessionStorage.getItem('token')),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}
export const { put } = $axios
export const del = (url, params) => {
  return $axios.delete(url, { params })
}
export default $axios
