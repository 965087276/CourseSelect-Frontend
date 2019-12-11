import request from '../axios-config.js'

export const addCourse=(bodyDate)=>{
    return request({
        method:'post',
        url:'/teacher/courses',
        data:bodyDate
    })
}
//老师课表周试图接口
export const getTeacherCourseTable=(teacherId)=>{
    return request({
        method:'get',
        url:`/teacher/courseTable/${teacherId}`
    })
}
//录入成绩课程的接口
export const getTeacherCourse=(teacherId)=>{
    return request({
        method:'get',
        url:`/teacher/courses/${teacherId}`
    })
}
//删除课程接口
export const getTeacherCourseList=(teacherId)=>{
    return request({
        method:'get',
        url:`/teacher/courseList/${teacherId}`
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

export const uploadExcel=(courseCode,form)=>{
    return request({
        method:'post',
        url:'/teacher/gradesExcel/${courseCode}',
        data:form,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'/*'multipart/form-data'*/
        }
    })
}