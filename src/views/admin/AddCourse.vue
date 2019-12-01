<template>
    <el-container>
        <el-main>
           <el-button type="primary" @click="importCourse">导入课程</el-button>
           <el-form :inline="true" :model="formInline" :ref="formInline" :rules='rules' label-width="100px" class="demo-dynamic">
           <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-form-item label="课程学时" prop="courseHours">
                            <el-input v-model.number="formInline.courseHours" placeholder="请输入" clearable>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-form-item label="课程名称" prop="courseName">
                            <el-input v-model="formInline.courseName" placeholder="请输入" clearable></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="任课老师编号" prop="teacherId">
                            <el-input v-model="formInline.teacherId" placeholder="请输入" clearable></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-form-item label="任课老师" prop="teacherName">
                            <el-input v-model="formInline.teacherName" placeholder="请输入" clearable></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-form-item label="开课学院">
                        <el-select v-model="formInline.colleges" filterable placeholder="请选择">
                            <el-option v-for="item in colleges" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                </el-col>
                <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-form-item label="课程属性">
                        <el-select v-model="formInline.courseTypes" filterable placeholder="请选择">
                            <el-option v-for="item in courseTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-form-item label="学分" prop="credit">
                         <el-input v-model.number="formInline.credit" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-form-item label="限选人数" prop="limitNum">
                        <el-input v-model.number="formInline.limitNum" placeholder="请输入(0代表无限制)" clearable></el-input>
                    </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-form-item label="课程开始周">
                            <el-select v-model="formInline.startWeek" filterable placeholder="请选择">
                                <el-option v-for="item in weekMap" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                         </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-form-item label="课程结束周">
                        <el-select v-model="formInline.endWeek" filterable placeholder="请选择">
                            <el-option v-for="item in weekMap" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                 <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-form-item
                            v-for="(courseTime, index) in formInline.courseTimes"
                            :label="index+'节次'"
                            :key="courseTime.key"
                            :prop="'courseTimes.' + index + '.value'"
                            >
                            <el-select v-model="formInline.courseTimes[index]" filterable placeholder="请选择">
                                <el-option v-for="item in coursetimes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            <el-button @click.prevent="removeCourseTime(courseTime)">删除</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="addCourseTime">新增节次</el-button>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <el-form-item
                        v-for="(classroom, index) in formInline.classrooms"
                        :label="index+'教室'"
                        :key="classroom.key"
                        :prop="'classrooms.' + index + '.value'"
                        :rules="[{
                            required: true, 
                            message: '教室不能为空！', 
                            trigger: 'blur' 
                        }]">
                        <el-input v-model="classroom.value" clearable></el-input>
                    </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <el-form-item
                            v-for="(week, index) in formInline.weeks"
                            :label="index+'星期'"
                            :key="week.key"
                            :prop="'weeks.' + index + '.value'"
                            >
                            <el-select v-model="formInline.weeks[index]" filterable placeholder="请选择">
                                <el-option v-for="item in weekTime" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
        </el-form>
        </el-main>
        <el-footer>
            <div style="
                width: 100%;
                height: 100px;
                text-align:center;"
                >
                <el-button type="success" round size="medium" @click="addCourseClick(formInline)">确认添加</el-button>
            </div>
        </el-footer>
    </el-container>
</template>

