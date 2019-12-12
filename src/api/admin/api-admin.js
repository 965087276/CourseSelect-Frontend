import request from '../axios-config.js'

//获取选课开放的起止时间
export const getEnableTimes = () => {
    return request({
        method: 'get',
        url   : '/pub/enabletimes'
    })
}

export const editEnableTimes=(startTime,endTime)=>{
    return request({
        method:'put',
        url:'/admin/enabletimes_edit',
        data:{
            startTime:startTime,
            endTime:endTime
        }
    })
}
export const deleteCourse=(courseCode)=>{
    return request({
        method:'delete',
        url:`/admin/course/${courseCode}`
    })
}

export const addCourse=(bodyDate)=>{
    return request({
        method:'post',
        url:'/teacher/courses',
        data:bodyDate
    })
}

// 获取所有教师
export const getTeachers = (parmData) => {
    return request({
        method: 'get',
        url: '/admin/teachers',
        params: parmData
    })
}

// 更新用户信息
export const updateUserInfo = (username, bodyData) => {
    return request({
        method: 'patch',
        url: `/admin/users/${username}`,
        data: bodyData
    })
}

// 删除用户
export const deleteUser = (username) => {
    return request({
        method: 'delete',
        url: `/admin/users/${username}`
    })
}

// 手动录入用户
export const addUser = (bodyData) => {
    return request({
        method: 'post',
        url: '/admin/users',
        data: bodyData
    })
}
//批量导入用户
export const usersImport=(role,form)=>{
    return request({
        method:'post',
        url:`/admin/usersExcel/${role}`,
        data:form,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'/*'multipart/form-data'*/
        }
    })
}

//批量导入课程
export const coursesImport=(form)=>{
    return request({
        method:'post',
        url:'/admin/coursesExcel',
        data:form,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'/*'multipart/form-data'*/
        }
    })
}