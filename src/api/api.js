import request from '@/utils/request'
import OSS from 'ali-oss'
import {
  getToken,
} from '@/utils/auth'
let proxyId=getToken('proxyId');
export function indexsj(data) {//测试table
  return request({
    url: '/test',
    method: 'get',
    params: data
  })
}
export function paging(data) { //分页测试
  return request({
    url: '/test/count',
    method: 'get',
    params: data
  })
}
export function indextable(data) {//首页表格
  return request({
    url: '/proxy/lower/off/alert',
    method: 'get',
    params: data
  })
}
export function userlist() {//负责人列表接口
    return request({
      url: '/proxy/lower/operate/user/list',
      method: 'get',
      params: {
        pageNumber: 0,
        pageSize: 50,
        proxyId:proxyId
      }
    })
  }
  export function userbj(shopid,data) {//编辑门店负责人
    return request({
      url: '/proxy/lower/shop/'+shopid+'/principal',
      method: 'put',
      data:data 
    })
  }
  export function cardbd(data) {//台卡绑定
    return request({
      url: '/proxy/lower/card/bind',
      method: 'post',
      params:data 
    })
  }
  export function carbdck(id) {//查看台卡绑定数量
    return request({
      url: '/proxy/lower/card/'+id+'/surplus',
      method: 'GET',
      params:'' 
    })
  }
  
export function shopindextable (data) { //邀请商户table  ||  //门店设置table
    return request({
      url: '/proxy/lower/shop/list',
      method: 'get',
      params: data
    })
  }
export function del(data) {
  return request({
    url: '/test',
    method: 'put',
    params: data
  })
}
export function client(data) {
  var client = new OSS({
    region: 'http://oss-cn-shenzhen.aliyuncs.com',
    accessKeyId: 'LTAIfjM2dpD75eWK',
    accessKeySecret: 'FO9SoLj70c3IdOXpAakczkqBoY08uU',
    bucket: 'sjwladverttest'
  }) //后端提供数据上传图片接口
  return client
}
export function indexdata() {
  return request({
    url: '/proxy/lower/index',
    method: 'get',
    params: {
      proxyId:proxyId
    }
  })
}
