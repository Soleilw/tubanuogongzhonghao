<template>
    <div>
        <!-- <van-nav-bar title="个人中心" fixed /> -->
        <div class="content">
            <div class='headbox'>
                <div class='redbox'>
                    <img :src="userInfor.user_image" class='headimg' />
                    <span class="nickname">{{userInfor.user_alias}}</span>
                </div>
            </div>

            <div>
                <van-cell title="个人信息" icon="contact" to="userInfo" is-link />
                <van-cell title="我的孩子" icon="records" to="childrenList" is-link />
				<div v-if="userInfor.apply_whether === 1">
				    <van-cell title="班级管理" icon="friends-o" to="studentAudit" is-link />
				</div>
                <!-- <van-cell title="邀请访客" icon="sign" @click="invite" is-link /> -->
            </div>
        </div>
    </div>
</template>

<script>
    import * as API from "../../api.js"
    export default {
        data() {
            return {
                userInfor: {} ,//用户信息
				whether: false
            }
        },
        created() {
            $('title').text('个人中心')
            // let code = API.getUrlParam("code"); //获取url参数
            // this.userInfor = API.data.userInfor.user; //用户信息
			
        },
        mounted() {
            this.getPersonal();
        },

        methods: {
            // 获取个人信息
            getPersonal() {
                let that = this;
                // sessionStorage.getItem('openId')
                API.getUser({
                    user_openid: sessionStorage.getItem('openId')
                }, function(callback) {
                    if (callback.msg == 'ok') {
                       that.userInfor = callback.user;
                    }
                })
            },

        }
    }
</script>

<style scoped>
    .content {
        /*margin:46px 0 0 0;*/
    }

    /* 头部个人信息 */

    .headbox {
        width: 100vw;
        padding: 2vw 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .redbox {
        position: relative;
        width: 95vw;
        height: 35vw;
        background: #1989fa;
        border-radius: 1.6vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .headimg {
        width: 16vw;
        height: 16vw;
        border-radius: 50%;
        background-color: #fff;
    }

    .nickname {
        max-width: 38vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
        font-size: 3.6vw;
        margin: 2vw;
    }

    .userNum {
        position: absolute;
        left: 2.66vw;
        top: 2.66vw;
        color: #eee;
        font-size: 3.73vw;
    }

    .accountBtn {
        position: absolute;
        right: 2.66vw;
        top: 2.66vw;
        border: 0.26vw solid #eee;
        border-radius: 5.33vw;
        width: 20vw;
        height: 5.33vw;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3.73vw;
        color: #eee;
    }

    .accountBtn img {
        width: 3.33vw;
        height: 3.33vw;
    }



    /* 功能列表 */
    .list {
        /* padding: 0 0 0 5.33vw; */
        margin: 2vw 0;
        background-color: #fff;
    }

    /*menu list*/
    .tableviewcell {
        position: relative;
        padding: 4vw 4.66vw;
        margin: 0;
        border-bottom: 0.26vw solid #eee;
        background-color: #fff;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    /*icon*/
    .tableviewcell .box {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .tableviewcell .box1 {
        display: flex;
        align-items: center;
    }

    .tableviewcell .left-icon {
        width: 5.33vw;
        height: 5.33vw;
    }

    .tableviewcell .right-icon {
        width: 4vw;
        height: 4vw;
    }

    /*text*/
    .tableviewcell span {
        font-size: 4vw;
        margin-left: 1.86vw;
    }

    .contact-btn {
        border: none;
        background-color: #fff;
        padding: 0.93vw 4.66vw !important;
    }
</style>
