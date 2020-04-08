<template>
  <div>
        <div v-for="(item,index) in infoList" :key="index">
            <div class="info">
                    <img :src="item.stu_head" alt="" class="avatar">
                    <span>{{item.user.user_alias}}</span>
            </div>
            <van-field
               v-model="item.stu_number"
               type="text"
               label="学号"
               placeholder="请填写学号"
               input-align="right"
               readonly
             />
           <van-field
              v-model="item.stu_name"
              type="text"
              label="名称"
              placeholder="请填写名称"
              input-align="right"
              readonly
            />
            <van-field
               v-model="item.stu_sex"
               type="text"
               label="性别"
               placeholder="请填写性别"
               input-align="right"
               readonly
             />
             <van-field
                v-model="item.stu_age"
                type="text"
                label="年龄"
                placeholder="请填写年龄"
                input-align="right"
                readonly
              />
              <van-field
                 v-model="item.class_grade"
                 type="text"
                 label="年级"
                 placeholder="请填写年级"
                 input-align="right"
                 readonly
               />
               <van-field
                  v-model="item.class_name"
                  type="textarea"
                  label="班级"
                  placeholder="请填写班级"
                  input-align="right"
                  readonly
                />
        </div>
  </div>
</template>

<script>
    import * as API from "../../api.js"
	export default {
		data() {
			return {
                infoList: []
			}
		},

		created() {
			 $('title').text('我的孩子');
		},

        mounted() {
            this.getFamilyMenber ()
        },

        methods: {
            // 获取家庭成员信息
            getFamilyMenber () {
               let that = this
               API.getFamilyMember({user_openid: sessionStorage.getItem('openId')},function(callback){
                  if(callback.data) {
                    that.infoList = callback.data;
                  }
               })
            }
        }
	}
</script>

<style scoped>
    .info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 2vw;
        border-bottom: .2vw solid #ddd;
    }

    .info .avatar {
        padding-right: 2vw;
        width: 20vw;
        height: 20vw;
    }
</style>
