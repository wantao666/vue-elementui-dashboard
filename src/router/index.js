// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 首页
import Index from '@/views/Index';
import Index1 from '@/views/index1'
//用户管理
import User from '@/components/user/user'
//课金管理
import Point from '@/components/point/point'
import login from '@/components/login'
import DataTable from '@/components/data/dataTable'
import Profile from '@/components/profile/profile'




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
        }, {
            path: '/data',
            name: 'dataTable',
            component: DataTable
        }

        ]
    }, {
        path: '/login',
        name: 'login',
        component: login,
    }, {
        path: '/index1',
        name: '前台首页',
        component: Index1,
        children: [{
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        ]
    }
    ]
})