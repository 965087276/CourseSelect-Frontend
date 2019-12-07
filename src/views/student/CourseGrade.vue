<template>
    <el-container>
        <el-header>
            <h1>我的成绩</h1>
        </el-header>
        <el-main>
            <div class="my-grades">
                <el-table
                        :data="gradeList"
                        border
                        stripe
                        :header-cell-style="{background: '#e6e6e6'}"
                        style="width: 100%"
                >
                    <el-table-column
                            prop="courseCode"
                            label="课程编码">
                    </el-table-column>
                    <el-table-column
                            prop="courseName"
                            label="课程名称">
                    </el-table-column>
                    <el-table-column
                            prop="courseType"
                            label="课程属性">
                    </el-table-column>
                    <el-table-column
                            prop="credit"
                            label="学分">
                    </el-table-column>
                    <el-table-column
                            prop="courseTeacher"
                            label="主讲教师">
                    </el-table-column>
                    <el-table-column
                            prop="grade"
                            label="成绩">
                    </el-table-column>
                </el-table>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import * as studentAPI from '@/api/student/api-student.js'
    export default {
        data() {
            return {
                gradeList: []
            }
        },
        methods: {
            getGradeList() {
                studentAPI.getMyGrades(this.$store.state.username)
                    .then(grades => {
                        this.gradeList = grades;
                    })
            }
        },
        mounted() {
            this.getGradeList();
        }
    }
</script>

<style lang="scss" scoped>
    .el-main {
        margin-left: 0px
    }

</style>