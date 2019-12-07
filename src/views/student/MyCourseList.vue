<template>
    <el-container>
        <el-header>
            <h1>已选课程</h1>
        </el-header>
        <el-main>
            <el-row
                    :gutter="15"
            >
                <el-col class="course-stats">
                    <span style="font-weight: bold; color: #888888">
                        总共选修课程：<span style="color: #CC0000">{{courseCredits.totalCredits}}</span>分，
                        其中必修课：<span style="color: #CC0000">{{courseCredits.requiredCredits}}</span>分，
                        公选课：<span style="color: #CC0000">{{courseCredits.electiveCredits}}</span>分，
                        专业课：<span style="color: #CC0000">{{courseCredits.specializedCredits}}</span>分
                    </span>
                </el-col>
            </el-row>
            <div class="my-pre-course-list">
                <el-table
                        :data="courseList"
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
                    <el-table-column label="操作" width="150px">
                        <template slot-scope="scope">
                            <el-button
                                    type="danger"
                                    size="small"
                                    @click="removeCourse(scope.$index, scope.row)">
                                退选
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-main>
    </el-container>

</template>

<script>
    import * as studentAPI from '@/api/student/api-student.js'

    export default {
        name: "MyCourseList",
        data() {
            return {
                courseList: [],
                courseCredits: {
                    totalCredits: 20,
                    requiredCredits: 10,
                    electiveCredits: 10,
                    specializedCredits: 10
                }
            }
        },
        methods: {
            removeCourse(index, row) {
                this.$confirm('您要退选的课程为' + row.courseName, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'danger'
                }).then(() => {
                    studentAPI.deleteStudentPreCourse(this.$store.state.username, row.courseCode)
                        .then(body => {
                            this.$message({
                                message: '成功退选课程：' + row.courseCode,
                                type: 'success'
                            });
                            this.courseList.splice(index, 1);
                        })
                })
            },
            getCourseList() {
                studentAPI.getMyCourseList(this.$store.state.username)
                    .then(body => {
                        this.courseList = body.courses;
                        this.courseCredits = body.courseCredits;
                    })
            }
        },
        mounted() {
            this.getCourseList();
        }
    }
</script>

<style lang="scss" scoped>
    .el-main {
        margin-left: 0px
    }

    .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }

    #course-stats {
        color: #888888;
    }
</style>