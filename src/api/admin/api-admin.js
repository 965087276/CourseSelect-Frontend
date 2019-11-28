import request from '../axios-config.js'

//获取选课开放的起止时间
export const getEnableTimes = () => {
    return request({
        method: 'get',
        url   : '/pub/get_enable_times'
    })
}

export const editEnableTimes=(startTime,endTime)=>{
    return request({
        method:'post',
        url:'/admin/admin/edit_enable_times',
        data:{
            startTime:startTime,
            endTime:endTime
        }
    })
}