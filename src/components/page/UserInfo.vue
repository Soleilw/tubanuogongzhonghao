<template>
	<div>
		<div class="content">
			<van-form @submit="onSubmit">
				<div class="van-cell van-field" v-if="userInfor.user_image">
					<div class="van-cell__title van-field__label">
						<span>头像</span>
					</div>
					<div class="van-cell__value van-field__value">
						<div class="van-field__body">
							<div class="van-field__control van-field__control--right" >
								<img style="width: 26vw; height: 24vw;border-radius: 2vw;" :src="userInfor.user_image" alt="">
							</div>
						</div>
					</div>
				</div>
				<!-- 姓名 -->
				<van-field v-model="userInfor.user_name" type="text" label="姓名" placeholder="请填写姓名" input-align="right" required />

				<!-- 性别 -->
				<van-field :value="sexList[userInfor.user_sex - 1]" type="text" label="性别" placeholder="点击选择" @click="showPicker1 = true"
				 input-align="right" required />

				<!-- 证件号 -->
				<van-field v-model="userInfor.user_card" type="text" label="证件号" placeholder="请填写证件号" input-align="right" required />

				<!-- 手机号 -->
				<van-field v-model="userInfor.user_iphone" type="text" label="手机号" placeholder="请填写手机号" input-align="right"
				 required />

				<!-- 地址 -->
				<van-field v-model="userInfor.user_address" type="textarea" label="地址" placeholder="请填写地址" input-align="right"
				 autosize show-word-limit maxlength="50" required />

				<!-- 是否为职工 -->
				<van-cell center title="是否本校职工" required>
					<van-switch v-model="worker" size="20" @change="switch1" :disabled="disabled1" />
				</van-cell>

				<div v-if="worker">
					<!-- 部门 -->
					<van-field v-model="workerInfor.date1" type="text" label="部门" placeholder="请填写部门" input-align="right" required />
					<!-- 职位 -->
					<van-field v-model="workerInfor.positions" type="text" label="职位" placeholder="请填写职位" input-align="right" required />
				</div>

				<!-- 是否为教师 -->
				<van-cell center title="是否本校教师" required>
					<van-switch v-model="swi_teacher" size="20" @change="switch2" :disabled="disabled2" />
				</van-cell>

				<div v-if="swi_teacher">
					<!-- 是否为班主任 -->
					<van-cell center title="是否是班主任" required>
						<van-switch v-model="charge" size="20" :disabled="disabled3" />
					</van-cell>

					<!-- 工号 -->
					<van-field v-model="teacherInfor.work_number" type="text" label="工号" placeholder="请填写工号" input-align="right"
					 required />

					<!-- 年级 -->
					<van-field readonly clickable label="年级" :value="userInfor.class_grade" placeholder="请选择年级" input-align="right"
					 @click="showPicker2 = true" required />

					<!-- 班级 -->
					<van-field readonly clickable label="班级" :value="userInfor.class_name" placeholder="请选择班级" input-align="right"
					 @click="showPicker3 = true" required />

					<!-- 学科 -->
					<van-field v-model="teacherInfor.subjects" type="text" label="学科" placeholder="请填写学科" input-align="right" required />
				</div>
				<!-- 人脸 -->
				<div v-if="worker === true || swi_teacher === true">
					<van-cell required title="人脸数据(点击图片更换)">
						<div class="van-cell__value van-field__value">
							<div class="van-field__body">
								<div class="van-field__control van-field__control--right">
									<van-uploader v-model="fileList" preview-size="100px" :after-read="afterRead" :max-count="1" :delete="deleteFile"
									 :deletable="deletable" />
								</div>
							</div>
						</div>
					</van-cell>
				</div>
				<div style="width:70vw;margin: 15vw auto;">
					<van-button round block type="info" native-type="submit" size="small" :disabled="disabled4">
						提交审核
					</van-button>
				</div>
			</van-form>
		</div>
		<!-- 选择器 -->
		<!-- 性别 -->
		<van-popup v-model="showPicker1" position="bottom">
			<van-picker show-toolbar :columns="sexList" @confirm="sexOnChange" @cancel="showPicker1 = false" />
		</van-popup>
		<!-- 年级 -->
		<van-popup v-model="showPicker2" position="bottom">
			<van-picker show-toolbar :columns="gradeList" @cancel="showPicker2 = false" @confirm="gradeOnChange" />
		</van-popup>
		<!-- 班级 -->
		<van-popup v-model="showPicker3" position="bottom">
			<van-picker show-toolbar :columns="classList" @cancel="showPicker3 = false" @confirm="classOnChange" />
		</van-popup>
	</div>
