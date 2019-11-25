import axios from 'axios'
import store from '@/store/index'
import {
	Message,
	MessageBox
}            from 'element-ui'

// 创建axios实例
const instance       = axios.create({
    // baseURL: "http://localhost:9000/xk/api",
    baseURL: "http://223.4.25.117:3000/mock/23/xk/api",
    timeout: 3000 // 请求超时时间
})
//request
instance.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const authToken = store.state.authToken;
        authToken && (config.headers.Authorization = authToken) && (config.headers.authToken = authToken);
        return config;
    },
    error => {
        return Promise.error(error);
    }
)
//response
const STATUS = 200;
//response
instance.interceptors.response.use(
    //走通接口的时候
    response => {
        //失败的时候
        if (response.status !== STATUS) {
            console.log('走通接口,但失败的时候', response);
            return Promise.reject('error')
        }
        //成功的时候
        else {
            console.log('走通接口,且成功的时候', `${response.config.method}`, `${response.request.responseURL}\n`, response);
            // console.log('response:{}', response)
            return response.data.body
        }
    },
    //直接报错的时候
    error => {
        // alert('服务器连接失败')
        //https://www.jianshu.com/p/349b7ab263f8
        // console.log('Interceptor response:', response)
        console.log('直接报错的时候', error.response);
        /*Message({
            message  : `请求错误:${response.message ? response.message : '错误读取不到message键'}`,
            type     : 'error',
            duration : 5 * 1000,
            showClose: true,
        })*/
        let message;
        try {
            message = error.response.data.message
        } catch (e) {
            message = error
        }
        MessageBox.confirm(
            `${message}`,
            `错误信息`,
            {
                dangerouslyUseHTMLString: true,
                confirmButtonText       : '刷新',
                cancelButtonText        : '取消'
            }
        ).then(() => {
            window.location.reload(true)
        })

        return Promise.reject('error')
    }
)

export default instance
