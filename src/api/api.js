// import url from './url.js'
import request from '../utils/request.js'

function queryData(data) {
  var str = "";
  for (var i in data) {
    str += i + "=" + data[i] + "&";
  }
  if (str) {
    str = "?" + str;
    str = str.substr(0, str.length - 1);
  }
  return str;
}

var api = {};

api.get = function(url, data) {
  return request({
    url: 'https://gong.fengniaotuangou.cn/api' + url + queryData(data),
    method: 'get'
  })
}

export default api;


