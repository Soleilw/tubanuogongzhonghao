// import axios from "axios"


export const realmA = "https://huan.fengniaotuangou.cn";//后台线上接口地址(java)
export const realmA_B = "https://gong.fengniaotuangou.cn/api";//后台线上接口地址(php)

export const realmB = "https://xiao.fengniaotuangou.cn";//公众号页面地址

export const appId = "wxa45e3bb7239c5059";//公众号ID

export var headersA = { Token : sessionStorage.getItem('token')};//设置请求头
export var headersB = { Token : sessionStorage.getItem('token'), "content-type" : "application/json; charset=UTF-8"};//设置请求头
export var headersC = { Token : sessionStorage.getItem('token'), "content-type" : "application/x-www-form-urlencoded"};//设置请求头
export var headersD = { "content-type": "application/x-www-form-urlencoded"};//设置请求头
export var headersE = { "content-type": "application/json; charset=UTF-8"};//设置请求头

export var data = {
				userInfor: JSON.parse(sessionStorage.getItem('userInfor')),//登录的用户信息
			};


//封装微信登录接口（获取code）
export const wxLogin = (value) => {
	// let redirect_uri = encodeURIComponent(url)
	window.location.href =
		`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${realmB}&response_type=code&scope=snsapi_base&state=${value}#wechat_redirect`
		// `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=${value}#wechat_redirect`
		// `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATUS#wechat_redirect`
}

// 获取url上的参数
export const getUrlParam = (key) => {
	// 第一种
	let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	let r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return decodeURIComponent(r[2]);
	return null; //返回参数值　

}


//文件存储接口地址
export const txUpload_t = realmA + "/txUpload_t";

//文件存储(人脸)
export const fUploadFile = function(formData,callback){console.log(formData);$.ajax({ type: 'POST',url: realmA+'/txUpload', data: formData, processData: false, contentType: false, beforeSend: function (e) {}, success: function (res) {callback(res)},error : function (err) {}});}
//文件存储
export const uploadFile = function(formData,callback){console.log(formData);$.ajax({ type: 'POST',url: realmA+'/txUpload_t', data: formData, processData: false, contentType: false, beforeSend: function (e) {}, success: function (res) {callback(res)},error : function (err) {}});}


//获取公众号openID
export const getPublicOpenid = function(data,callback){$.ajax({ type:'get', url:realmA_B+"/login", data:data, success:function(res){callback(res)}})}

// 添加访客信息
export const addVisitor = function(data,callback){$.ajax({ type:'post', url:realmA_B+"/visitor", data:data, headers:headersE, success:function(res){callback(res)}})}


// 查看用户信息
// export const getUser = function(data,callback){$.ajax({ type:'get', url:realmA_B+"/user/select_user", data:data, success:function(res){callback(res)}})}
// 查看老师信息
export const getTeacher = function(data,callback){$.ajax({ type:'get', url:realmA+"/user/select_teacher_apply", data:data, success:function(res){callback(res)}})}
// 查看职工信息
export const getStaff = function(data,callback){$.ajax({ type:'get', url:realmA+"/staff/select_staff", data:data, success:function(res){callback(res)}})}

// 修改用户信息
// export const putUser = function(data,callback){$.ajax({ type:'put', url:realmA+"/user/update_user", data:data, headers:headersE, success:function(res){callback(res)}})}
// 修改老师信息
export const putTeacher = function(data,callback){$.ajax({ type:'put', url:realmA+"/user/update_teacher_apply", data:data, headers:headersE, success:function(res){callback(res)}})}
// 修改职工信息
export const putStaff = function(data,callback){$.ajax({ type:'put', url:realmA+"/staff/update_staff", data:data, headers:headersE, success:function(res){callback(res)}})}

// 注册用户信息
export const postUser = function(data,callback){$.ajax({ type:'post', url:realmA+"/user/insert_user", data:data, headers:headersE, success:function(res){callback(res)}})}
// 注册老师信息
export const postTeacher = function(data,callback){$.ajax({ type:'post', url:realmA+"/user/insert_teacher_apply", data:data, headers:headersD, success:function(res){callback(res)}})}
// 注册职工信息
export const postStaff = function(data,callback){$.ajax({ type:'post', url:realmA+"/staff/insert_staff", data:data, headers:headersE, success:function(res){callback(res)}})}

// // 删除管理员账号
// export const delLogin = function(data,callback){$.ajax({ type:'delete', url:realmA+"/heface/login/delLogin/" + data , headers:headersA, success:function(res){callback(res)}})}

// 个人信息
export const getUser = function(data,callback){$.ajax({ type:'get', url:realmA_B+"/user/getUser", data:data, success:function(res){callback(res)}})}

// 用户信息/职工信息注册
//export const postAddUser = function(data,callback){$.ajax({ type:'post', url:realmA_B+"/user/addUser", data:data, headers:headersE, success:function(res){callback(res)}})}

export const postAddUser = function(data,callback){$.ajax({ type:'post', url:realmA_B+"/insert_user", data:data, headers:headersE, success:function(res){callback(res)}})}

// 老师信息注册
// export const postAddTeacher = function(data,callback){$.ajax({ type:'post', url:realmA_B+"/insert_user", data:data, headers:headersE, success:function(res){callback(res)}})}

// 修改信息
export const putUser = function(data,callback){$.ajax({ type:'post', url:realmA_B+"/user/updateUser", data:data, headers:headersB, success:function(res){callback(res)}})}

// 获取班级列表
// export const getClass = function(data,callback){$.ajax({ type:'get', url:realmA_B+"/user/class", data:data, success:function(res){callback(res)}})}
export const getGrade = function(data,callback){$.ajax({ type:'get', url:realmA_B+"/grades", data:data, success:function(res){callback(res)}})}
export const getClass = function(data,callback){$.ajax({ type:'get', url:realmA_B+"/classes", data:data, success:function(res){callback(res)}})}

// 我的孩子
// 搜索学生信息
export const getStudent = function(data,callback){$.ajax({ type:'get', url:realmA_B+"/user/likeStudent", data:data, success:function(res){callback(res)}})}

// 上传学生信息
export const saveStudent = function(data,callback){$.ajax({ type:'post', url:realmA_B+"/user/saveStudent", data:data, headers:headersE, success:function(res){callback(res)}})}

// 所有孩子信息
export const getMyChild = function(data,callback){$.ajax({ type:'get', url:realmA_B+"/user/getStudent", data:data, success:function(res){callback(res)}})}

// 单个孩子信息
export const getOneChild = function(data,callback){$.ajax({ type:'get', url:realmA_B+"/user/getOneStudent", data:data, success:function(res){callback(res)}})}


// 班级管理
// 需审核的学生的接口
export const getAuditStudent = function(data,callback){$.ajax({ type:'get', url:realmA_B+"/user/exStudent", data:data, success:function(res){callback(res)}})}

// 审核接口
export const getAudit = function(data,callback){$.ajax({ type:'get', url:realmA_B+"/user/exStatus", data:data, success:function(res){callback(res)}})}

// 家庭成员信息
export const getFamilyMember = function(data,callback){$.ajax({ type:'get', url:realmA_B+"/user/exStudent", data:data, success:function(res){callback(res)}})}
