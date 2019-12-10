<template>
    <div>
        <h1>{{this.courseName}}({{this.courseCode}})选课花名册</h1>
        <el-button type="primary" size="medium" @click="save()">批量导入成绩</el-button>
        <el-table
            :data="tableData"
            style="width: 100%">
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
                <template slot-scope="scope">
                    {{ scope.row.finished ? scope.row.grade : '未录入' }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="400">
                <template slot-scope="scope">
                    <el-button
                            size="medium"
                            :type="scope.row.finished ? 'danger' : 'primary'"
                            @click="editGrade(scope.$index, scope.row)">
                        {{ scope.row.finished ? '修改成绩' : '录入成绩' }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="编辑成绩" :visible.sync="dialogFormVisible">
            <el-form :model="gradeForm">
                <el-form-item label="学生学号" :label-width="formLabelWidth">
                    <el-input v-model="gradeForm.username" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="学生姓名" :label-width="formLabelWidth">
                    <el-input v-model="gradeForm.realName" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="成绩" :label-width="formLabelWidth">
                    <el-input v-model="gradeForm.grade" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEditGrade">确 定</el-button>
            </div>
        </el-dialog>


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
                dialogFormVisible: false,
                formLabelWidth: '120px',
                gradeForm: {
                    'username': '',
                    'courseCode': '',
                    'grade': '',
                    'realName': '',
                    'index': 0
                }
            }

        },
        methods: {
            editGrade(index, row) {
                this.gradeForm.username = row.studentUsername
                this.gradeForm.courseCode = this.courseCode
                this.gradeForm.realName = row.studentRealName
                this.gradeForm.grade = ''
                this.gradeForm.index = index
                this.dialogFormVisible = true
            },
            confirmEditGrade() {
                this.dialogFormVisible = false
                let index = parseInt(this.gradeForm.index)
                this.tableData[index].grade = this.gradeForm.grade
                this.tableData[index].finished = true
                this.tableData.push()
            },
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