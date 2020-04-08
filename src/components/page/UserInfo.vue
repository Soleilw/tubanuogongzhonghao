<template>
	<div>
		<!-- <van-nav-bar title="用户信息" fixed/> -->
		<div class="content">
			<van-form @submit="onSubmit">
				<div class="van-cell van-cell--required van-field" v-if="!userInfor.user_image">
					<!-- van-cell--required ：小红点 -->
					<div class="van-cell__title van-field__label">
						<span>头像</span>
					</div>
					<div class="van-cell__value van-field__value">
						<!-- van-field__control--right ：右对齐 -->
						<div class="van-field__body">
							<div class="van-field__control van-field__control--right">
								<img style="width: 30vw; height: 24vw;" :src="userInfor.user_image" alt="">
							</div>
						</div>
					</div>
				</div>
				<div class="van-cell van-cell--required van-field" v-else>
					<!-- van-cell--required ：小红点 -->
					<div class="van-cell__title van-field__label">
						<span>头像</span>
					</div>
					<div class="van-cell__value van-field__value">
						<!-- van-field__control--right ：右对齐 -->
						<div class="van-field__body">
							<div class="van-field__control van-field__control--right">
								<img style="width: 30vw; height: 24vw;" :src="userInfor.user_image" alt="">
							</div>
						</div>
					</div>
				</div>

				<van-field v-model="userInfor.user_name" type="text" label="姓名" placeholder="请填写姓名" input-align="right" required
				 :readonly="accountInfor.ifStatus == 0" />

				<van-field readonly clickable :value="sexList[userInfor.user_sex - 1]" label="性别" placeholder="点击选择" input-align="right"
				 @click="showPicker4 = true" required />

				<van-field v-model="userInfor.user_card" type="text" label="证件号" placeholder="请填写身份证号/护照号" input-align="right"
				 required :readonly="accountInfor.ifStatus == 0" />

				<van-field v-model="userInfor.user_iphone" type="tel" label="手机号" placeholder="请填写手机号" input-align="right" required
				 :readonly="accountInfor.ifStatus == 0" />

				<van-field v-model="userInfor.user_address" type="textarea" label="地址" placeholder="请填写地址" input-align="right"
				 autosize show-word-limit maxlength="50" required :readonly="accountInfor.ifStatus == 0" />

				<!-- 是否本校职工 -->
				<van-cell center title="是否本校职工" required>
					<van-switch v-model="worker" size="20" @click="switch1" />
				</van-cell>
				<div v-if="worker">
					<van-field v-model="userInfor.date1" type="text" label="部门" placeholder="请填写部门" input-align="right" required
					 :readonly="accountInfor.ifStatus == 0" />
					<van-field v-model="userInfor.positions" type="text" label="职位" placeholder="请填写职位" input-align="right" required
					 :readonly="accountInfor.ifStatus == 0" />
					<van-cell required title="人脸数据(点击图片更换)">
						<div class="van-cell__value van-field__value">
							<div class="van-field__body">
								<div class="van-field__control van-field__control--right">
									<van-uploader v-model="fileList" preview-size="100px" :after-read="afterRead" :max-count="1" :delete="deleteFile"
									 :deletable="!disabled" />
								</div>
							</div>
						</div>
					</van-cell>
				</div>

				<!-- 是否本校教师 -->
				<van-cell center title="是否本校教师" required>
					<van-switch v-model="switchteacher" size="20" @click="switch2" />
				</van-cell>
				<div v-if="switchteacher">
					<van-cell center title="是否是班主任" required>
						<van-switch v-model="userInfor.whether" size="20" />
					</van-cell>

					<van-field v-model="userInfor.work_number" type="text" label="工号" placeholder="请填写工号" input-align="right" required
					 :readonly="accountInfor.ifStatus == 0" />

					<!-- 年级 -->
					<van-field readonly clickable label="年级班级" :value="userInfor.class_grade" placeholder="请选择年级班级" input-align="right"
					 @click="showPicker6 = true" required />

					<!-- 班级 -->
					<van-field readonly clickable label="班级" :value="userInfor.class_name"  placeholder="请选择班级" input-align="right"
					 @click="showPicker7 = true" required />
	

					<van-field v-model="userInfor.subjects" type="text" label="学科" placeholder="请填写学科" input-align="right" required
					 :readonly="accountInfor.ifStatus == 0" />

					<van-cell required title="人脸数据(点击图片更换)">
						<div class="van-cell__value van-field__value">
							<div class="van-field__body">
								<div class="van-field__control van-field__control--right">
									<van-uploader v-model="fileList" preview-size="150px" :after-read="afterRead" :max-count="1" :delete="deleteFile"
									 :deletable="!disabled" />
								</div>
							</div>
						</div>
					</van-cell>
				</div>

				<div style="width:70vw;margin: 15vw auto;">
					<van-button round block type="info" native-type="submit" size="small">
						提交审核
					</van-button>
				</div>
			</van-form>
		</div>
		<van-popup v-model="showPicker6" position="bottom">
			<van-picker show-toolbar :columns="gradeList" @cancel="showPicker6 = false" @confirm="gradeOnChange" />
		</van-popup>
		<van-popup v-model="showPicker7" position="bottom">
			<van-picker show-toolbar :columns="classList" @cancel="showPicker7 = false" @confirm="classOnChange" />
		</van-popup>


		<!-- 性别选择器 -->
		<van-popup v-model="showPicker4" position="bottom">
			<van-picker show-toolbar :columns="sexList" @confirm="sexOnChange" @cancel="showPicker4 = false" />
		</van-popup>
	</div>
