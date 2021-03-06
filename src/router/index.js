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
        redirect: '/teacher/course-manage/courses',
        component: () => import('../views/teacher/Teacher.vue'),
        meta: {
            requiresAuth: true,
            role: 'teacher'
        },
        children: [
            // {
            //     path: '/teacher/course-maneger/add',
            //     component: () => import('../views/teacher/AddCourse.vue'),
            // },
            {
                path:'/teacher/course-manage/grades',
                component:()=>import('../views/teacher/SelectForGrades.vue')
            },
            {
                path:'/teacher/course-manage/grades/enter',
                component:()=>import('../views/teacher/EnterGrades.vue')
            },
            {
                path:'/teacher/course-manage/schedules',
                component:()=>import('../views/teacher/TeacherCourse.vue')
            },
            {
                path:'/teacher/course-manage/courses',
                component:()=>import('../views/teacher/TeacherCourseList.vue')
            }
        ]
    },
    {
        path: '/student',
        name: 'student',
        component: () => import('../views/student/Student.vue'),
        redirect: '/student/course-list',
        meta: {
            requiresAuth: true,
            role: 'student'
        },
        children: [
            {
                path: '/student/course-list',
                name: 'course-list',
                component: () => import('../views/student/CourseList.vue')
            },
            {
                path: '/student/preselect/my',
                component: () => import('../views/student/MyPreSelect.vue')
            },
            {
                path: '/student/course-select/select',
                name: 'course-select',
                component: () => import('../views/student/CourseSelect.vue')
            },
            {
                path: '/student/course-select/my_course_table',
                component: () => import('../views/student/MyCourseTable.vue')
            },
            {
                path: '/student/course-select/my_course_list',
                component: () => import('../views/student/MyCourseList.vue')
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
        redirect: '/admin/course-maneger/courses',
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
                path:'/admin/course-maneger/courses',
                component: () => import('../views/admin/CourseManage.vue')
            },
            {
                path:'/admin/ableToSelectTime',
                component: () => import('../views/admin/AbleToSelectTime.vue')
            },
            {
                path: '/admin/user-manege/teacher',
                name: 'teacher-manage',
                component: () => import('../views/admin/TeacherManage.vue')
            },
            {
                path: '/admin/user-manege/student',
                name: 'student-manage',
                component: () => import('../views/admin/StudentManage.vue')
            }
        ]
    }
    
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    // 若要进入的页面需要权限
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
