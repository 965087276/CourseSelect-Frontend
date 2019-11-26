import request from '../axios-config.js'

// 获取课程列表
export const getCourseList = (formInline, curPage, pageSize) => {
    return request({
        method: 'get',
        url: '/pub/courses',
        params: {
            curPage,
            pageSize,
            courseType: formInline.courseType,
            courseName: formInline.courseName,
            college: formInline.college,
            day: formInline.day
        }
    })
}

export const coursePreSelect = (bodyData) => {
    return request({
        method: 'post',
        url: '/student/course_preselect',
        data: bodyData
    })
}

export const courseSelect = (bodyData) => {
    return request({
        method: 'post',
        url: '/student/course_select',
        data: bodyData
    })
}