<script>
    import * as adminAPI from '@/api/admin/api-admin.js'
    export default {
        data() {
            return {
                rules:{
                    courseHours:[
                        {required: true, message: '课程学时不能为空！', trigger: 'blur' },
                        {type:'number',message:'课程学时只能为数字'}
                    ],
                    courseName:[{required: true, message: '课程名称不能为空！', trigger: 'blur' }],
                    credit:[
                        {required: true, message: '学分不能为空！', trigger: 'blur' },
                        {type:'number',message:'学分只能为数字'}
                        ],
                    limitNum:[
                        {required: true, message: '限选人数不能为空！', trigger: 'blur' },
                        {type:'number',message:'限选人数只能为数字'}
                        ]
                },
                colleges: [{
                    value: '计算机科学与技术学院',
                    label: '计算机科学与技术学院'
                }, {
                    value: '网络空间安全学院',
                    label: '网络空间安全学院'
                }, {
                    value: '人工智能技术学院',
                    label: '人工智能技术学院'
                }, {
                    value: '软件学院',
                    label: '软件学院'
                }, {
                    value: '马克思主义学院',
                    label: '马克思主义学院'
                }],
                courseTypes: [{
                    value: '专业核心课',
                    label: '专业核心课'
                }, {
                    value: '普及课',
                    label: '普及课'
                }, {
                    value: '研讨课',
                    label: '研讨课'
                }, {
                    value: '公共选修课',
                    label: '公共选修课'
                }, {
                    value: '公共必修课',
                    label: '公共必修课'
                }],
                weekMap:[{
                    value: 1,
                    label: '第1周'
                }, {
                    value: 2,
                    label: '第2周'
                }, {
                    value: 3,
                    label: '第3周'
                }, {
                    value: 4,
                    label: '第4周'
                }, {
                    value: 5,
                    label: '第5周'
                }, {
                    value: 6,
                    label: '第6周'
                }, {
                    value: 7,
                    label: '第7周'
                }, {
                    value: 8,
                    label: '第8周'
                }, {
                    value: 9,
                    label: '第9周'
                }, {
                    value: 10,
                    label: '第10周'
                },{
                    value: 11,
                    label: '第11周'
                }, {
                    value: 12,
                    label: '第12周'
                }, {
                    value: 13,
                    label: '第13周'
                }, {
                    value:  14,
                    label: '第14周'
                }, {
                    value: 15,
                    label: '第15周'
                },{
                    value: 16,
                    label: '第16周'
                }, {
                    value: 17,
                    label: '第17周'
                }, {
                    value: 18,
                    label: '第18周'
                }, {
                    value: 19,
                    label: '第19周'
                }, {
                    value: 20,
                    label: '第20周'
                }],
                weekTime:[{
                    value: 1,
                    label:'星期一'
                },{
                    value:2,
                    label:'星期二'
                },{
                    value:3,
                    label:'星期三'
                },{
                    value:4,
                    label:'星期四'
                },{
                    value:5,
                    label:'星期五'
                },{
                    value:6,
                    label:'星期六'
                },{
                    value:7,
                    label:'星期日'
                }],
                formInline: {
                    courseHours:'',
                    courseName: '',
                    teacherId:'',
                    teacherName:'',
                    colleges: '',
                    courseTypes:'',
                    credit:'',
                    limitNum:'',
                    startWeek:'',
                    endWeek:'',
                    weeks:[{
                        value:''
                    }],
                    courseTimes:[{
                        value:''
                    }],
                    classrooms:[{
                        value:''
                    }],
                },
                courseList: [],
                coursetimes:[{
                    value:1,
                    label:'第1节'
                },{
                    value:2,
                    label:'第2节'
                },{
                    value:3,
                    label:'第3节'
                },{
                    value:'4',
                    label:'第4节'
                },{
                    value:5,
                    label:'第5节'
                }]
            }
        },
        methods: {
            importCourse(){

            },
            removeCourseTime(item) {
                var index = this.formInline.courseTimes.indexOf(item);
                if (index !== -1) {
                this.formInline.courseTimes.splice(index, 1);
                this.formInline.classrooms.splice(index, 1);
                this.formInline.weeks.splice(index,1);
                }
            },
            addCourseTime() {
                this.formInline.courseTimes.push({
                value:'',
                key: Date.now()
                });
                this.formInline.classrooms.push({
                value:'',
                key: Date.now()
                });
                this.formInline.weeks.push({
                value:'',
                key: Date.now()
                });
            },
            addCourseClick(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                            this.$confirm("是否确认添加该课程？","添加确认",{
                                type:"info"})
                                .then(()=>{
                                    let body={
                                            teacherId:this.formInline.teacherId,
                                            courseTeacher:this.formInline.teacherName,
                                            courseName:this.formInline.courseName,
                                            courseType:this.formInline.courseTypes,
                                            courseHours:this.formInline.courseHours,
                                            credit:this.formInline.credit,
                                            limitNum:this.formInline.limitNum,
                                            college: this.formInline.colleges,
                                            schedules:[]
                                        }
                                        for(let i=0;i<this.formInline.courseTimes.length;i++)
                                        {
                                            body.schedules[i]={
                                                startWeek:parseInt(this.formInline.startWeek),
                                                endWeek:parseInt(this.formInline.endWeek),
                                                day:parseInt(this.formInline.weeks[i]),
                                                time:parseInt(this.formInline.courseTimes[i]),
                                                classroom:this.formInline.classrooms[i].value
                                            }
                                        }
                                    adminAPI.addCourse(body)
                                    .then(()=>{
                                        this.$message({
                                        message:"添加课程成功！！",
                                        type:'success',
                                    });
                                    })
                                }).catch(()=>{
                                    this.$message({
                                        type: 'info',
                                        message: '已取消添加'
                                    });
                                })
                        }
                })
            }
        },
        mounted(){
        },
        created(){
            this.formInline.startWeek=1
            this.formInline.endWeek=20
            this.formInline.colleges='计算机科学与技术学院'
            this.formInline.weeks=[1]
            this.formInline.courseTimes=[1]
            this.formInline.courseTypes='专业核心课'
        }
    }
</script>


<style lang="scss" scoped>
    .el-main {
        margin-left: 0px
    }
    .el-pagination {
        width: 100%;
        margin: 0 auto
    }
</style>