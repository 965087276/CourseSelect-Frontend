<template>
    <div id="app">
        <el-table
                :data="courseList"
                :span-method="objectSpanMethod"
                border
                stripe
                :header-cell-style="{background: '#e6e6e6'}"
                style="width: 100%">
            <el-table-column
                    v-if="$store.state.role !='teacher'"
                    prop="college"
                    label="开课学院">
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
                    label="课时/学分">
                <template slot-scope="scope">
                    {{ scope.row.courseHour + '/' + parseFloat(scope.row.credit) }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="limitNum"
                    label="限选">
            </el-table-column>
            <el-table-column
                    prop="selectedNum"
                    label="已选">
            </el-table-column>
            <el-table-column
                    prop="weekPeriod"
                    label="开课周">
            </el-table-column>
            <el-table-column
                    prop="sectionPeriod"
                    label="节次">
            </el-table-column>
            <el-table-column
                    prop="classroom"
                    label="教室">
            </el-table-column>
            <el-table-column
                    v-if="$store.state.role !='teacher'"
                    prop="courseTeacher"
                    label="主讲教师">
            </el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-button
                            v-if="$store.state.role=='student'"
                            :type="scope.row.isSelected ? 'danger' : 'primary'"
                            size="small"
                            :disabled="scope.row.isSelected"
                            @click="$emit('add-course', scope.row.pos, scope.row)">
                        {{ scope.row.isSelected ? selectedText : unSelectedText }}
                    </el-button>
                    <el-button
                            v-if="$store.state.role=='admin' ||$store.state.role=='teacher'"
                            :disabled="$store.state.canSelect"
                            type="primary"
                            size="small"
                            @click="$emit('edit-course', scope.row.pos, scope.row)">
                        修改
                    </el-button>
                    <el-button
                            v-if="$store.state.role=='admin'||$store.state.role=='teacher'"
                            :disabled="$store.state.canSelect"
                            type="danger"
                            size="small"
                            @click="$emit('remove-course', scope.row.pos, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "wCoursesListTable",
        components: {},
        props: {
            // 课程列表
            courseListRes: {
                type: Array,
                default: []
            },
            unSelectedText: {
                type: String
            },
            selectedText: {
                type: String
            }
        },
        data() {
            return {
                spanArr: [],
                courseList: [],
                // formInline
                formInline: {
                    courseType: '',
                    courseName: '',
                    college: '',
                    day: ''
                },
            colSpan: {
                   'teacher': {
                       'min': 7,
                       'max': 8
                   },
                    'student': {
                       'min': 8,
                       'max': 9
                    },
                    'admin':{
                        'min':8,
                        'max':9
                    }
                },
                colleges: [{
                    value: '计算机科学与技术学院',
                    label: '计算机科学与技术学院'
                }, {
                    value: '人工智能学院',
                    label: '人工智能学院'
                }, {
                    value: '网络空间安全学院',
                    label: '网络空间安全学院'
                }, {
                    value: '马克思学院',
                    label: '马克思学院'
                }, {
                    value: '人文学院',
                    label: '人文学院'
                }],
                courseTypes: [{
                    value: '专业核心课',
                    label: '专业核心课'
                }, {
                    value: '专业普及课',
                    label: '专业普及课'
                }, {
                    value: '专业研讨课',
                    label: '专业研讨课'
                }, {
                    value: '公共选修课',
                    label: '公共选修课'
                }, {
                    value: '公共必修课',
                    label: '公共必修课'
                }],
                days: [{
                    value: '1',
                    label: '周一'
                }, {
                    value: '2',
                    label: '周二'
                }, {
                    value: '3',
                    label: '周三'
                }, {
                    value: '4',
                    label: '周四'
                }, {
                    value: '5',
                    label: '周五'
                }, {
                    value: '6',
                    label: '周六'
                }, {
                    value: '7',
                    label: '周日'
                }],
                weekMap: {
                    '1': '周一',
                    '2': '周二',
                    '3': '周三',
                    '4': '周四',
                    '5': '周五',
                    '6': '周六',
                    '7': '周日'
                }
            }
        },
        methods: {
            flatCourses(coursesResponse) {
                let courseList_ = []
                for (let i = 0; i < coursesResponse.length; i++) {
                    let item = coursesResponse[i]
                    let course = {}
                    Object.assign(course, item)
                    course.pos = i
                    let schedules = course.courseSchedule
                    delete course.courseSchedule
                    schedules.forEach(schedule => {
                        let course_ = {}
                        Object.assign(course_, course)
                        Object.assign(course_, schedule)
                        courseList_.push(course_)
                    })
                }
                this.courseList = courseList_;
            },
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                let role = this.$store.state.role;
                if (columnIndex < this.colSpan[role]['min'] || columnIndex > this.colSpan[role]['max']) {
                    return {
                        rowspan: this.spanArr[rowIndex],
                        colspan: this.spanArr[rowIndex] > 0 ? 1 : 0
                    }
                }
            },
            getSpanArr() {
                this.spanArr = []
                for (let i = 0; i < this.courseList.length; i++) {
                    if (i === 0) {
                        this.spanArr.push(1)
                        this.pos = 0
                    } else {
                        if (this.courseList[i].courseCode === this.courseList[i - 1].courseCode) {
                            this.spanArr[this.pos] += 1;
                            this.spanArr.push(0);
                        } else {
                            this.spanArr.push(1);
                            this.pos = i;
                        }
                    }
                }
            },
            mapCourse() {
                this.courseList.forEach(item => {
                    item.weekPeriod = '第' + item.startWeek + '-' + item.endWeek + '周'
                    item.sectionPeriod = this.weekMap[item.day] + '(第' + item.time + '节)'
                    // delete item.startWeek
                    // delete item.endWeek
                })
            }
        },
        watch: {
            courseListRes: function (newCourseListRes) {
                this.flatCourses(newCourseListRes);
                this.mapCourse();
                this.getSpanArr();
            }
        }
    }
</script>