<template>
    <div>
        <h1>选择需要录入成绩的课程</h1>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
            label="课程名称"
            width="500">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.courseCode }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="课程名称"
            width="500">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.courseName }}</span>
            </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope" >
                    <el-button
                    type="primary"
                    size="mini"
                    @click="handleEdit(scope.row)">录入成绩</el-button>
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
                }
        },
        methods: {
            handleEdit(row) {
                
                this.$router.push({
                    path:'/teacher/course-maneger/grades/enter',
                    query:{
                        courseCode:row.courseCode,
                        courseName:row.courseName,
                    }
                    })
                //console.log(row.courseCode+' '+row.courseName);
            },
            getTeacherCourses(teacherId){
                teacherAPI.getTeacherCourse(teacherId)
                .then(body=>{
                    this.tableData=body.content;
                })
            }
        },
        mounted() {
            this.getTeacherCourses(this.$store.state.username);
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

