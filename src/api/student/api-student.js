import request from '../axios-config.js'

// 获取课程列表
export const getCourseList = (courseCode, courseName, college, courseTime, curPage, pageSize) => {
    return request({
        method: 'get',
        url: '/student/courses',
        params: {
            curPage,
            pageSize,
            courseCode,
            courseName,
            college,
            courseTime
        }
    })
}