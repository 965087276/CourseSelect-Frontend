import request from '../axios-config.js'

export const addCourse=(bodyDate)=>{
    return request({
        method:'post',
        url:'/teacher/courses',
        data:bodyDate
    })
}

export const getTeacherCourse=(teacherId)=>{
    return request({
        method:'get',
        url:`/teacher/courses/${teacherId}`
    })
}