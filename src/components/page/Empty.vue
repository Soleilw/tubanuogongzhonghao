<template>
	<div>
		<div class="btn">
			<van-button type="primary" @click="authorization">授权通知</van-button>
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
				user_id: ''
			}
		},
		created() {
			$('title').text('授权')
			// 获取参数
			this.school = API.getUrlParam("school");
			this.user_id = API.getUrlParam("user_id");
		},
		methods: {
			authorization() {
				var that = this;
				API.auth({
					open_id: 'oaHn-0Uz5B2GCTk2W4-1H3wXoItE',
					school: this.school,
					user_id: this.user_id
				}, function(callback) {
					if (callback.msg == 'ok') {
						that.$toast.success("授权成功");
						wx.miniProgram.navigateTo({
							url: '/pages/index/index'
						});
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
		margin-bottom: 20vw;
	}

	.btn img {
		width: 30vw;
		height: 30vw;
	}
</style>
