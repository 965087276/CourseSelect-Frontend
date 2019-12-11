<template>
  <div class="time">
    <h1>当前时间：{{timestampToTime(date)}}</h1>
    <span class="demonstration">设置选课开放时间</span>
    <el-date-picker
      v-model="form.selectedDate"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="selectedTime">
    </el-date-picker>
      <div v-if="this.form.selectedDate">
        <p>当前选课开放的时间为：{{timestampToTime(this.form.selectedDate[0])}}
        至{{timestampToTime(this.form.selectedDate[1])}}</p>
      </div>
      <div v-else>
        <p>还未设置选课时间</p>
      </div>
      <div v-if="isEnableSelect(date)">
        <font color="#99FF00" size="6" >当前状态：选课已经开放！！！</font>
      </div>
      <div v-else>
        <font color="#FF0000" size="6" >当前状态：选课尚未开放！！！</font>
      </div>
    </div>
</template>

<script>
  import * as adminAPI from '@/api/admin/api-admin.js'
  export default {
    data() {
      return {
        date(){
          return {
            date:new Date()
          };
        },
        pickerOptions: {
          shortcuts: [{
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              end.setTime(end.getTime()-3600*1000*24*7);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        form:{
          selectedDate:['',''],
        },
      };
    },
    mounted(){
      this.getEnableToSelectTimes();
      var _this = this; 
      this.timeId = setInterval(function(){
      _this.date = new Date(); 
      }, 1000);
    },
    methods:{
      timestampToTime (val) {
        var date = new Date(val) 
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = (date.getDate()<10?'0'+(date.getDate()) : date.getDate()) + ' '
        var h = (date.getHours()<10?'0'+date.getHours():date.getHours()) + ':'
        var m = (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())+ ':'
        var s = (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds())
        return Y+M+D+h+m+s
      },
      isEnableSelect(val){
        var start=new Date(this.form.selectedDate[0]).getTime();
        var end=new Date(this.form.selectedDate[1]).getTime();
        var now=new Date(val).getTime();
        if(now>=start&&now<=end)
          return true;
        return false;
      },
      getEnableToSelectTimes(){
        adminAPI.getEnableTimes()
        .then(body => {
            this.form.selectedDate[0]=body.startTime;
            this.form.selectedDate[1]=body.endTime;
        } 
        )
      },
      editEnableToSelectTimes(val1,val2){
        adminAPI.editEnableTimes(val1,val2)
        .then(body=>{
            this.$message({
                message: '修改选课时间成功啦！',
                type: 'success'
            });
        })
      },
      selectedTime(val){
        this.form.selectedDate[0]=val[0];
        this.form.selectedDate[1]=val[1];
        this.editEnableToSelectTimes(val[0],val[1]);
      },
    },
    beforeDestroy() {
        if (this.timeId) {
          clearInterval(this.timeId); 
        }
    }
  };
</script>
<style lang="scss" scoped>
.time{
  right:200px;
  bottom:200px;
}
</style>