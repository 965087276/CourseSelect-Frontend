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