<template>
    <div>
        <h1>{{this.courseName}}({{this.courseCode}})选课花名册</h1>
        <el-button type="primary" size="medium" @click="save()">提交</el-button>
        <el-table
            :data="tableData"
            style="width: 90%">
                <el-table-column
                    prop="studentUsername"
                    label="学号"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="studentRealName"
                    label="姓名"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="college"
                    label="学院"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="grade"
                    label="成绩"
                    width="300">
                    <template scope="scope">
                        <el-input size="small" 
                            v-model="scope.row.grade" 
                            placeholder="请输入内容">
                        </el-input> 
                    </template>
                </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import * as teacherAPI from '@/api/teacher/api-teacher.js'
    export default {
        data() {
            return {
                tableData: [],
                courseCode:'',
                courseName:'',
                }
        },
        methods: {
            getParams(){
                this.courseCode=this.$route.query.courseCode;
                this.courseName=this.$route.query.courseName;
            },
            save(){
                this.$confirm("是否确认提交？","确认提交",
                {type:'info'})
                .then(()=>{
                    let body={
                        content:[]
                    }
                    for(let i=0;i<this.tableData.length;i++)
                    {
                        body.content[i]={
                            courseCode:this.courseCode,
                            studentUsername:this.tableData[i].studentUsername,
                            grade:this.tableData[i].grade,
                        }
                    }
                    teacherAPI.inputGrades(body)
                    .then(()=>{
                        this.$message({
                            message:"成绩已提交！！",
                            type:'success',
                        });
                    })
                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message: '已取消提交'
                    });
                })
                
            },
            getStudentsInfo(){
                teacherAPI.getStudents(this.courseCode)
                .then(body=>{
                    this.tableData=body.students.sort(this.compare('studentUsername'));
                })
            },
            compare(attr) {
                return function(a,b){
                    var val1 = a[attr];
                    var val2 = b[attr];
                    return val1 - val2;
                }
            },
        },
        created() {
            this.getParams();
        },
        mounted(){
            this.getStudentsInfo();
        }
    };
</script>

<style lang="scss" scoped>
    #login {
        .title {
            font-size: 1.5rem;
        }
        .btn_box {
            float: right;
            @media screen and (max-width: 560px) {
                float: initial;
                display: flex;
                justify-content: center;
                margin-left: -50px;
                margin-top: 10px;
            }
        }
        .rememberPwd {
            margin-left: 50px;
            margin-bottom: 20px;
        }
    }
</style>