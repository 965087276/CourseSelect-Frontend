<template>
    <div>
        <h1>{{this.courseName}}({{this.courseCode}})选课花名册</h1>
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
                prop="studentId"
                label="学号"
                width="300">
            </el-table-column>
            <el-table-column
                prop="studentName"
                label="姓名"
                width="300">
            </el-table-column>
            <el-table-column
                prop="college"
                label="学院"
                width="300">
            </el-table-column>
            <el-table-column
                prop="grades"
                label="成绩"
                width="300">
            </el-table-column>
    </el-table>
    </div>
</template>

<script>
    import * as teacherAPI from '@/api/teacher/api-teacher.js'
    export default {
        data() {
            return {
                tableData: [{
                    studentId: '201928015029019',
                    studentName: '康林峰',
                    college: '计算机科学与技术学院',
                    grades:93
                }, {
                    studentId: '201928015029001',
                    studentName: '王小虎',
                    college: '人工智能学院',
                    grades:99
                }, {
                    studentId: '201928015029010',
                    studentName: '王锦浩',
                    college: '软件学院',
                    grades:95
                }, {
                    studentId: '201928015029011',
                    studentName: '冯建勇',
                    college: '网络空间安全学院',
                    grades:98
                }],
                courseCode:'',
                courseName:'',
                }
        },
        methods: {
            getParams(){
                this.courseCode=this.$route.query.courseCode;
                this.courseName=this.$route.query.courseName;
            }
        },
        created() {
            this.getParams();
        },
        mounted(){
            
        },
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