import request from '@/utils/request'
import OSS from 'ali-oss'
import {
  getToken,
} from '@/utils/auth'
let proxyId = getToken('proxyId');
export function indexsj(data) { //测试table
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
export function indextable(data) { //首页表格
  return request({
    url: '/proxy/lower/off/alert',
    method: 'get',
    params: data
  })
}
export function userlist() { //负责人列表接口
  return request({
    url: '/proxy/lower/operate/user/list',
    method: 'get',
    params: {
      pageNumber: 0,
      pageSize: 50,
      proxyId: proxyId
    }
  })
}
export function cardbd(data) { //台卡绑定
  return request({
    url: '/proxy/lower/card/bind',
    method: 'post',
    params: data
  })
}
export function carbdck(id) { //查看台卡绑定数量
  return request({
    url: '/proxy/lower/card/' + id + '/surplus',
    method: 'GET',
    params: ''
  })
}
export function shopaudit(data) { // 商户审核列表
  return request({
    url: '/proxy/lower/shop/review',
    method: 'GET',
    params: data
  })
}

export function shopindextable(data) { //邀请商户table  ||  //门店设置table
  return request({
    url: '/proxy/lower/shop/list',
    method: 'get',
    params: data
  })
}

export function recycle(data) { //回收管理
  return request({
    url: '/proxy/lower/card/recovery/review',
    method: 'get',
    params: data
  })
}
export function accountmanage(data) { //业务员管理
  return request({
    url: '/proxy/lower/operate/user/data',
    method: 'get',
    params: data
  })
}
export function workorderinstall(data) { //安装订单
  return request({
    url: '/proxy/lower/work/order/install',
    method: 'get',
    params: data
  })
}
export function workordermaintain(data) { //运维订单
  return request({
    url: '/proxy/lower/work/order/maintain',
    method: 'get',
    params: data
  })
}
export function ordermaintain(id) { //运维订单详情
  return request({
    url: '/proxy/lower/work/order/' + id + '/maintain',
    method: 'get'
  })
}
export function cardlist(data) { //台卡管理数据表格
  return request({
    url: '/proxy/lower/card/list',
    method: 'get',
    params: data
  })
}
export function cardshutdown(id) { //台卡关机
  return request({
    url: '/proxy/lower/card/shutdown',
    method: 'post',
    params: {
      cardIds: id
    }
  })
}
export function cardrestart(id) { //台卡关机
  return request({
    url: '/proxy/lower/card/restart',
    method: 'post',
    params: {
      cardIds: id
    }
  })
}
export function cardindexdata(proxyId) { //台卡管理数据首页数据
  return request({
    url: '/proxy/lower/' + proxyId + '/data/screening',
    method: 'get',
    params: {
      proxyId: proxyId
    }
  })
}
export function cardcountdata(data) { //台卡管理数据首页数据在线离线
  return request({
    url: '/proxy/lower/' + proxyId + '/card/status/count',
    method: 'get',
    params: data
  })
}
export function myChartdata1(data) { //台卡管理数据首页图标数据1
  return request({
    url: '/proxy/lower/' + data.proxyId + '/reach/summary',
    method: 'get',
    params: data
  })
}
export function myChartdata2(data) { //台卡管理数据首页图标数据2
  return request({
    url: '/proxy/lower/' + data.proxyId + '/reach/inYear',
    method: 'get',
    params: data
  })
}
export function standardtable2(data) { //小鹿有哲/台卡管理/达标记录/记录查看
  return request({
    url: '/proxy/lower/shop/summary',
    method: 'get',
    params: data
  })
}
export function standardtable1(data) { //小鹿有哲/台卡管理/达标记录/报表查看
  return request({
    url: '/proxy/lower/' + data.proxyId + '/reach/report/summary',
    method: 'get',
    params: data
  })
}
export function province(data) { //获取省份
  return request({
    url: '/proxy/province',
    method: 'get',
    params: {
      pageNumber: 0,
      pageSize: 35
    }
  })
}
export function cityid(id) { //获取市
  return request({
    url: '/proxy/province/city',
    method: 'get',
    params: {
      pageNumber: 0,
      pageSize: 35,
      provinceId: id
    }
  })
}
export function areaset(id) { //获取区
  return request({
    url: '/proxy/city/' + id,
    method: 'get',
    params: {
      pageNumber: 0,
      pageSize: 35,
    }
  })
}
export function userfuzeren(data) { //负责人下拉列表
  return request({
    url: '/proxy/lower/operate/user/list',
    method: 'get',
    params: {
      proxyId: data.proxyId,
      shopId: data.shopId,
      pageNumber: 0,
      pageSize: 35
    }
  })
}
export function uporderajaxapi(data) { //发送运维工单
  return request({
    url: '/proxy/lower/work/order/maintain',
    method: 'post',
    params: data
  })
}
export function historyapixx(id) { //历史记录获取基础信息
  return request({
    url: '/proxy/lower/shop/' + id + '/principal',
    method: 'get',
  })
}
export function historytable(data) { //历史记录table
  return request({
    url: '/proxy/lower/shop/' + data.shopId + '/history',
    method: 'get',
    params: data
  })
}
export function historytable2(data) { //历史记录table查看日志
  return request({
    url: '/proxy/lower/maintain/log',
    method: 'get',
    params: data
  })
}
export function reachxqsj(shopId) { //达标记录详情用户数据
  return request({
    url: '/proxy/lower/' + shopId + '/shop',
    method: 'get',
  })
}
export function reachxqtb(data) { //达标记录详情圆形进度条
  return request({
    url: '/proxy/lower/shop/' + data.shopId + '/reach/rate',
    method: 'get',
    params: data
  })
}
export function reachxqtable(data) { //达标记录详情table
  return request({
    url: '/proxy/lower/shop/' + data.shopId + '/reach/info',
    method: 'get',
    params: data
  })
}
export function timingajax(data) { //达标记录详情table
  return request({
    url: '/proxy/lower/shop/time',
    method: 'get',
    params: data
  })
}
export function timeshez(shopId) { //达标记录详情table
  return request({
    url: '/proxy/lower/shop/' + shopId + '/time',
    method: 'get',
  })
}
export function timecq(data) { //重启休眠时间提交
  return request({
    url: '/proxy/lower/shop/' + data.shopId + '/time',
    method: 'post',
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
      proxyId: proxyId
    }
  })
}



//put 接口///////////////////////////////////////////////////////////////////////////////////////
export function userbj(shopid, data) { //编辑门店负责人
  return request({
    url: '/proxy/lower/shop/' + shopid + '/principal',
    method: 'put',
    data: data
  })
}
export function recyclesh(data) { //回收审核
  return request({
    url: '/proxy/lower/card/recovery/review',
    method: 'put',
    data: data
  })
}
export function recalls(data) { //撤销工单
  return request({
    url: '/proxy/lower/work/order/install/revoke',
    method: 'put',
    data: data
  })
}
export function reviewinstall(data) { //审核工单
  return request({
    url: '/proxy/lower/work/order/install/review',
    method: 'put',
    data: data
  })
}
