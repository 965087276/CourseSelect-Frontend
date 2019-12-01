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
            day: formInline.day,
            time: formInline.time
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

export const getStudentCourseTable = (username) => {
    return request({
        method: 'get',
        url: `/student/courses_table/students/${username}`
    })
}

export const getCourseStats = (username) => {
    return request({
        method: 'get',
        url: `/student/course_stats/students/${username}`
    })
}

export const getStudentPreCourse = (username) => {
    return request({
        method: 'get',
        url: `/student/pre_course/students/${username}`
    })
}

export const deleteStudentPreCourse = (username, courseCode) => {
    return request({
        method: 'delete',
        url: `/student/pre_courses/${courseCode}`,
        params: {
            username
        }
    })
}