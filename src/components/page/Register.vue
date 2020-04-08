<template>
    <div>
        <!-- <van-nav-bar title="用户注册" fixed/> -->
        <div class="content">
            <van-form @submit="onSubmit">

                <div class="van-cell van-cell--required van-field">
                    <div class="van-cell__title van-field__label">
                        <span>头像</span>
                    </div>
                    <div class="van-cell__value van-field__value">
                        <div class="van-field__body">
                            <div class="van-field__control van-field__control--right">
                                <van-uploader v-model="fileList" preview-size="100px" :after-read="afterRead"
                                    :max-count="1" :delete="deleteFile" :deletable="!disabled" />
                            </div>
                        </div>
                    </div>
                </div>

                <van-field v-model="userInfor.user_name" type="text" label="名称" placeholder="请填写名称" input-align="right"
                    required />

                <van-field readonly clickable :value="sexList[userInfor.user_sex - 1]" label="性别" placeholder="点击选择"
                    input-align="right" @click="showPicker4 = true" required />


                <van-field v-model="userInfor.user_card" type="text" label="证件号" placeholder="请填写身份证号/护照号等" input-align="right"
                    required />

                <van-field v-model="userInfor.user_iphone" type="tel" label="手机号" placeholder="请填写手机号" input-align="right"
                    required />
                <div style="width:70vw;margin: 15vw auto;">
                    <van-button round block type="info" native-type="submit" size="small">
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>

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
    export default {
        data() {
            return {
                userInfor: {
                    user_sex: 1,
                    user_image: ''
                },
                showPicker4: false,
                fileList: [], //头像文件列表
                sexList: ['男', '女'], //性别列表
                disabled: false,

                files: {
                    name: "",
                    type: ""
                },
                headerImage: null //图片压缩后的地址（base64）
            }
        },
        created() {
            $('title').text('用户注册')
            this.userInfor.user_openid = sessionStorage.getItem('openId')
            console.log(this.userInfor.user_openid)
        },
        methods: {
            // 页面返回
            onClickLeft() {
                this.$router.go(-1)
            },

            // 性别选中
            sexOnChange(picker, value, index) {
                console.log(value)
                this.userInfor.user_sex = value + 1
                this.showPicker4 = false;
            },
            // 删除图片
            deleteFile(file, detail) {
                this.userInfor.user_image = ""
                // this.userInfor = JSON.parse(JSON.stringify(this.userInfor))
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

            // 提交
            onSubmit() {
                let that = this;
                if (that.userInfor.user_name && that.userInfor.user_sex && that.userInfor.user_card && that.userInfor.user_iphone) {
                    API.postUser(JSON.stringify(that.userInfor), function(callback) {
                        if (callback.sucesss) {
                            console.log('修改用户信息成功')
                            API.getUser({
                                user_openid: sessionStorage.getItem('openId')
                            }, function(callback) {
                                console.log('用户信息')
                                console.log(callback.result)
                                if (callback.result) { //已注册
                                    sessionStorage.setItem("userInfo", JSON.stringify(callback.result));
                                    API.data.userInfo = callback.result
                                    that.$toast.success("注册成功");
                                    setTimeout(function() {
                                        that.$router.push("/personal"); //前往个人中心
                                    }, 1500)
                                }
                            })
                        } else {
                            that.$toast.fail(callback.error);
                        }
                    })
                } else {
                    that.$toast.fail('请补充完整信息');
                }


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
            // // 循环树结构
            // setChildren(obj){
            //    for(var i in obj){
            //        if(obj[i].children.length == 0){
            //         obj[i].children = null
            //        }else{
            //            this.setChildren(obj[i].children)
            //        }
            //    }
            // },
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
                API.uploadFile(formData, function(callback) {
                    console.log(callback)
                    if (callback.code == 200) {
                        that.fileList[0].status = '';
                        that.fileList[0].message = '';
                        that.fileList[0].url = callback.data;
                        that.fileList[0].content = callback.data;
                        that.$set(that.fileList) //绑定值后不更新，重新渲染
                        that.userInfor.user_image = callback.data
                    } else {
                        that.fileList[0].status = 'failed';
                        that.fileList[0].message = '上传失败';
                        that.$set(that.fileList) //绑定值后不更新，重新渲染
                        that.$toast.fail(callback.msg);
                    }
                })
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
