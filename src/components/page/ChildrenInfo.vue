<template>
	<div>
		<!-- <van-nav-bar title="用户信息" fixed/> -->
		<div class="content">
			<van-form @submit="onSubmit">

				<div class="van-cell van-cell--required van-field">
					<!-- van-cell--required ：小红点 -->
					<div class="van-cell__title van-field__label">
						<span>头像</span>
					</div>
					<div class="van-cell__value van-field__value">
						<!-- van-field__control--right ：右对齐 -->
						<div class="van-field__body">
							<div class="van-field__control van-field__control--right">

								<van-uploader v-model="fileList1" preview-size="100px" :after-read="afterRead1" :max-count="1" :delete="deleteFile1"
								 :deletable="deletable" />
							</div>
						</div>
					</div>
				</div>
				<!-- <van-field name="uploader" label="头像" input-align="right" readonly required>
		    <template #input>
		        <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1" :delete="deleteFile" />
		    </template>
		  </van-field> -->

				<van-field v-model="studentInfor.stu_number" type="text" label="学号" placeholder="请填写学号" input-align="right"
				 required />

				<van-field v-model="studentInfor.stu_name" type="text" label="名称" placeholder="请填写名称" input-align="right" required />


				<van-field readonly clickable :value="sexList[studentInfor.stu_sex - 1]" label="性别" placeholder="点击选择" input-align="right"
				 @click="showPicker4 = true" required />

				<van-field v-model="studentInfor.stu_age" type="text" label="年龄" placeholder="请填写年龄" input-align="right" required />

				<van-field v-model="studentInfor.class" type="text" label="班级" placeholder="请填写班级" input-align="right" required />

				<van-field v-model="studentInfor.relation" type="textarea" label="备注" placeholder="请填写备注" input-align="right"
				 required />

				<van-cell required title="学生照片">
					<div class="van-cell__value van-field__value">
						<div class="van-field__body">
							<div class="van-field__control van-field__control--right">
								<!-- <van-image v-if="form.visitor_head1" fit="cover" width="100" height="100" lazy-load :src="form.visitor_head1"/> -->
								<van-uploader v-model="fileList2" preview-size="100px" :after-read="afterRead2" :max-count="1" :delete="deleteFile2"
								 :deletable="deletable" />
							</div>
						</div>
					</div>
				</van-cell>
				<div style="width:70vw;margin: 15vw auto;">
					<van-button round block type="info" native-type="submit" size="small" :disabled="disabled">
						提交
					</van-button>
				</div>
			</van-form>
		</div>

		<!-- 性别选择器 -->
		<van-popup v-model="showPicker4" position="bottom">
			<van-picker show-toolbar :columns="sexList" @confirm="sexOnChange" @cancel="showPicker4 = false" />
		</van-popup>




		<!-- 
		<van-uploader v-model="fileList1" preview-size="100px" :after-read="afterRead1" :max-count="1" :delete="deleteFile1"
		 :deletable="deletable" />
		<van-uploader v-model="fileList2" preview-size="100px" :after-read="afterRead2" :max-count="1" :delete="deleteFile2"
		 :deletable="deletable" /> -->
	</div>
</template>

