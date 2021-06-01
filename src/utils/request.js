import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '../store'
// import { getToken } from '@/utils/auth'
import {
  getToken,
  removeToken
} from '@/utils/auth'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // console.log(store);
    if (store.getters.token) {
      config.headers['Access-Token'] = getToken('Token') // 让每个请求携带自定义token 请根据实际情况自行修改
    //   config.headers['Content-Type'] = "application/json" // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)
service.interceptors.response.use(
  //   response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    //   // console.log(response)

    const res = response.data
    // console.log(res.code);
    if (res.code != undefined) {
      if (res.code !== 0) {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
        // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
        if (res.code === 50008 || res.code === 50012 || res.code === "ERR00001") {
          // 请自行在引入 MessageBox
          // import { Message, MessageBox } from 'element-ui'
          MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('FedLogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          })
        }
        return Promise.reject('error')
      } else {
        // console.log(response);
        return response
      }
    }else{
       if (response.status !== 200) {
         Message({
           message: res.message,
           type: 'error',
           duration: 5 * 1000
         })
         // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
         if (res.code === 50008 || res.code === 50012 || res.code === "ERR00001") {
           // 请自行在引入 MessageBox
           // import { Message, MessageBox } from 'element-ui'
           MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
             confirmButtonText: '重新登录',
             cancelButtonText: '取消',
             type: 'warning'
           }).then(() => {
             store.dispatch('FedLogOut').then(() => {
               location.reload() // 为了重新实例化vue-router对象 避免bug
             })
           })
         }
         return Promise.reject('error')
       } else {
         console.log(response);
         return response
       }
    }

  },
  error => {
    console.log('err' + error) // for debug
    console.log(error) // for debug
    Message({
        message: '服务器出错',
        type: 'error',
        duration: 2000
      })
    // Message({
    //   message: error.response.data.message.description,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    if (error.response.data.message.code == "ERR00001") {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }

    return Promise.reject(error)
  }
)

export default service



// response 拦截器
// service.interceptors.response.use(
//   response => {
//     /**
//      * code为非20000是抛错 可结合自己业务进行修改
//      */
//     const res = response.data
//     console.log(res.code)
//     if (res.code !=0) {
//       console.log(res)
//       Message({
//         message: res.message,
//         type: 'error',
//         duration: 5 * 1000
//       })

//       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         MessageBox.confirm(
//           '你已被登出，可以取消继续留在该页面，或者重新登录',
//           '确定登出',
//           {
//             confirmButtonText: '重新登录',
//             cancelButtonText: '取消',
//             type: 'warning'
//           }
//         ).then(() => {
//           store.dispatch('FedLogOut').then(() => {
//             location.reload() // 为了重新实例化vue-router对象 避免bug
//           })
//         })
//       }
//       return Promise.reject('error')
//     } else {
//       console.log(res.data)
//       return response
//     }
//   },
//   error => {
//     console.log('err123' + error) // for debug
//     Message({
//       message: error.response.data.message.description,
//       type: 'error',
//       duration: 5 * 1000
//     })
//      if (error.response.data.message.code == "ERR000") {
//         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//           confirmButtonText: '重新登录',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('FedLogOut').then(() => {
//             location.reload() // 为了重新实例化vue-router对象 避免bug
//           })
//         })
//       }
//     return Promise.reject(error)
//   }
// )

// export default service
