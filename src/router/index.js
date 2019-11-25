import Vue from 'vue'
import VueRouter from 'vue-router'
import global from '../Common.vue'
import store from '@/store/index'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('../views/Index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/login/Register.vue')
    },
    {
        path: '/teacher',
        name: 'teacher',
        component: () => import('../views/teacher/Teacher.vue'),
        meta: {
            requiresAuth: true,
            role: 'teacher'
        },
        children: [
            {
                path: 'children',
                component: () => import('../views/teacher/TeacherChild.vue'),
            }
        ]
    },
    {
        path: '/student',
        name: 'student',
        component: () => import('../views/student/Student.vue'),
        meta: {
            requiresAuth: true,
            role: 'student'
        },
        children: [
            {
                path: '/student/course-list',
                component: () => import('../views/student/CourseList.vue')
            },
            {
                path: '/student/preselect/my',
                component: () => import('../views/student/MyPreSelect.vue')
            },
            {
                path: '/student/course-select/select',
                component: () => import('../views/student/CourseSelect.vue')
            },
            {
                path: '/student/course-select/my',
                component: () => import('../views/student/MyCourse.vue')
            },
            {
                path: '/student/course-select/stats',
                component: () => import('../views/student/CourseStats.vue')
            },
            {
                path: '/student/grades',
                component: () => import('../views/student/CourseGrade.vue')
            }
        ]
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/admin/Admin.vue'),
        meta: {
            requiresAuth: true,
            role: 'admin'
        },
        children:[
            {
                path:'/admin/course-maneger/add',
                component: () => import('../views/admin/AddCourse.vue')
            },
            {
                path:'/admin/course-maneger/delete',
                component: () => import('../views/admin/DeleteCourse.vue')
            }
        ]
    }
    
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // token具备 并且 要进入的页面的权限角色跟当前用户的角色一致
        if (localStorage.getItem('authToken') && to.matched.some(record => record.meta.role  == store.state.role)) {
            next();
        }
        else {
            alert("请登录")
            router.push({ name: 'login', params: {}})
        }
    }
    else {
        next();
    }
})

export default router