<script>
	import * as API from "../../api.js"
	import Exif from '../../../static/js/exif.js'
	let departmentList = []; //完整的架构列表
	export default {
		data() {
			return {
				studentInfor: {
					stu_sex: 1 ? '男' : '女',
					user_openid: sessionStorage.getItem('openId'),
					stu_image: '',
					stu_head: ''
				},
				sexList: ['男', '女'], //性别列表
				showPicker4: false,
				disabled: false,
				stu_number: '',
				fileList1: [], // 孩子头像
				files1: {
					name: "",
					type: ""
				},
				fileList2: [], // 孩子头像
				files2: {
					name: "",
					type: ""
				},
				deletable: true,
				headerImage: null //图片压缩后的地址（base64）
			}
		},
		created() {
			$('title').text('我的孩子')
			this.stu_number = API.getUrlParam("stu_number"); //获取url参数
			this.$set(this.fileList1)
			this.$set(this.fileList2)
		},
		mounted() {
			this.GetUserInfo();
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			// 性别选中
			sexOnChange(picker, value, index) {
				console.log(value)
				this.studentInfor.stu_sex = value + 1
				this.showPicker4 = false;
			},
			// 提交
			onSubmit() {
				let that = this;
				console.log(that.studentInfor.stu_head)
				if (that.studentInfor.stu_head) {
					let stu_info = {
						user_openid: sessionStorage.getItem('openId'),
						stu_number: that.studentInfor.stu_number,
						stu_image: that.studentInfor.stu_image,
						stu_head: that.studentInfor.stu_head,
						relation: that.studentInfor.relation
					}
					API.saveStudent(JSON.stringify(stu_info), function(callback) {
						if (callback.msg == 'ok') {
							console.log('修改用户信息成功')
							that.$toast.success("修改成功");
							that.GetUserInfo(); //重新获取用户信息
							that.disabled = false;
							setTimeout(function() {
								that.$router.push('/childrenList');
							}, 2000)
						} else {
							console.log(66666)
							that.$toast.fail(callback.msg);
						}
					})
				} else {
					that.$toast.fail('请补充完整信息');
				}
			},

			// 获取单个孩子信息
			GetUserInfo: function() {
				let that = this
				API.getOneChild({
					stu_number: that.stu_number
				}, function(callback) {
					console.log('用户信息')
					console.log(callback.data)
					if (callback.data) { //已注册
						// sessionStorage.setItem("studentInfor", JSON.stringify(callback.data));
						that.studentInfor = callback.data;
						// that.deletable = false;
						// that.disabled = true
						that.fileList1[0] = {
							url: that.studentInfor.stu_head
						}
						that.fileList2[0] = {
							url: that.studentInfor.stu_image
						}


					}
				})
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

			// 人脸图片
			// 删除图片
			deleteFile1(file, detail) {
				var self = this;
				this.studentInfor.stu_image = ""
				this.fileList1 = []
				this.$set(this.studentInfor, this.fileList1) //绑定值后不更新，重新渲染
			},
			deleteFile2(file, detail) {
				var self = this;
				this.studentInfor.stu_head = ""
				this.fileList2 = []
				this.$set(this.studentInfor, this.fileList2) //绑定值后不更新，重新渲染
			},

			// 文件选中上传
			afterRead1(file) {
				file.status = 'uploading';
				file.message = '上传中...';
				file.content = ''; //不显示上传前的默认显示的图片
				this.files1.name = file.file.name; // 获取文件名
				this.files1.type = file.file.type; // 获取类型
				this.imgPreview1(file.file);
			},
			afterRead2(file) {
				file.status = 'uploading';
				file.message = '上传中...';
				file.content = ''; //不显示上传前的默认显示的图片
				this.files2.name = file.file.name; // 获取文件名
				this.files2.type = file.file.type; // 获取类型
				this.imgPreview2(file.file);
			},

			// 上传人脸
			postImg1() {
				//这里写接口
				var self = this,
					formData = new FormData();
				var file = self.dataURLtoFile1(self.headerImage);
				// file.status = 'uploading';
				// file.message = '上传中...';
				formData.append("file", file);
				formData.append("name", file.name);
				console.log(formData);

				API.fUploadFile(formData, function(callback) {
					console.log(callback)
					if (callback.sucesss) {
						self.fileList1[0].status = '';
						self.fileList1[0].message = '';
						self.fileList1[0].url = callback.sucesss;
						self.fileList1[0].content = callback.sucesss;
						self.$set(self.fileList1) //绑定值后不更新，重新渲染
						console.log(self.fileList1)
						self.studentInfor.stu_head = callback.sucesss
					} else {
						self.fileList1[0].status = 'failed';
						self.fileList1[0].message = '上传失败';
						self.$set(self.fileList1) //绑定值后不更新，重新渲染
						self.$toast.fail(callback.error);
					}
				})
			},
			// 上传人脸
			postImg2() {
				//这里写接口
				var self = this,
					formData = new FormData();
				var file = self.dataURLtoFile2(self.headerImage);
				// file.status = 'uploading';
				// file.message = '上传中...';
				formData.append("file", file);
				formData.append("name", file.name);
				console.log(formData);

				API.fUploadFile(formData, function(callback) {
					console.log(callback)
					if (callback.sucesss) {
						self.fileList2[0].status = '';
						self.fileList2[0].message = '';
						self.fileList2[0].url = callback.sucesss;
						self.fileList2[0].content = callback.sucesss;
						self.$set(self.fileList2) //绑定值后不更新，重新渲染
						console.log(self.fileList2)
						self.studentInfor.stu_image = callback.sucesss
					} else {
						self.fileList2[0].status = 'failed';
						self.fileList2[0].message = '上传失败';
						self.$set(self.fileList2) //绑定值后不更新，重新渲染
						self.$toast.fail(callback.error);
					}
				})
			},
			// 预览图片
			imgPreview1(file) {
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
							self.postImg1();
						} else {
							img.onload = function() {
								var data = self.compress1(img, Orientation);
								self.headerImage = data;
								self.postImg1();
							}
						}
					}
				}
			},
			// 预览图片
			imgPreview2(file) {
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
							self.postImg2();
						} else {
							img.onload = function() {
								var data = self.compress2(img, Orientation);
								self.headerImage = data;
								self.postImg2();
							}
						}
					}
				}
			},

			//将base64转换为文件
			dataURLtoFile1(dataurl) {
				var arr = dataurl.split(","),
					bstr = atob(arr[1]),
					n = bstr.length,
					u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new File([u8arr], this.files1.name, {
					type: this.files1.type
				});
			},
			//将base64转换为文件
			dataURLtoFile2(dataurl) {
				var arr = dataurl.split(","),
					bstr = atob(arr[1]),
					n = bstr.length,
					u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new File([u8arr], this.files2.name, {
					type: this.files2.type
				});
			},
			rotateImg1(img, direction, canvas) {
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
			compress1(img, Orientation) {
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
							this.rotateImg1(img, 'left', canvas);
							break;
						case 8: //需要逆时针（向右）90度旋转
							this.rotateImg1(img, 'right', canvas);
							break;
						case 3: //需要180度旋转
							this.rotateImg1(img, 'right', canvas); //转两次
							this.rotateImg1(img, 'right', canvas);
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
			},
			rotateImg2(img, direction, canvas) {
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
			compress2(img, Orientation) {
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
							this.rotateImg1(img, 'left', canvas);
							break;
						case 8: //需要逆时针（向右）90度旋转
							this.rotateImg1(img, 'right', canvas);
							break;
						case 3: //需要180度旋转
							this.rotateImg1(img, 'right', canvas); //转两次
							this.rotateImg1(img, 'right', canvas);
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

<style scoped>
	.content {
		/*margin:46px 0 0 0;*/
	}

	/*   .avatar {
        max-width: 100%;
        height: 20vw;
    } */
</style>
