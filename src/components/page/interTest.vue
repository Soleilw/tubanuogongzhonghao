<template>
	<div>
		<van-field v-model="form.username" label="用户" placeholder="请输入用户名" />
		<van-field v-model="form.password" label="密码" placeholder="请输入用户名" />
		<van-button type="default" @click="sumbit">提交</van-button>
	</div>
</template>

<script>
	import axios from 'axios';
	var Qs = require('qs')

	export default {
		data() {
			return {
				form: {
					username: 'admin',
					password: '123456'
				}

			}
		},
		methods: {
			sumbit() {
				this.$axios.get("http://192.168.0.108/FaceCore/public/token", {
				}).then(res => {
					var adminForm = Qs.stringify(this.form)
					var config = {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
							'X-CSRF-TOKEN': res.data,
						},
					}
					this.$axios.post("http://192.168.0.108/FaceCore/public/login",adminForm, config).then(res => {
						debugger
					}).catch(err => {
						
					})
				});
			}

		}
	}
</script>

<style>
</style>
