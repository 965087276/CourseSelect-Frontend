<template>
    <div>
        <h1>{{this.courseName}}({{this.courseCode}})选课花名册</h1>
        <el-button type="success" size="small" @click="download">下载excel模板</el-button>
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            :http-request="uploadFile"
            :on-preview="handlePreview"
            :before-update="beforeUploadExcel"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">批量上传成绩</el-button>
        </el-upload>
        <el-table
            :data="tableData"
            style="width: 80%">
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
            <el-table-column label="操作" width="300">
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
                },
                fileList: [],
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
            beforeUploadExcel(file){
                console.log(file.name);
            },

            download(){
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/excel/Export2Excel.js');
                    const tHeader = ['学号', '姓名', '学院', '成绩'];
                    const filterVal = ['studentUsername', 'studentRealName', 'college'];
                   
                    const list = this.tableData;  //把data里的tableData存到list
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, this.courseName+'成绩表');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            uploadFile(item){
                this.$confirm("是否确认录入？","确认录入",
                {type:'info'})
                .then(()=>{
                    const form=new FormData();
                    form.append('file',item.file)
                    teacherAPI.uploadExcel(this.courseCode,form)
                    .then(()=>{
                        this.$message({
                                message:"文件已上传！！",
                                type:'success',
                            });
                        this.getStudentsInfo()
                    })
                    
                })
            },
            handleRemove(file, fileList) {
                console.log(file.name, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                this.fileList=fileList;
                console.log(this.fileList);
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            save(){
                this.$confirm("是否确认录入？","确认录入",
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
                    this.tableData=body.sort(this.compare('studentUsername'));
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
