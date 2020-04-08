<template>
  <div>
        <div v-for="(item,index) in infoList" :key="index">
            <div class="info">
                    <img :src="item.user.user_image" alt="" class="avatar">
                    <span>{{item.user.user_alias}}</span>
            </div>
           <van-field
              v-model="item.user.user_alias"
              type="text"
              label="名称"
              placeholder="请填写名称"
              input-align="right"
              readonly
            />
            <van-field
               v-model="item.user.user_sex"
               type="text"
               label="性别"
               placeholder="请填写性别"
               input-align="right"
               readonly
             />
             <van-field
                v-model="item.user.user_iphone"
                type="text"
                label="手机"
                placeholder="请填写手机"
                input-align="right"
                readonly
              />
              <van-field
                 v-model="item.user.user_card"
                 type="text"
                 label="身份证"
                 placeholder="请填写身份证"
                 input-align="right"
                 readonly
               />
               <van-field
                  v-model="item.user.user_address"
                  type="textarea"
                  label="地址"
                  placeholder="请填写地址"
                  input-align="right"
                  readonly
                />
                <van-field
                   v-model="item.user.user_word"
                   type="text"
                   label="备注"
                   placeholder="无"
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
			 $('title').text('家庭成员信息');
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
