<template>
	<div>
		<div class="btn">
			<van-button type="primary" @click="authorization">授权通知</van-button>
			<p style="margin-bottom: 20vw;font-size: 4vw;">点击领取获得推送资格</p>
			<p>关注公众号方可接收孩子进出推送消息</p>
			<img src="../../assets/images/qrcode.jpg" alt="">
		</div>
	</div>
</template>

<script>
	import * as API from "../../api.js"
	export default {
		data() {
			return {
				school: '',
				user_id: '',
			}
		},
		created() {
			$('title').text('授权')
			console.log('进来了授权页面')
			// 获取参数
			this.school = API.getUrlParam("school");
			this.user_id = API.getUrlParam("user_id");
			// sessionStorage.setItem('openId', 'oaHn-0Uz5B2GCTk2W4-1H3wXoItE')
		},
		methods: {
			authorization() {
				console.log('进来了授权页面')
				var that = this;
				API.auth({
					open_id: sessionStorage.getItem('openId'),
					school:  this.school,
					user_id: this.user_id
				}, function(callback) {
					console.log('调用了授权页面')
					if (callback.msg == 'ok') {
						console.log('授权成功了')
						that.$toast.success("授权成功");
						// wx.miniProgram.navigateTo({
						// 	url: '/pages/index/index'
						// });
					} else {
						console.log(22,callback)
					}
				})

			}
		}
	}
</script>

<style>
	.btn {
		text-align: center;
		padding: 40vw 0;
	}

	.btn .van-button {
		/* margin-bottom: 20vw; */
	}

	.btn img {
		width: 30vw;
		height: 30vw;
	}
</style>
