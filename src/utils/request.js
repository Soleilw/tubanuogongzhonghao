import axios from 'axios'

const service = axios.create({
	 timeout: 5000
})

// 添加请求拦截器
service.interceptors.request.use(config => {
	// 让每个请求携带token
	// if('token存在') {
	// 	config.headers = 'token的来历';
	// }
	return config;
}, error => {
	console.log(error)
	return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(response => {
	debugger
	// let res = response.data;
	if(response.status === 401) {
		debugger
		return response;
	} else {
		return response
	}
}, error => {
	console.log('err' + error) 
	return Promise.reject(error)
})

export default service;

// {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }