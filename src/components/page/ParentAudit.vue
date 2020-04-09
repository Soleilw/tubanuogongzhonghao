<template>
	<div>
		<div v-if="parentList.length > 0">
			<div class="audit">
				<div v-for="(item,index) in parentList" :key="index" class="info">
					<div class="infolist" @click='toFamily'>
						<img class="auditicon" src="../../assets/icon/parent.png" alt=""><span>{{item.user_name}}</span>
					</div>
					<div class="infolist" @click='toChildren_Details(item.stu_number)'>
						<img class="auditicon" src="../../assets/icon/children2.png" alt=""><span>{{item.stu_name}}</span>
					</div>
					
					<div class="infolist">
						<div v-if="item.stu_status === 0" @click="toAudit(item.stu_number)"  class="auditbtn">
							去审核
						</div>
						<div v-else class="auditbtn">已审核</div>
					</div>
			
				</div>
			</div>
		</div>
		<div v-else class="not_info">
			暂无审核信息
		</div>
	</div>

</template>

<script>
	import * as API from "../../api.js"
	export default {
		data() {
			return {
				parentList: [],
				stuNum: [],
				code: ''
			}
		},

		created() {
			$('title').text('家长审核');
			this.getAuditStudent();
		},
		methods: {
			
			getAuditStudent() {
				let that = this;
				API.getAuditStudent({
					user_openid: sessionStorage.getItem('openId')
				}, function(callback) {
					if (callback.msg === 'ok') {
						that.parentList = callback.data;
						for (var i in that.parentList) {
							that.stuNum.push(that.parentList[i].stu_number);
						}
					}
				})
			},
			// 进入家庭成员信息
			toFamily() {
				this.$router.push('/familyMemberInfo');
			},
			toChildren_Details(stu_number) {
			    console.log(stu_number)
			    this.$router.push("/childrenInfo?stu_number=" + stu_number);
			},
			toAudit(stu_number) {
				var that = this;
				that.$dialog.confirm({
					title: "审核",
					message: "选择审核结果",
					confirmButtonText: "通过审核", //改变确认按钮上显示的文字
					cancelButtonText: "未通过审核" //改变取消按钮上显示的文字
				}).then(() => {
					API.getAudit({
						stu_number: stu_number,
						code: 1
					}, function(callback) {
						if (callback.msg === 'ok') {
							console.log(1111)
						}
					})
				}).catch(() => {
					API.getAudit({
						stu_number: stu_number,
						code: 2
					}, function(callback) {
						if (callback.msg === 'ok') {
							console.log(2222)
						}
					})
				})
			}
		}
	}
</script>

<style scoped>
	.audit {
		padding: 0 0 2vw 4vw;
	}

	.audit .info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #666;
		padding: 2vw 2.5vw 2vw 0;
		border-bottom: .2vw solid #ddd;
	}

	.audit .info .infolist {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.audit .info .infolist img {
		width: 6vw;
		height: 6vw;
		margin: 0 1vw;
	}

	.audit .info .infolist .auditbtn {
		/* width: 20vw; */
		padding: 1vw 4vw;
		border-radius: 2vw;
		text-align: center;
		background-color: #1989fa;
		color: #fff;
		font-size: 4vw;
	}
	
	.not_info {
		display: flex;
		justify-content: center;
		margin-top: 20vw;
		font-size: 5vw;
	}
</style>
