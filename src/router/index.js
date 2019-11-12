import Vue from 'vue'
import VueRouter from 'vue-router'
import global from '../Common.vue'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
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
            requiresAuth: true
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
            requiresAuth: true
        }
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token')) {
            alert(localStorage.getItem('token'))
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
