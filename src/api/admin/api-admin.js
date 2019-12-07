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