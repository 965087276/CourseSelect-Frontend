<template>
  <div class="block">
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
    <div v-if="enableSeclect(date)">
      <font color="#99FF00" size="6" >当前状态：选课已经开放！！！</font>
    </div>
    <div v-else>
      <font color="#FF0000" size="6" >当前状态：选课尚未开放！！！</font>
    </div>
    </div>
</template>

<script>
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
          selectedDate:''
        },
      };
    },
    mounted(){
      var _this = this; 
      this.timeId = setInterval(function(){
      _this.date = new Date(); 
      }, 1000)
    },
    methods:{
      selectedTime(val){
        this.form.selectedDate=val;
      },
      timestampToTime (val) {
        var date = new Date(val) 
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = date.getDate() + ' '
        var h = (date.getHours()<10?'0'+date.getHours():date.getHours()) + ':'
        var m = (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())+ ':'
        var s = (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds())
        return Y+M+D+h+m+s
      },
      enableSeclect(val){
        var start=new Date(this.form.selectedDate[0]).getTime();
        var end=new Date(this.form.selectedDate[1]).getTime();
        var now=new Date(val).getTime();
        if(now>=start&&now<=end)
          return true;
        return false;
      }
    },
    beforeDestroy() {
        if (this.timeId) {
          clearInterval(this.timeId); 
        }
    }
  };
</script>
<style lang="scss" scoped>

</style>