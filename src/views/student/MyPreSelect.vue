<template>
    <el-container>
        <el-header>
            <h1>我的预选</h1>
        </el-header>
        <el-main>
            <div class="my-pre-course-list">
                <h2>我的预选课列表</h2>
                <el-table
                        :data="courseList"
                        border
                        stripe
                        style="width: 100%">
                    <el-table-column label="课程规划" width="200px">
                        <template slot-scope="scope">
                            <el-button
                                    type="primary"
                                    size="small"
                                    @click="addToPreTable(scope.$index, scope.row)">
                                加入预选课表
                            </el-button>
                        </template>
                    </el-table-column>
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
                                    v-if="$store.state.canSelect"
                                    type="primary"
                                    size="small"
                                    @click="$emit('selectCourse', scope.$index, scope.row)">
                                选课
                            </el-button>
                            <el-button
                                    type="danger"
                                    size="small"
                                    @click="removeCourse(scope.$index, scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="my-pre-course-table">
                <h2>我的预选课课表</h2>
                <div class="table_head">
                    <div class="day">周一</div>
                    <div class="day">周二</div>
                    <div class="day">周三</div>
                    <div class="day">周四</div>
                    <div class="day">周五</div>
                    <div class="day">周六</div>
                    <div class="day">周日</div>
                </div>
                <div class="table_main">
                    <div class="table_aside">
                        <div class="time">1</div>
                        <div class="time">2</div>
                        <div class="time">3</div>
                        <div class="time">4</div>
                        <div class="time">5</div>
                    </div>
                    <div class="table_content">
                        <div class="class" v-for="(item,index) in courseSchedulesTable" :key="index">
                            <div class="class_inner" v-if="item.courseName != null && item.courseName!=''">
                                <div class="course">{{item.courseName}}</div>
                                <div class="class_info">
                                    <div class="student">
                                        <i class="el-icon-info"></i>
                                        {{item.courseTeacher}}
                                    </div>
                                    <div class="classroom">
                                        <i class="el-icon-location"></i>
                                        {{item.classroom}}
                                    </div>
                                </div>
                            </div>
                            <div class="no_class" v-if="item.courseName == ''">无课</div>
                        </div>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import * as studentAPI from '@/api/student/api-student.js'

    export default {
        data() {
            return {
                courseList: [],
                multipleSelection: [],
                courseSchedulesTable: []
            }
        },
        methods: {
            init() {
                for (let i = 0; i < 35; i++) {
                    this.courseSchedulesTable[i] = {
                        day: "",
                        time: "",
                        classroom: "",
                        courseName: "",
                        courseTeacher: ""
                    };
                }
            },
            removeCourse(index, row) {
                this.$confirm('确认要删除这门预选课？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    studentAPI.deleteStudentPreCourse(this.$store.state.username, row.courseCode)
                        .then(body => {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.courseList.splice(index, 1);
                        })
                })
            },
            getTableData() {
                studentAPI.getStudentPreCourse(this.$store.state.username)
                    .then(body => {
                        this.courseList = body;
                    })
            },

            addToPreTable(index, row) {
                let schedules = row.courseSchedules;
                schedules.forEach(schedule => {
                    let day = parseInt(schedule.day);
                    let time = parseInt(schedule.time);
                    let index = (day - 1) * 5 + time - 1;
                    let ans = {
                        day,
                        time,
                        classroom: schedule.classroom,
                        courseName: row.courseName,
                        courseTeacher: row.courseTeacher
                    }
                    this.$set(this.courseSchedulesTable, index, ans);
                })
            }
        },
        created() {
            this.init();
        },
        mounted() {
            this.getTableData();
            this.init();
        }
    }
</script>

<style lang="scss" scoped>
    .el-main {
        margin-left: 0px
    }
    .table_head {
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        margin: 20px 20px 20px 85px;
        display: flex;
        .day {
            width: 14.286%;
            text-align: center;
        }
    }
    .table_main {
        display: flex;
        .table_aside {
            width: 50px;
            height: 750px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
            padding: 10px;
            margin-right: 20px;
            .time {
                line-height: 150px;
                text-align: center;
                font-size: 1.5rem;
            }
        }
        .table_content {
            height: 750px;
            background-color: #fff;
            border-radius: 10px;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
            position: relative;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            width: 100%;
            .class {
                height: 150px;
                width: 14.28%;
                padding: 10px;
                box-sizing: border-box;
                @media screen and (max-width: 1540px) {
                    font-size: 14px;
                    .course {
                        min-height: 50px !important;
                        font-size: 1rem !important;
                    }
                    .class_info {
                        display: block !important;
                        line-height: 20px !important;
                    }
                }
                .class_inner {
                    background-color: #409eff;
                    height: 100%;
                    border-radius: 10px;
                    padding: 20px;
                    box-sizing: border-box;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
                    .course {
                        color: white;
                        font-size: 1.2rem;
                        font-weight: bold;
                        min-height: 65px;
                    }
                    .class_info {
                        display: flex;
                        line-height: 30px;
                        color: white;
                        .student {
                            margin-right: 10px;
                        }
                    }
                }
                .no_class {
                    background-color: rgba(0, 0, 0, 0.05);
                    height: 100%;
                    border-radius: 10px;
                    padding: 20px;
                    box-sizing: border-box;
                    line-height: 90px;
                    text-align: center;
                    font-size: 1.2rem;
                    font-weight: lighter;
                    color: rgba(0, 0, 0, 0.3);
                    cursor: pointer
                }
            }
        }
    }
    .notifys {
        background-color: #409eff !important;
        color: #fff !important;
    }
</style>