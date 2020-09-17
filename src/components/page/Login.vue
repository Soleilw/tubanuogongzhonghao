<template>
	<div class="login-wrap">
	</div>
</template>

<script>
	import * as API from "../../api.js"


	export default {
		data: function() {
			return {
				code: "",
				state: "",
				school: '',
				user_id: ''
			}
		},
		created() {
			this.$toast.loading("登录中...");
			console.log(window.location)
			this.code = API.getUrlParam("code"); //获取url参数
			this.state = API.getUrlParam("state"); //获取url参数
			this.school = API.getUrlParam("school");
			this.user_id = API.getUrlParam("user_id");
			if(this.school !== null) {
				sessionStorage.setItem('school', this.school);
			}
			if(this.user_id !== null) {
				sessionStorage.setItem('user_id', this.user_id);
			}
			console.log('code=' + this.code)
			console.log('state=' + this.state)

			if (this.code) { //获取code回调过来的
				this.GetOpenId();
			} else {
				API.wxLogin(this.state) //微信登录接口（获取code）
			}


		},
		methods: {
			//获取OpenId

			GetOpenId: function(code) {
				let that = this
				API.getPublicOpenid({
					code: that.code
				}, function(callback) {
					console.log('获取OpenId')
					console.log(callback.data)
					if (callback.msg == 'ok') {
						sessionStorage.setItem('openId', callback.data);
						// that.$router.push("/" + that.state);
						if(that.state === "empty-1"){
							that.$router.push("/empty-1" + '?' + 'school' + "=" + sessionStorage.getItem('school') + '&' + 'user_id' + "=" + sessionStorage.getItem('user_id') + '&' + 'open_id' + "=" + sessionStorage.getItem('openId'));
						}else if(that.state === "empty"){
							that.$router.push("/empty" + '?' + 'school' + "=" + sessionStorage.getItem('school') + '&' + 'user_id' + "=" + sessionStorage.getItem('user_id') + '&' + 'open_id' + "=" + sessionStorage.getItem('openId'));
						}else {
							that.$router.push("/" + that.state);
						}
						
						
						
						
										// 	if(that.state.indexOf("visitor") == 0){//跳转访客申请页面
					// 	    that.$router.push("/" + that.state);
					// 	}
					// 	else{//跳转其他页面(要注册用户信息)
					
						
					// 	    that.GetUserInfo();
					// 	}
					} else {
						that.$toast.fail("请关注公众号");
					}
				})
			},

			//获取用户信息
			GetUserInfo: function() {
				let that = this
				API.getUser({
					user_openid: sessionStorage.getItem('openId')
				}, function(callback) {
					console.log('11111,用户信息')
					console.log(callback.user)
					if (callback.msg === 'ok') { //已注册
						sessionStorage.setItem("userInfor", JSON.stringify(callback.user));
						API.data.userInfor = callback.user
						that.$router.push("/personal");
					} else { //未注册
						console.log('2222,用户信息')
						that.$router.push("/userInfo"); //前往注册
					}
				})
			},
		}
	}
</script>

<style scoped>

</style>
