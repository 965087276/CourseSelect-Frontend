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

// 课程预选
export const coursePreSelect = (bodyData) => {
    return request({
        method: 'post',
        url: '/student/course_preselect',
        data: bodyData
    })
}

// 选课
export const courseSelect = (bodyData) => {
    return request({
        method: 'post',
        url: '/student/course_select',
        data: bodyData
    })
}

// 获取课表
export const getStudentCourseTable = (username) => {
    return request({
        method: 'get',
        url: `/student/courses_table/students/${username}`
    })
}

// 选课学分统计
export const getCourseStats = (username) => {
    return request({
        method: 'get',
        url: `/student/course_stats/students/${username}`
    })
}

// 获取预选课程及时间安排
export const getStudentPreCourse = (username) => {
    return request({
        method: 'get',
        url: `/student/pre_course/students/${username}`
    })
}

// 删除预选课程
export const deleteStudentPreCourse = (username, courseCode) => {
    return request({
        method: 'delete',
        url: `/student/pre_courses/${courseCode}`,
        params: {
            username
        }
    })
}

// 修改预选课课程addToTable状态
export const modifyAddToTable = (username, courseCode, addToTable) => {
    return request({
        method: 'patch',
        url: `/student/pre_courses/${courseCode}`,
        params: {
            username,
            addToTable
        }
    })
}