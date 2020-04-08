<template>
    <div>
        <div class="content">
            <van-search v-model="key" shape="round" background="#1989fa" placeholder="请输入学号/姓名关键字" @search="getData" autofocus/>
            <div class="children-list" v-for="(item,index) in childList" :key="index">
                <div class="info">
                    <img class="portrait" @click='toChildren_Details(item.stu_number)' mode='aspectFill' :src="item.stu_image"></img>
                    <div class="content" @click='toChildren_Details(item.stu_number)'>
                        <span>{{item.stu_name}}</span>
                        <span>学号：{{item.stu_number}}</span>
                        <span v-if="item.class_grade">班级：{{item.class_grade}}年级{{item.class_name}}班</span>
                        <span v-else>班级：暂无班级信息</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as API from "../../api.js"
    export default {
        data() {
            return {
                childList: [],
                key: ''
            }
        },
        created() {
            $('title').text('搜索')
        },
        methods: {
            // 跳转孩子信息页
            toChildren_Details(stu_number) {
                console.log(stu_number)
                this.$router.push("/childrenInfo?stu_number=" + stu_number);
            },
            // 搜索孩子
            getData() {
                let that = this;
                API.getStudent({
                    name: that.key
                }, function(callback) {
                    console.log(callback)
                    if (callback.msg === 'ok') {
                        that.childList = callback.data
                        if (that.childList.length === 0) {
                            that.$toast.fail('没有相关信息');
                        }
                    } else {
                        that.$toast.fail(callback.msg);
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


    .children-list {
        border-bottom: 1vw solid #eee;
        font-size: 4vw;
    }

    .children-list .info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        padding: 3vw 2vw;
    }

    .children-list .info .portrait {
        width: 30vw;
        height: 24vw;
        border: none;
        margin-right: 2vw;
        /* border-radius: 2vw; */
    }

    .children-list .info .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .children-list .info .content img {
        width: 5vw;
        height: 5vw;
        margin: 0 4vw;
    }

    .children-list .info .content span {
        padding: 2vw 0;
        /* height: 50px; */
        /* line-height: 10vw; */
    }
</style>
