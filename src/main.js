import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import * as API from "./api.js"
import Vant from 'vant';
import 'vant/lib/index.css';
// import VantUI from 'vant-ui';
// import "babel-polyfill";

// Vue.use(VantUI, { size: 'small' });
Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = '' // 必须设置
axios.defaults.xsrfHeaderName = '' // 可以不设置，后者依赖前者
Vue.use(Vant)

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
	console.log(to)
	next()

	// if(sessionStorage.getItem('userInfor')){//已注册用户信息
	//     console.log('已注册用户信息')
	//     next();//正常跳转页面
	// }else{//未注册用户信息
	//     console.log('未注册用户信息')
	//     if(to.path == '/login'){//跳转登录页面
	//         if(to.query.code){//获取微信code回调
	//             console.log('获取微信code回调')
	//             next();//正常跳转页面
	//             return;
	//         }
	//     }
	//     console.log('跳转微信获取code')
	//     let path = to.path;
	//     if(to.query.val){//携带参数
	//         path = to.path+"?"+to.query.val
	//     }
	//     console.log(path)
	//     API.wxLogin(path)//微信登录接口（获取code）
	// }

	// if(to.path == '/login'){//跳转申请访客
	//     console.log('跳转注册页面')
	//     let path = to.path;
	//     if(to.query.val){//携带参数
	//         path = to.path+"?"+to.query.val
	//     }
	//     console.log(path)
	//     API.wxLogin(path)//微信登录接口（获取code）
	// }else if(to.path == '/visitor' && !sessionStorage.getItem('userInfor')){//跳转申请访客
	//     console.log('申请访客-无注册')
	//     let path = to.path;
	//     if(to.query.val){//携带参数
	//         path = to.path+"?"+to.query.val
	//     }
	//     API.wxLogin(path )//微信登录接口（获取code）
	// }else if(!sessionStorage.getItem('userInfor')){//跳转其他页面
	//     console.log('无注册')
	//     let path = to.path;
	//     if(to.query.val){//携带参数
	//         path = to.path+"?"+to.query.val
	//     }
	//     console.log(path)
	//     API.wxLogin(path)//微信登录接口（获取code）
	// }else{
	//     console.log('已注册')
	//     next();//正常跳转页面
	// }




	// if(to.path == '/visitor' && !sessionStorage.getItem('userInfor')){//跳转申请访客
	//     API.wxLogin(API.realmB + to.path, to.query.state )//微信登录接口（获取code）
	// }else if(to.path == '/visitor'){//跳转页面
	//     API.wxLogin(API.realmB + to.path, to.query.state )//微信登录接口（获取code）
	// }else if(!sessionStorage.getItem('userInfor')){//跳转其他页面
	//     API.wxLogin(API.realmB + to.path, to.query.state )//微信登录接口（获取code）
	// }else{
	//     next();//正常跳转页面
	// }




	// const role = sessionStorage.getItem('face_token');
	// if(!role && to.path !== '/login'){
	//     next('/login');
	// }else if(to.meta.permission){
	//     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
	//     role === 'admin' ? next() : next('/403');
	// }else{
	//     // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
	//     if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
	//         Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
	//             confirmButtonText: '确定'
	//         });
	//     }else{
	//         next();
	//     }
	// }
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