</template>

<script>
	import * as API from "../../api.js"
	import Exif from '../../../static/js/exif.js'
	var departmentList = []; //完整的架构列表

	const REG_CODE = /^1[3-9]\d{9}$/;
	const REG_ID = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	export default {
		data() {
			return {
				// 个人基本信息
				userInfor: {
					user_openid: sessionStorage.getItem('openId'),
					user_address: ''
				},
				sexList: ['男', '女'], //性别列表
				showPicker1: false,
				// 职工信息
				worker: false, // 是否为职工开关
				disabled1: false, // 是否禁用职工开关
				workerInfor: {
					user_openid: sessionStorage.getItem('openId'),
					staff_status: 0,
					user_images1: ''
				},

				//教师信息
				swi_teacher: false, // 是否为教师
				charge: false, // 是否为班主任
				disabled2: false, // 是否禁用教师开关
				disabled3: false, // 是否禁用班主任开关
				teacherInfor: {
					teacher: '',
					user_head1: '',
					user_openid: sessionStorage.getItem('openId'),
					whether: '',
					class_id: ''
				},
				showPicker2: false, // 年级
				showPicker3: false, // 班级
				gradeList: [], // 年级列表
				classList: [], // 班级列表
				disabled4: false, // 提交审核

				register: '', // 用户未注册

				// 人脸数据
				fileList: [],
				files: {
					name: "",
					type: ""
				},
				deletable: true,
				headerImage: null //图片压缩后的地址（base64）
			}
		},
		created() {
			$('title').text('用户信息')
			// sessionStorage.setItem('openId', 'oaHn-0XiDsAX024l7mZKXJXnYczA')
			// sessionStorage.setItem('openId', 'oaHn-0Uz5B2GCTk2W4-1H3wXoItE')
			// sessionStorage.setItem('openId', 'oaHn-0aPSKuP9qmkRBFyS9Fxi_w8')
			
		},
		mounted() {
			this.getGrade();
			this.getUserInfo();
		},
		methods: {
			// 已注册用户获取信息
			getUserInfo() {
				var that = this;
				API.getUser({
					user_openid: sessionStorage.getItem('openId')
				}, function(callback) {
					if (callback.msg == 'ok') {
						console.log(callback.user)
						that.userInfor = callback.user;
						that.workerInfor = callback.user;
						that.teacherInfor = callback.user;
						that.disabled4 = true;
						// 教师
						if (callback.user.apply_teacher === 1) {
							that.swi_teacher = true;
							that.disabled1 = true;
							that.disabled2 = true;
							that.disabled3 = true;
							that.disabled4 = true;
							that.deletable = false;
							if (that.teacherInfor.whether === 1) {
								that.charge = true;
							}
							that.fileList[0] = {
								url: that.userInfor.user_head1
							}
							that.$set(that.fileList)
						}
						// 职工
						if (callback.user.apply_staff === 1) {
							that.worker = true;
							that.swi_teacher = false;
							that.deletable = false;
							that.disabled4 = true;
							that.disabled2 = true;
							that.disabled1 = true;
							that.fileList[0] = {
								url: that.userInfor.user_images1
							}
						}
					} else {
						that.register = callback.msg
					}
				})
			},
			// 提交
			onSubmit() {
				// 普通注册
				
				var that = this;
				if (!REG_ID.test(that.userInfor.user_card)) {
					this.$toast.fail('请填写有效的身份证号码');
					return '';
				}
				if (!REG_CODE.test(that.userInfor.user_iphone)) {
					this.$toast.fail('手机号码格式不正确');
					return '';
				} else {
					// 普通用户注册

					if (that.worker === false && that.swi_teacher === false) {
						if (that.userInfor.user_name && that.userInfor.user_sex && that.userInfor.user_card &&
							that.userInfor.user_iphone && that.userInfor.user_address) {
							console.log(1)
							that.postUser();
						} else {
							that.$toast.fail('请补充完整信息');
						}
					}
					// 职工
					if (that.worker === true && that.swi_teacher === false) {
						
						if (that.userInfor.user_name && that.userInfor.user_sex && that.userInfor.user_card &&
							that.userInfor.user_iphone && that.userInfor.user_address && that.workerInfor.date1 && that.workerInfor.positions &&
							that.workerInfor.user_images1) {
							console.log(2)
							
							that.postUser();
							
							that.postWorker();
						} else {
							that.$toast.fail('请补充完整信息');
						}
					}
					// 教师
					if (that.worker === false && that.swi_teacher === true) {
						
						if (that.userInfor.user_name && that.userInfor.user_sex && that.userInfor.user_card &&
							that.userInfor.user_iphone && that.userInfor.user_address && that.teacherInfor.class_grade && that.teacherInfor.class_name &&
							that.teacherInfor.work_number && that.teacherInfor.subjects && that.teacherInfor.user_head1) {
							console.log(3)
							that.postUser();
							that.postTeacher();
						} else {
							that.$toast.fail('请补充完整信息');
						}
					}

				}
			},

			// 普通用户注册
			postUser() {
				var that = this;
				API.postAddUser(JSON.stringify(that.userInfor), function(callback) {
					if (callback.msg == 'ok') {
						that.$toast.success("添加成功");
						that.getUserInfo();
						that.disabled4 = true;
						setTimeout(function() {
							that.$router.push('/personal');
						}, 2000)
					}
				})
			},

			// 职工用户注册
			postWorker() {
				var that = this;
				if (that.worker === true) {
					that.workerInfor.staff_status = 0
				} 
				API.postAddUser(JSON.stringify(that.workerInfor), function(callback) {
					if (callback.msg == 'ok') {
						that.$toast.success("添加成功");
						that.getUserInfo();
						that.disabled1 = true;
						that.disabled2 = true;
						that.disabled3 = true;
						that.disabled4 = true;
						that.deletable = false;
						setTimeout(function() {
							that.$router.push('/personal');
						}, 2000)
					}
				})
			},

			// 教师用户注册
			postTeacher() {
				var that = this;
				if (that.swi_teacher === true) {
					that.teacherInfor.teacher = 1
				} else if (that.swi_teacher === false) {
					that.teacherInfor.teacher = 0
				}
				if (that.charge === true) {
					that.teacherInfor.whether = 1
				} else if (that.charge === false) {
					that.teacherInfor.whether = 0
				}
				API.postAddUser(JSON.stringify(that.teacherInfor), function(callback) {
					if (callback.msg == 'ok') {
						that.$toast.success("添加成功");
						that.getUserInfo();
						that.disabled1 = true;
						that.disabled2 = true;
						that.disabled3 = true;
						that.disabled4 = true;
						that.deletable = false;
						setTimeout(function() {
							that.$router.push('/personal');
						}, 2000)
					}
				})
			},

			// 开关状态的改变
			switch1() {
				var self = this;
				if (self.worker === true) {
					self.swi_teacher = false;
				}
				if (self.worker === true) {
					self.disabled4 = false
				} else if (self.worker === false) {
					self.disabled4 = true
				}
			},
			switch2() {
				var self = this;
				if (self.swi_teacher === true) {
					self.worker = false;
				}
				if (self.swi_teacher === true) {
					self.disabled4 = false
				} else if (self.swi_teacher === false) {
					self.disabled4 = true
				}
			},

			// 性别选择
			sexOnChange(picker, value, index) {
				this.userInfor.user_sex = value + 1
				this.showPicker1 = false;
			},

			// 获取年级班级
			getGrade() {
				var that = this;
				API.getGrade({}, function(callback) {
					if (callback.msg === 'ok') {
						that.gradeList = callback.data;
					}
				})
			},
			getClass(get_class) {
				var that = this;
				API.getClass({
					grade: get_class
				}, function(callback) {
					if (callback.msg === 'ok') {
						that.classList = callback.data
					}
				})
			},
			// 年级选中
			gradeOnChange(value) {
				console.log(value)
				this.userInfor.class_grade = value;
				this.showPicker2 = false;
				this.getClass(value)
			},
			// 班级选中
			classOnChange(value) {
				console.log(value)
				this.userInfor.class_name = value.text;
				this.userInfor.class_id = value.class_id;
				this.showPicker3 = false;
			},

			// 人脸图片
			// 删除图片
			deleteFile(file, detail) {
				var self = this;
				if (self.worker === true) {
					this.workerInfor.user_images1 = ""
					this.fileList = []
					this.$set(this.workerInfor, this.fileList) //绑定值后不更新，重新渲染
				}
				if (self.swi_teacher === true) {
					this.teacherInfor.user_head1 = ""
					this.fileList = []
					this.$set(this.teacherInfor, this.fileList) //绑定值后不更新，重新渲染
				}
			},

			// 文件选中上传
			afterRead(file) {
				file.status = 'uploading';
				file.message = '上传中...';
				file.content = ''; //不显示上传前的默认显示的图片
				this.files.name = file.file.name; // 获取文件名
				this.files.type = file.file.type; // 获取类型
				this.imgPreview(file.file);
			},

			// 上传人脸
			postImg() {
				//这里写接口
				var self = this,
					formData = new FormData();
				var file = self.dataURLtoFile(self.headerImage);
				// file.status = 'uploading';
				// file.message = '上传中...';
				formData.append("file", file);
				formData.append("name", file.name);
				console.log(formData);
				if (self.worker === true) {
					API.fUploadFile(formData, function(callback) {
						console.log(callback)
						if (callback.sucesss) {
							self.fileList[0].status = '';
							self.fileList[0].message = '';
							self.fileList[0].url = callback.sucesss;
							self.fileList[0].content = callback.sucesss;
							self.$set(self.fileList) //绑定值后不更新，重新渲染
							console.log(self.fileList)
							self.workerInfor.user_images1 = callback.sucesss
						} else {
							self.fileList[0].status = 'failed';
							self.fileList[0].message = '上传失败';
							self.$set(self.fileList) //绑定值后不更新，重新渲染
							self.$toast.fail(callback.error);
						}
					})
				} else if (self.swi_teacher === true) {
					API.fUploadFile(formData, function(callback) {
						console.log(callback)
						if (callback.sucesss) {
							self.fileList[0].status = '';
							self.fileList[0].message = '';
							self.fileList[0].url = callback.sucesss;
							self.fileList[0].content = callback.sucesss;
							self.$set(self.fileList) //绑定值后不更新，重新渲染
							console.log(self.fileList)
							self.teacherInfor.user_head1 = callback.sucesss
						} else {
							self.fileList[0].status = 'failed';
							self.fileList[0].message = '上传失败';
							self.$set(self.fileList) //绑定值后不更新，重新渲染
							self.$toast.fail(callback.error);
						}
					})
				}
			},

			// 预览图片
			imgPreview(file) {
				var self = this;
				var Orientation;
				//去获取拍照时的信息，解决拍出来的照片旋转问题
				console.log(JSON.stringify(Exif))
				Exif.getData(file, function() {
					Orientation = Exif.getTag(this, 'Orientation');
				});
				// 看支持不支持FileReader
				if (!file || !window.FileReader) return;

				if (/^image/.test(file.type)) {
					// 创建一个reader
					var reader = new FileReader();
					// 将图片2将转成 base64 格式
					reader.readAsDataURL(file);
					// 读取成功后的回调
					reader.onloadend = function() {
						var result = this.result;
						var img = new Image();
						img.src = result;
						//判断图片是否大于100K,是就直接上传，反之压缩图片
						if (this.result.length <= (100 * 1024)) {
							self.headerImage = this.result;
							self.postImg();
						} else {
							img.onload = function() {
								var data = self.compress(img, Orientation);
								self.headerImage = data;
								self.postImg();
							}
						}
					}
				}
			},
			//将base64转换为文件
			dataURLtoFile(dataurl) {
				var arr = dataurl.split(","),
					bstr = atob(arr[1]),
					n = bstr.length,
					u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new File([u8arr], this.files.name, {
					type: this.files.type
				});
			},
			rotateImg(img, direction, canvas) {
				//最小与最大旋转方向，图片旋转4次后回到原方向
				const min_step = 0;
				const max_step = 3;
				if (img == null) return;
				//img的高度和宽度不能在img元素隐藏后获取，否则会出错
				var height = img.height;
				var width = img.width;
				var step = 2;
				if (step == null) {
					step = min_step;
				}
				if (direction == 'right') {
					step++;
					//旋转到原位置，即超过最大值
					step > max_step && (step = min_step);
				} else {
					step--;
					step < min_step && (step = max_step);
				}
				//旋转角度以弧度值为参数
				var degree = step * 90 * Math.PI / 180;
				var ctx = canvas.getContext('2d');
				switch (step) {
					case 0:
						canvas.width = width;
						canvas.height = height;
						ctx.drawImage(img, 0, 0);
						break;
					case 1:
						canvas.width = height;
						canvas.height = width;
						ctx.rotate(degree);
						ctx.drawImage(img, 0, -height);
						break;
					case 2:
						canvas.width = width;
						canvas.height = height;
						ctx.rotate(degree);
						ctx.drawImage(img, -width, -height);
						break;
					case 3:
						canvas.width = height;
						canvas.height = width;
						ctx.rotate(degree);
						ctx.drawImage(img, -width, 0);
						break;
				}
			},
			compress(img, Orientation) {
				var canvas = document.createElement("canvas");
				var ctx = canvas.getContext('2d');
				//瓦片canvas
				var tCanvas = document.createElement("canvas");
				var tctx = tCanvas.getContext("2d");
				var initSize = img.src.length;
				var width = img.width;
				var height = img.height;
				//如果图片大于四百万像素，计算压缩比并将大小压至400万以下
				var ratio;
				if ((ratio = width * height / 4000000) > 1) {
					console.log("大于400万像素")
					ratio = Math.sqrt(ratio);
					width /= ratio;
					height /= ratio;
				} else {
					ratio = 1;
				}
				canvas.width = width;
				canvas.height = height;
				//  铺底色
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				//如果图片像素大于100万则使用瓦片绘制
				var count;
				if ((count = width * height / 1000000) > 1) {
					console.log("超过100W像素");
					count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
					//   计算每块瓦片的宽和高
					var nw = ~~(width / count);
					var nh = ~~(height / count);
					tCanvas.width = nw;
					tCanvas.height = nh;
					for (var i = 0; i < count; i++) {
						for (var j = 0; j < count; j++) {
							tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
							ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
						}
					}
				} else {
					ctx.drawImage(img, 0, 0, width, height);
				}
				//修复ios上传图片的时候 被旋转的问题
				if (Orientation != "" && Orientation != 1) {
					switch (Orientation) {
						case 6: //需要顺时针（向左）90度旋转
							this.rotateImg(img, 'left', canvas);
							break;
						case 8: //需要逆时针（向右）90度旋转
							this.rotateImg(img, 'right', canvas);
							break;
						case 3: //需要180度旋转
							this.rotateImg(img, 'right', canvas); //转两次
							this.rotateImg(img, 'right', canvas);
							break;
					}
				}
				//进行最小压缩
				var ndata = canvas.toDataURL('image/jpeg', 0.1);
				console.log('压缩前：' + initSize);
				console.log('压缩后：' + ndata.length);
				console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
				tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
				return ndata;
			}
		}
	}
</script>

<style>

</style>
