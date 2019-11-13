import axios from 'axios'
import MessageBox from 'element-ui'

// 创建axios实例
const instance       = axios.create({
    // baseURL: "http://localhost:9000/xk/api",
    baseURL: "http://223.4.25.117:3000/mock/23/xk/api",
    timeout: 3000 // 请求超时时间
})
//request
instance.interceptors.request.use(
    config => {
        // console.log('Interceptor request:', config);
        // config.data = qs.stringify(config.data)
        return config
    },
    error => {
        // console.log('Interceptor request:', error);
        return Promise.reject('error')
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
            return response
        }
    },
    //直接报错的时候
    error => {
        alert('服务器连接失败')
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
