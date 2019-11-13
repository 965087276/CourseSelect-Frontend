import request from '../axios-config.js'

export const login = (userName, password) => {
    return request({
        method: 'get',
        url   : '/login',
        params: {
            userName,
            password
        }
    })
}