import request from '../axios-config.js'

// 登录
export const login = (username, password) => {
    return request({
        method: 'post',
        url   : '/login',
        data: {
            username,
            password
        }
    })
}

// 注册
export const register = (bodyData) => {
    return request({
        method: 'post',
        url   : '/register',
        data: bodyData
    })
}

// 获取用户信息
export const getUserInfo = (username) => {
    alert(username)
    return request({
        method: 'get',
        url: `/users/${username}`
    })
}