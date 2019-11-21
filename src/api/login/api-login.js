import request from '../axios-config.js'

// 登录
export const login = (userCode, password) => {
    return request({
        method: 'post',
        url   : '/login',
        data: {
            userCode,
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
export const getUserInfo = (userCode) => {
    return request({
        method: 'get',
        url: `/users/${userCode}`
    })
}