</template>

<script>
	import * as API from "../../api.js"
	import Exif from '../../../static/js/exif.js'
	let departmentList = []; //完整的架构列表


	const REG_CODE = /^1[3-9]\d{9}$/;
	const REG_ID = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	export default {
		data() {
			return {
				userInfor: {
					user_sex: 1 ? '男' : '女',
					user_address: '',
					user_card: '',
					user_iphone: '',
					class_id: '',
					whether: false,
					user_head1: '', //	教师头像
					user_images1: '',
					user_image: '',
					user_openid: sessionStorage.getItem('openId'),
					staff_status: 0,
					teacher: 0
				},
				status: '',
				switchteacher: false,
				worker: false,
				accountInfor: {
					comId: 0
				},
				showPicker4: false,
				showPicker6: false,
				showPicker7: false,
				fileList: [], //头像文件列表
				sexList: ['男', '女'], //性别列表
				gradeList: [],
				classList: [], //	年级列表
				disabled: false,
				list: [],
				files: {
					name: "",
					type: ""
				},
				headerImage: null //图片压缩后的地址（base64）
			}
		},
		created() {
			$('title').text('用户信息')
			// this.userInfor = API.data.userInfor.user;
			
			
		},
		mounted() {
			this.getGrade();
			this.getUser();
		},
		watch: {
			// worker: function (worker) {
			// 	if(this.worker === false) {
			// 		this.deleteFile()
			// 	}
			// 	if(this.switchteacher === false) {
			// 		this.deleteFile()
			// 	}
			// }
		},
		methods: {
			// 页面返回
			onClickLeft() {
				this.$router.go(-1)
			},
			switch1() {
				let that = this;
				console.log('worker' + that.worker)
				console.log('that.switchteacher' + that.switchteacher)
				if (that.worker == false) {
					that.switchteacher = false;
				}
			},
			switch2() {
				let that = this;
				console.log('that.switchteacher' + that.switchteacher)
				if (that.switchteacher == false) {
					that.worker = false;
					that.userInfor.whether = false;
				} 
			},
			// 性别选中
			sexOnChange(picker, value, index) {
				console.log(value)
				this.userInfor.user_sex = value + 1
				this.showPicker4 = false;
			},
			// 出生日期选中
			brithDateOnChange(time) {
				this.userInfor.brithDate = this.dateFormat(time);
				this.showPicker5 = false;
			},
			// 年级选中
			gradeOnChange(value) {
				console.log(value)
				this.userInfor.class_grade = value;
				this.showPicker6 = false;
				this.getClass(value)
			},
			// 班级选中
			classOnChange(value) {
				console.log(value)
				this.userInfor.class_name = value.text;
				this.userInfor.class_id = value.class_id;
				this.showPicker7 = false;
			},
			// 删除图片
			deleteFile(file, detail) {
				this.userInfor.user_images1 = ""
				this.userInfor.user_head1 = ""
				this.userInfor = JSON.parse(JSON.stringify(this.userInfor))
				this.fileList = []
				this.$set(this.userInfor, this.fileList) //绑定值后不更新，重新渲染
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
			// 获取班级列表
			getGrade() {
				let that = this;
				API.getGrade({}, function(callback) {
					console.log(callback.data)
					if (callback.msg === 'ok') {	
						that.gradeList = callback.data;
				} })
			},
			getClass(get_class) {
				let that = this;
				API.getClass({grade:get_class}, function(callback) {
					if(callback.msg === 'ok') {
						that.classList = callback.data
						console.log(that.classList)
					}
				})
			},
			getUser() {
				let that = this;
				 
				API.getUser({
					user_openid: sessionStorage.getItem('openId')
				}, function(callback) {
					 
					if (callback.msg == 'ok') {
						 
						sessionStorage.setItem("userInfor", JSON.stringify(callback));
						API.data.userInfor = callback;
						that.userInfor = API.data.userInfor.user;
						that.status = that.userInfor.status
						 ;
						if (that.userInfor.teacher === 0 && that.userInfor.staff_status === 0) {
							 
							that.worker = true;
							if(that.worker === true) {
								 
								console.log(that.userInfor.user_images1)
								that.fileList[0] = {
									url: that.userInfor.user_images1
								}
								that.$set(that.fileList)
							} 
						}
						if (that.userInfor.teacher === 1) {
							 
							that.switchteacher = true;
							that.worker = false;
							if (that.userInfor.whether === 1) {
								that.userInfor.whether = true;
							}
							if(that.switchteacher === true) {
								that.fileList[0] = {
									url: that.userInfor.user_head1
								}
								that.$set(that.fileList)
							}
						}
						
						
						
						
						
					}
				})
			},
			// 注册
			postUser() {
				let that = this;
				if(that.switchteacher === true) {
					that.userInfor.teacher = 1
				}
				if(that.userInfor.whether === true) {
					that.userInfor.whether = 1
				}
				API.postAddUser(JSON.stringify(that.userInfor), function(callback) {
					if (callback.msg == 'ok') {
						that.$toast.success("添加成功");
						that.getUser();
					}
				})
			},
			postWorker() {
				let that = this;
				if(that.worker === true) {
					that.userInfor.staff_status = 0
				}
				API.postAddUser(JSON.stringify(that.userInfor), function(callback) {
					if (callback.msg == 'ok') {
						that.$toast.success("添加成功");
						that.worker = true;
						that.getUser();
					}
				})
			},
			postTeacher() {
				let that = this;
				
				API.postAddTeacher(JSON.stringify(that.userInfor), function(callback) {
					if (callback.msg == 'ok') {
						that.$toast.success("添加成功");
						that.getUser();
					}
				})
			},

			// 修改
			putUser() {
				let that = this;
				// that.userInfor.user_openid = sessionStorage.getItem('openId');
				API.putUser(JSON.stringify(that.userInfor), function(callback) {
					console.log(123456)
					if (callback.msg == 'ok') {
						that.$toast.success("修改成功");
						console.log(123456)
						that.getUser();
					}
				})
			},
			putWorker() {
				let that = this;
				API.putUser(JSON.stringify(that.userInfor), function(callback) {
					if (callback.msg == 'ok') {
						that.$toast.success("修改成功");
						that.worker = true;
						that.getUser();
					}
				})
			},
			putTeacher() {
				let that = this;
				API.putUser(JSON.stringify(that.userInfor), function(callback) {
					if (callback.msg == 'ok') {
						that.$toast.success("修改成功");
						that.getUser();
					}
				})
			},

			// 提交
			onSubmit() {
				let that = this;
				 ;
				// 注册
				if (!that.userInfor.creat_time) {
					 
					if (!REG_ID.test(that.userInfor.user_card)) {
						this.$toast.fail('请填写有效的身份证号码');
						return '';
					}
					if (!REG_CODE.test(that.userInfor.user_iphone)) {
						this.$toast.fail('手机号码格式不正确');
						return '';
					} else {
						if (that.userInfor.user_name && that.userInfor.user_sex && that.userInfor.user_card &&
							that.userInfor.user_iphone && that.userInfor.user_address) {
							console.log(1)
							that.postUser();
							
						} else {
							that.$toast.fail('111请补充完整信息');
						}
					}

				}else{
					if (that.userInfor) {
							 
						// 普通用户修改
						if (!REG_ID.test(that.userInfor.user_card)) {
							this.$toast.fail('请填写有效的身份证号码');
							return '';
						}
						if (!REG_CODE.test(that.userInfor.user_iphone)) {
							this.$toast.fail('手机号码格式不正确');
							return '';
						} else {
							 
							// 职工修改
							if (!that.userInfor.staff_status && that.userInfor.teacher ===
								0) {
									 
								if (that.userInfor.date1 && that.userInfor.positions) {
									that.postWorker()
									console.log(4)
								}
							}
							// if (that.userInfor.teacher === 0 && !that.userInfor.staff_status) {
							// 	if (that.userInfor.user_name && that.userInfor.user_sex && that.userInfor.user_card &&
							// 		that.userInfor.user_iphone && that.userInfor.user_address) {
							// 			 
							// 			that.postUser()
							// 	} else {
							// 		that.$toast.fail('33请补充完整信息');
							// 	}
							// }
							
						
												
							// 教师修改
							if (!that.worker && that.switchteacher && !that.userInfor.staff_status && that.userInfor.teacher ===
								1) {
								 
								if (that.userInfor.whether === true) {
									that.userInfor.whether = 1
								} else {
									that.userInfor.whether = 0
								}
								if (that.userInfor.class_grade && that.userInfor.class_name &&
									that.userInfor.work_number &&
									that.userInfor.subjects) {
									console.log(5)
									that.putUser();
									that.putTeacher();
								} else {
									that.$toast.fail('33请补充完整信息');
								}
							}
					
						}
						
					
						// 职工更改为教师
						// if (that.worker && !that.switchteacher && !that.userInfor.staff_status && that.userInfor.teacher ===
						// 	1) {
						// 	 ;
						// 	if (that.userInfor.date1 && that.userInfor.positions) {
						// 		that.postWorker();
						// 	} else {
						// 		that.$toast.fail('33请补充完整信息');
						// 	}
						// }
					}
				}
				// 	if (that.worker && !that.switchteacher && !that.userInfor.staff_status && that.userInfor.teacher === 0) {
				// 	// 职工注册
				// 	if (that.userInfor.date1 && that.userInfor.positions) {
				// 		that.postWorker();
				// 		console.log(2)
				// 	}
				// }

				// if (!that.worker && that.switchteacher && that.userInfor.teacher === 0) {
				// 	if (that.userInfor.class_grade && that.userInfor.class_name && that.userInfor
				// 		.work_number &&
				// 		that.userInfor.subjects) {
				// 		that.postTeacher();
				// 		console.log(3)
				// 	} else {
				// 		that.$toast.fail('33请补充完整信息');
				// 	}
				// }

				// 修改
				

			},
			// 格式化日期时间
			dateFormat(dateText) {
				let time = new Date(dateText);
				let year = time.getFullYear();
				let month = time.getMonth() + 1;
				let date = time.getDate();
				let hours = time.getHours();
				let minutes = time.getMinutes();
				let seconds = time.getSeconds();
				// return (year + "-" + month + "-" + date + ' ' + hours + ":" + minutes + ":" + seconds); //例：2018-2-5 12：00：00
				return (year + "-" + (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date)); //例：2018-12-5 12：00：00
			},
			// 上传头像
			postImg() {
				//这里写接口
				let that = this,
					formData = new FormData();
				let file = this.dataURLtoFile(this.headerImage);
				// file.status = 'uploading';
				// file.message = '上传中...';
				formData.append("file", file);
				formData.append("name", file.name);
				console.log(formData);
				if (that.worker === true) {
					API.fUploadFile(formData, function(callback) {
						console.log(callback)
						if (callback.sucesss) {
							that.fileList[0].status = '';
							that.fileList[0].message = '';
							that.fileList[0].url = callback.sucesss;
							that.fileList[0].content = callback.sucesss;
							that.$set(that.fileList) //绑定值后不更新，重新渲染
							console.log(that.fileList)
								that.userInfor.user_images1 = callback.sucesss
						} else {
							that.fileList[0].status = 'failed';
							that.fileList[0].message = '上传失败';
							that.$set(that.fileList) //绑定值后不更新，重新渲染
							that.$toast.fail(callback.error);
						}
					})
				} else if(that.switchteacher === true) {
					API.fUploadFile(formData, function(callback) {
						console.log(callback)
						if (callback.sucesss) {
							that.fileList[0].status = '';
							that.fileList[0].message = '';
							that.fileList[0].url = callback.sucesss;
							that.fileList[0].content = callback.sucesss;
							that.$set(that.fileList) //绑定值后不更新，重新渲染
							console.log(that.fileList)
								that.userInfor.user_head1 = callback.sucesss
						} else {
							that.fileList[0].status = 'failed';
							that.fileList[0].message = '上传失败';
							that.$set(that.fileList) //绑定值后不更新，重新渲染
							that.$toast.fail(callback.error);
						}
					})
				}
			
			},

			imgPreview(file) {
				let self = this;
				let Orientation;
				//去获取拍照时的信息，解决拍出来的照片旋转问题
				console.log(JSON.stringify(Exif))
				Exif.getData(file, function() {
					Orientation = Exif.getTag(this, 'Orientation');
				});
				// 看支持不支持FileReader
				if (!file || !window.FileReader) return;

				if (/^image/.test(file.type)) {
					// 创建一个reader
					let reader = new FileReader();
					// 将图片2将转成 base64 格式
					reader.readAsDataURL(file);
					// 读取成功后的回调
					reader.onloadend = function() {
						let result = this.result;
						let img = new Image();
						img.src = result;
						//判断图片是否大于100K,是就直接上传，反之压缩图片
						if (this.result.length <= (100 * 1024)) {
							self.headerImage = this.result;
							self.postImg();
						} else {
							img.onload = function() {
								let data = self.compress(img, Orientation);
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
				let height = img.height;
				let width = img.width;
				let step = 2;
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
				let degree = step * 90 * Math.PI / 180;
				let ctx = canvas.getContext('2d');
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
				let canvas = document.createElement("canvas");
				let ctx = canvas.getContext('2d');
				//瓦片canvas
				let tCanvas = document.createElement("canvas");
				let tctx = tCanvas.getContext("2d");
				let initSize = img.src.length;
				let width = img.width;
				let height = img.height;
				//如果图片大于四百万像素，计算压缩比并将大小压至400万以下
				let ratio;
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
				let count;
				if ((count = width * height / 1000000) > 1) {
					console.log("超过100W像素");
					count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
					//   计算每块瓦片的宽和高
					let nw = ~~(width / count);
					let nh = ~~(height / count);
					tCanvas.width = nw;
					tCanvas.height = nh;
					for (let i = 0; i < count; i++) {
						for (let j = 0; j < count; j++) {
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
				let ndata = canvas.toDataURL('image/jpeg', 0.1);
				console.log('压缩前：' + initSize);
				console.log('压缩后：' + ndata.length);
				console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
				tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
				return ndata;
			},
		}
	}
</script>

<style scoped>
	.content {
		/*margin:46px 0 0 0;*/
	}
</style>
