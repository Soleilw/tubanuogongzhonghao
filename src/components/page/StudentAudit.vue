<template>
    <div>
            <van-cell title="学生审核" icon="friends-o" to="ParentAudit" is-link />

    </div>
</template>

<script>
    import * as API from "../../api.js"
    export default {
        data() {
            return {
      
            }
        },

        created() {
            $('title').text('学生审核');
        },
        methods: {
          

        }
    }
</script>

<style>
</style>
