<template>
    <div id="app">
        <router-view :key="key"></router-view>
    </div>
</template>
<style>
    /*@import "../static/css/main.css";*/
</style>
<script>
    export default{
		data(){
		    return {
	 
			}
		},
		computed:{
			// 加了这个key就可以跳转页面实时刷新了
		    key(){
		        return this.$route.path + Math.random();
		    }
		}
    }
</script>