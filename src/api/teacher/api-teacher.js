import request from '../axios-config.js'

export const addCourse=(bodyDate)=>{
    return request({
        method:'post',
        url:'/teacher/courses',
        data:bodyDate
    })
}

export const getTeacherCourseTable=(teacherId)=>{
    return request({
        method:'get',
        url:`/teacher/courseTable/${teacherId}`
    })
}

export const getTeacherCourse=(teacherId)=>{
    return request({
        method:'get',
        url:`/teacher/courses/${teacherId}`
    })
}

//得到上该门课的学生
export const getStudents=(courseCode)=>{
    return request({
        method:'get',
        url:`/teacher/students/${courseCode}`
    })
}

//输入成绩
export const inputGrades=(bodyDate) =>{
    return request({
        method:'patch',
        url:'/teacher/grades',
        data:bodyDate
    })
}