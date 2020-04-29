// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 首页
import Index from '@/views/index';
//用户管理
import User from '@/components/user/user'
//课金管理
import Point from '@/components/point/point'




// 启用路由
Vue.use(Router);

// 导出路由 
export default new Router({
    routes: [{
        path: '/index',
        name: '首页',
        component: Index,
        children: [{
            path: '/user',
            name: 'user',
            component: User
        },
        {
            path: '/point',
            name: 'point',
            component: Point
        }
        ]
    }
    ]
})