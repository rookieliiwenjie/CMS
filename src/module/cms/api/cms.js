import http from './../../../base/api/public'
import querystring from 'querystring'

let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;
export const page_list = (params) => {
  //請求服務端請求
  let querystr = querystring.stringify(params)
  return http.requestGet(apiUrl + '/cms/page/list/' + "?" + querystr);

}
export const site_list = () => {
  //将对象的数据拼接key/value
  return http.requestGet(apiUrl + '/cms/site')
}
export const templet_list = () => {
  return http.requestGet(apiUrl + '/cms/templete/all')
}




