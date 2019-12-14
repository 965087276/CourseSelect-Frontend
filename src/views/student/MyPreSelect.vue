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
                        style="width: 80%">
                    <el-table-column label="课程规划" width="200px">
                        <template slot-scope="scope">
                            <el-button
                                    v-if="!scope.row.addToTable"
                                    type="primary"
                                    size="small"
                                    @click="addToPreTable(scope.$index, scope.row)">
                                加入预选课表
                            </el-button>
                            <el-button
                                    v-else
                                    type="danger"
                                    size="small"
                                    @click="removeFromPreTable(scope.$index, scope.row)">
                                移出预选课表
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
                    <el-table-column label="操作" width="200px">
                        <template slot-scope="scope">
                            <el-button
                                    v-if="$store.state.canSelect"
                                    :type="scope.row.isSelected ? 'danger' : 'primary'"
                                    size="small"
                                    :disabled="scope.row.isSelected"
                                    @click="selectCourse(scope.$index, scope.row)">
                                {{ scope.row.isSelected ? '已选' : '选课' }}
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
                        <div class="class" v-for="(item,index) in data" :key="index">
                            <div class="no_class" v-if="item.length == 0" @click="routeTo(index)">无课</div>
                            <div class="class_inner" v-else-if="item.length == 1">
                                <div class="course">{{item[0].courseName}}</div>
                                <div class="class_info">
                                    <div class="student">
                                        <i class="el-icon-info"></i>
                                        {{ '第' + item[0].startWeek + '-' + item[0].endWeek + '周'}}
                                    </div>
                                    <div class="classroom">
                                        <i class="el-icon-location"></i>
                                        {{item[0].classroom}}
                                    </div>
                                </div>
                            </div>
                            <div class="class_inner" style="background-color: rgb(39, 247, 133); cursor: pointer" v-else @click="getNextCourse(index, item.length)">
                                <div class="course">{{ item[dataPos[index]].courseName }}</div>
                                <div class="class_info">
                                    <div class="student">
                                        <i class="el-icon-info"></i>
                                        {{ '第' + item[dataPos[index]].startWeek + '-' + item[dataPos[index]].endWeek + '周'}}
                                    </div>
                                    <div class="classroom">
                                        <i class="el-icon-location"></i>
                                        {{ item[dataPos[index]].classroom }}
                                    </div>
                                </div>
                            </div>

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
                data: [],
                dataPos: []
            }
        },
        methods: {
            routeTo(index) {
                let day = parseInt(index / 5) + 1
                let time = index % 5 + 1
                let isCourseTable = true
                this.$router.push({name: 'course-list', params: {day, time, isCourseTable} })
            },
            getNextCourse(index, itemLength) {
                let v = (this.dataPos[index] + 1) % parseInt(itemLength);
                this.$set(this.dataPos, index, v);
            },
            selectCourse(index, row) {
                let body = {
                    'username': this.$store.state.username,
                    'courseCode': row.courseCode
                };
                this.$confirm('您要选的课程为' + row.courseName, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    studentAPI.courseSelect(body)
                        .then(body => {
                            this.$message({
                                message: '选课成功',
                                type: 'success'
                            });
                            this.courseList[index].isSelected = true;
                            this.courseList.push()
                        })
                })

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
                            this.initPreTable();
                        })
                })
            },
            getTableData() {
                studentAPI.getStudentPreCourse(this.$store.state.username)
                    .then(body => {
                        this.courseList = body;
                        this.$store.commit('updateCanSelect')
                        if (this.$store.state.canSelect) {
                            studentAPI.getMyCourseCode(this.$store.state.username)
                                        .then(codes => {
                                            this.courseList.forEach(course => {
                                                course.isSelected = (codes.indexOf(course.courseCode) != -1);
                                            })
                                            this.courseList.push()
                                        })
                        }
                        this.initPreTable()
                    })
            },
            /**
             * 初始化预选课课表
             */
            initPreTable() {
                this.data = []
                for (let i = 0; i < 35; i++) {
                    this.data[i] = []
                    this.dataPos[i] = 0
                }
                this.courseList.filter(course => course.addToTable).forEach(course => {
                    let schedules = course.courseSchedules;
                    schedules.forEach(schedule => {
                        let day = parseInt(schedule.day);
                        let time = parseInt(schedule.time);
                        let index = (day - 1) * 5 + time - 1;
                        let ans = {
                            day,
                            time,
                            startWeek: schedule.startWeek,
                            endWeek: schedule.endWeek,
                            classroom: schedule.classroom,
                            courseName: course.courseName,
                            courseTeacher: course.courseTeacher
                        }
                        this.data[index].push(ans)
                    })
                })
                this.data.push()
            },
            /**
             * 从预选课课表中删除某门课
             * @param index
             * @param row
             */
            removeFromPreTable(index, row) {
                studentAPI.modifyAddToTable(this.$store.state.username, row.courseCode, false)
                    .then(body => {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.courseList[index].addToTable = false;
                        this.initPreTable()
                    })
            },
            /**
             * 向预选课课表中添加某门课
             * @param index
             * @param row
             */
            addToPreTable(index, row) {
                // let courseInfos = this.data[index]
                // for (let i = 0; i < courseInfos.length; i++) {
                //     let courseInfo = courseInfos[i];
                //     if (!(row.endWeek < courseInfo.startWeek || courseInfo.endWeek < row.startWeek)) {
                //         let message = "当前课程与" + courseInfo.courseName + "冲突"
                //         this.$alert(message, '添加失败', {
                //             confirmButtonText: '确定'
                //         });
                //         return false;
                //     }
                // }
                let myList = row.courseSchedules;
                for (let p = 0; p < this.courseList.length; p++) if (this.courseList[p].addToTable) {
                    let preList = this.courseList[p].courseSchedules;
                    for (let i = 0; i < myList.length; i++)
                        for (let j = 0; j < preList.length; j++) {
                            // 判断预选课程是否冲突
                            if (!(myList[i].endWeek < preList[j].startWeek || preList[j].endWeek < myList[i].startWeek)
                                && myList[i].day == preList[j].day
                                && myList[i].time == preList[j].time) {
                                let message = "当前课程与" + this.courseList[p].courseName + "冲突"
                                this.$alert(message, row.courseName + '课程添加失败', {
                                    confirmButtonText: '确定'
                                });
                                return false;
                            }
                        }
                }

                studentAPI.modifyAddToTable(this.$store.state.username, row.courseCode, true)
                    .then(body => {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.courseList[index].addToTable = true;
                        this.initPreTable()
                    })
            }
        },
        mounted() {
            this.getTableData();
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