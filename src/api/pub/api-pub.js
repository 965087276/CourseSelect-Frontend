import request from '../axios-config.js'

// 获取选课状态
export const getCourseSelectStatus = () => {
    return request({
        method: 'get',
        url: '/pub/course_select_status'
    })
}

// 获取所有教室
export const getClassrooms = () => {
    return request({
        method: 'get',
        url: '/pub/classrooms'
    })
}

// 获取所有学院
export const getColleges = () => {
    return request({
        method: 'get',
        url: '/pub/colleges'
    })
}

// 修改用户信息
export const updateUsers = (bodyData) => {
    return request({
        method: 'put',
        url: '/pub/users',
        data: bodyData
    })
}