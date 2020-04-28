import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:'history',//启用history模式可以去除地址上的#号(去除后只能通过域名访问，不能域名+路由访问)，详见：https://www.jianshu.com/p/ab0f3e0fe9e5、https://segmentfault.com/a/1190000015664067
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: resolve => require(['./components/page/Login.vue'], resolve),
            meta: { title: '登录' }
        },
        {
            path: '/register',
            component: resolve => require(['./components/page/Register.vue'], resolve),
            meta: { title: '用户注册' }
        },
        {
            path: '/visitor',
            component: resolve => require(['./components/page/Visitor.vue'], resolve),
            meta: { title: '访客申请' }
        },
        {
            path: '/personal',
            component: resolve => require(['./components/page/Personal.vue'], resolve),
            meta: { title: '个人中心' }
        },
        {
            path: '/userInfo',
            component: resolve => require(['./components/page/UserInfo.vue'], resolve),
            meta: { title: '用户信息' }
        },
		{
		    path: '/search',
		    component: resolve => require(['./components/page/Search.vue'], resolve),
		    meta: { title: '搜索' }
		},
		{
		    path: '/childrenList',
		    component: resolve => require(['./components/page/ChildrenList.vue'], resolve),
		    meta: { title: '我的孩子' }
		},
		{
		    path: '/childrenInfo',
		    component: resolve => require(['./components/page/ChildrenInfo.vue'], resolve),
		    meta: { title: '学生信息' }
		},
		{
		    path: '/studentAudit',
		    component: resolve => require(['./components/page/StudentAudit.vue'], resolve),
		    meta: { title: '学生审核' }
		},
		{
		    path: '/parentAudit',
		    component: resolve => require(['./components/page/ParentAudit.vue'], resolve),
		    meta: { title: '家长审核' }
		},
		{
		    path: '/familyMemberInfo',
		    component: resolve => require(['./components/page/FamilyMemberInfo.vue'], resolve),
		    meta: { title: '家庭成员信息' }
		},
		{
		    path: '/empty',
		    component: resolve => require(['./components/page/Empty.vue'], resolve),
		    meta: { title: '授权' }
		},
		// {
		//     path: '/mychild',
		//     component: resolve => require(['./components/page/Mychild.vue'], resolve),
		//     meta: { title: '我的孩子' }
		// },
        {
            path: '/404',
            component: resolve => require(['./components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['./components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
