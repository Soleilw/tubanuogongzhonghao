<template>
    <div>
       <!-- <van-nav-bar title="我的孩子" fixed/> -->
	   <div class="content">
		   <div class="children-list" v-for="(item,index) in childrenList" :key="index">
			   <div class="info">

                       <img class="portrait" @click='toChildren_Details(item.stu_number)' mode='aspectFill' :src="item.stu_head"></img>

				  <div class="content"  @click='toChildren_Details(item.stu_number)'>
					   <div>
						   <span>{{item.stu_name}}</span>
						   <img :src="item.stu_sex == 1 ? boy : girl"></img>
						   <span>{{item.stu_age}}岁</span>
					   </div>
					   <span>学号：{{item.stu_number}}</span>
					   <span v-if="item.class_grade">班级：{{item.class_grade}}年级{{item.class_name}}班</span>
					   <span v-else>班级：暂无班级信息</span>
				   </div>
				 <div v-if="item.stu_status == 0" class="switch">
					     <span>审核中</span>
				   </div>
			   </div>
		   </div>
		   <div class="add" @click='toSearch'>
		     <!-- <div>+</div> -->
		     <img src="../../assets/icon/add.png"></img>
		     <span>添加孩子</span>
		   </div>
	   </div>
      <!-- <div class="content" >
        <div class="children-list" v-for="(item,index) in childrenList" v-key="index">
            <div class="info">
              <img class="portrait" @click='toChildren_Details(item.stu_number)' mode='aspectFill' :src="item.stu_head"></img>
              <div class="content"  @click='toChildren_Details'>
                <div>
                  <span>{{item.stu_name}}</span>
                  <img :src="item.stu_sex == 1 ? '/icon/boy.png' : '/icon/girl.png'"></img>
                  <span>{{item.stu_age}}岁</span>
                </div>
                <span>学号：{{item.stu_number}}</span>
                <span v-if="item.class_grade">班级：{{item.class_grade}}年级{{item.class_name}}</span>
                <span v-else>班级：暂无录入信息</span>
              </div> -->
              <!-- <div v-if="{{item.parent_status == 1}}" class="switch" data-index="{{index}}" bindtap='change_state'>
                <span>家庭成员</span>
                <img mode='aspectFill' src="{{item.family_state == true ? '/icon/up.png' : '/icon/down.png'}}"></img>
              </div> -->
        <!--     <div v-else-if="{{item.parent_status == 0}}" class="switch">
                <span>审核中</span>
              </div>
            </div> -->
            <!-- <div v-if="{{item.family_state}}" class="family ripple fadeIn" animation="{{item.animationData}}">

              <div v-for="items,index1 in item.family" v-key="index" class="family-list"  bindtap='toFamily_Details' v-if='items.parent_status != 2'>
                <div>
                  <img :src="items.user_image"></img>
                  <span v-if="items.parent_status != 1">{{items.parent_status == 0 ? '审核中' : items.parent_status == 2 ? '不通过' : ''}}</span>
                </div>
                <span class='familyName'>{{items.user_name}}</span>
              </div>
              <span v-if="item.family.length == 0" class="notData">暂无家庭成员~</span>
            </div> -->
          <!-- </div> -->
         <!-- <div class="add" bindtap='toSearch'> -->
            <!-- <div>+</div> -->
           <!-- <img src="/icon/add.png"></img>
            <span>添加孩子</span>
          </div> -->
          <!-- <div style="background-color:red;width:750px;height:100px;"></div> -->
       <!-- </div> -->
    </div>
</template>

<script>
    import * as API from "../../api.js"
    import Exif from '../../../static/js/exif.js'
    let departmentList = [];//完整的架构列表
    export default {
        data() {
            return {
                userInfor:{
                  userSex:1
                },
				childrenList: [],
				boy: require('../../assets/icon/boy.png'),
				girl: require('../../assets/icon/girl.png')
            }
        },
        created() {
          $('title').text('我的孩子')

              this.userInfor = API.data.userInfor

        },

		mounted() {
			this.getMyChild();
		},

        methods: {
            // 页面返回
            onClickLeft() {
              this.$router.go(-1)
            },
            // 跳转孩子信息页
            toChildren_Details(stu_number) {
              console.log(stu_number)
                this.$router.push("/childrenInfo?stu_number=" + stu_number);
            },
            // 跳转搜索添加孩子
            toSearch: function() {
                this.$router.push("/search");
            },
            // 获取孩子列表
         getMyChild() {
			 let that = this
			 API.getMyChild({user_openid: sessionStorage.getItem('openId')},function(callback){
				 console.log(1111,callback.data)
			    if(callback.data) {
			      that.childrenList = callback.data;
			    }
			 })
		 }
        }
    }

</script>

<style scoped>
    .content{
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
  min-width: 30vw;
  height: 24vw;
  border: none;
  margin-right: 2vw;
  /* border-radius: 2vw; */
}

.children-list .info .content  {
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
.children-list .info .switch {
  position: absolute;
  right:20px;
  bottom:20px;
  width: 20vw;
  padding: 1vw;
  border-radius: 2vw;
  text-align: center;
  background-color:#1989fa;
  color:#fff;
}
/* .children-list .info .switch img{
  width:25px;
  height:25px;
  margin:0 10px;
}
.children-list .family{
   padding:10px 0;
  border-top:3px solid #eee;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  font-size: 30px;
  color:#666;
}
.children-list .family img{
  width:150px;
  height:150px;
}
.children-list .family .family-list{
  width:150px;
  height:150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.children-list .family .family-list view{
  position:relative;
  min-width: 100px;
  min-height:100px;
  width:100px;
  height:100px;
  border-radius: 50%;
  overflow: hidden;
}
.children-list .family .family-list view span{
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  line-height:100px;
  text-align: center;
  font-size: 28px;
  color:#fff;
  background-color:rgba(0,0,0,0.5);
}
.children-list .family .family-list .familyName{
  max-width:150px;
  height:40px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  overflow: hidden;
} */
.add {
  width: 30vw;
  margin: 20vw auto;
  color: #1989fa;
  font-size: 4.667vw;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.add img {
  width: 17.333vw;
  height: 17.333vw;
}
.add span {
  margin-top: 1vw;
}


</style>
