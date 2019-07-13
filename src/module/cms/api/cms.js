import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;
export const page_list =(page,size,params)=> {
  //請求服務端請求
 return http.requestGet(apiUrl+'/cms/page/list/'+page+'/'+size);
}




