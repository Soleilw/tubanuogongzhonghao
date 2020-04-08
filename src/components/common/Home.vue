<template>
    <div class="home">
        <!-- <v-head></v-head> -->
        <div class="content-box" style="margin:0 0 50px 0;">
            <div class="content1">
                <transition name="move" mode="out-in">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
        <v-tabbar></v-tabbar>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Vant from 'vant';
    import 'vant/lib/index.css';
    import vHead from './Header.vue';
    import vTabbar from './Tabbar.vue';
    export default {
        data(){
            return {
                collapse: false
            }
        },
        components:{
            // Vue.use(Vant);
            Vant,vHead,vTabbar
        },
        created(){
            Vue.use(Vant)
        }
    }
</script>
<style type="text/css">
    .contentBox{
        width: 100vw;
    }
</style>
