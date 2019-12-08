import request from '../axios-config.js'

// 获取选课状态
export const getCourseSelectStatus = () => {
    return request({
        method: 'get',
        url: '/pub/course_select_status'
    })
}