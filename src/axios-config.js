// import axios from 'axios';
// import MessageBox from 'element-ui'
// import store from '@/store/index'
// import instance from './api/axios-config';
// import router from 'vue-router';

// axios.defaults.timeout = 3000;
// axios.defaults.baseURL = "http://223.4.25.117:3000/mock/23/xk/api";
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


// // http request 拦截器
// instance.interceptors.request.use(
//     config => {
//         // 每次发送请求之前判断vuex中是否存在token        
//         // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
//         // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
//         const token = store.state.token;
//         token && (config.headers.Authorization = token);
//         return config;
//     },
//     error => {
//         return Promise.error(error);
//     }
// )

// // http response 拦截器
// instance.interceptors.response.use(
//     // 走通接口的时候
//     response => {
//         // 如果返回的状态码是200，说明接口请求成功，可以正常拿到数据
//         if (response.status == 200) {
//             return response;
//         }
//         // 否则的话抛出错误
//         else {
//             return Promise.reject(response);
//         }
//     },
//     // 服务器状态码不是2开头的情况
//     error => {
//         if (error.response.status) {
//             switch (error.response.status) {
//                 // 401: 未登录
//                 // 未登录则跳转登录页面，并携带当前页面的路径
//                 // 在登陆成功后返回当前页面，这一步需要在登录页操作。
//                 case 401:
//                     router.replace({
//                         path: '/login',
//                         query: {
//                             redirect: router.currentRoute.fullPath
//                         }
//                     })
//                     break;
//                 // 403 token过期
//                 // 登录过期对用户进行提示
//                 // 清除本地缓存和清空vuex中token对象
//                 // 跳转登录页面
//                 case 403:
//                     this.$message('登录过期，请重新登录');
//                     localStorage.removeItem('token');
//                     break;
//                 default:
//                     let message;
//                     try {
//                         message = error.response.data.message
//                     } catch (e) {
//                         message = error
//                     }
//                     MessageBox.confirm(
//                         `${message}`,
//                         `错误信息`,
//                         {
//                             dangerouslyUseHTMLString: true,
//                             confirmButtonText       : '刷新',
//                             cancelButtonText        : '取消'
//                         }
//                     ).then(() => {
//                         window.location.reload(true)
//                     })
            
//                     return Promise.reject('error')
//                     break;
//             }
//         }
//     }
// )