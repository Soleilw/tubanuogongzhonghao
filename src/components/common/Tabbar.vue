<template>
    <div class="tabbar">
        <van-tabbar v-model="active" @change="onChange">
          <van-tabbar-item replace to="/personal" icon="friends-o">个人中心</van-tabbar-item>
          <van-tabbar-item replace to="/company" icon="home-o">我的公司</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
    import Vue from 'vue';
    import Vant from 'vant';
    export default {
        data() {
            return {
                active: 0
            }
        },
        computed:{

        },
        created(){
            // Vue.use(Vant)
            // console.log(this.$route.path)
            if(this.$route.path == '/personal'){
                this.active = 0
            }else if(this.$route.path == '/company'){
                this.active = 1
            }
           
             
        },
        methods:{
            // tabbar切换事件
            onChange(index) {
              // Notify({ type: 'primary', message: index });
            }
        }
    }
</script>
<style scoped>
    .tabbar{

    }
</style>
