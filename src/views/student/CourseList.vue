<template>
    <el-container>
        <!-- <el-header>
            
        </el-header> -->
        <el-main>
            <el-form 
                :inline="true" 
                :model="formInline" 
                label-width="auto"
                class="demo-form-inline">
                <el-form-item label="开课学院">
                    <el-select v-model="formInline.college" filterable placeholder="请选择">
                        <el-option v-for="item in colleges" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上课时间">
                    <el-select v-model="formInline.courseTime" filterable placeholder="请选择">
                        <el-option v-for="item in colleges" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程属性">
                    <el-select v-model="formInline.courseType" filterable placeholder="请选择">
                        <el-option v-for="item in courseTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程名称">
                    <el-input v-model="formInline.courseName" placeholder="请输入"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search"  @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-download"  @click="exportData">导出</el-button>
                </el-form-item>
            </el-form>
            <w-course-list :courseList="courseList" :spanArr="spanArr"></w-course-list>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="totalElements"
                :current-page="curPage"
                :page-size="pageSize"
                @current-change="handleCurrentChange">
            </el-pagination>
        </el-main>
        <el-footer>
            
        </el-footer>
    </el-container>
</template>

<script>
    import * as studentAPI from '@/api/student/api-student.js'
    import wCourseList from '@/components/student/wCourseListTable.vue'
    export default {
        components: {wCourseList},
        data() {
            return {
                totalElements: 100,
                curPage: 1,
                pageSize: 20,
                colleges: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                courseTypes: [{
                    value: '选项1',
                    label: '核心课'
                }, {
                    value: '选项2',
                    label: '普及课'
                }, {
                    value: '选项3',
                    label: '研讨课'
                }, {
                    value: '选项4',
                    label: '公共选修课'
                }, {
                    value: '选项5',
                    label: '公共必修课'
                }],
                formInline: {
                    courseCode: '',
                    courseName: '',
                    college: '',
                    courseTime: ''
                },
                courseList: [], //表格
                spanArr: [] , //二维数组，用于存放单元格合并规则
            }
        },
        methods: {
            onSubmit() {

            },
            exportData() {

            },
            handleCurrentChange(val) {
                if (val != this.curPage) {
                    this.curPage = val;
                    this.getCourseList();
                } 
            },
            addPreCourse(index, row) {
                let body = {
                    'username': this.$store.state.username,
                    'courseCode': row.courseCode
                };
                studentAPI.coursePreSelect(body)
                    .then(body => {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    })
            },
            flatCourses(coursesResponse) {
                this.courseList = []
                coursesResponse.forEach(item => {
                    let course = {}
                    Object.assign(course, item)
                    let schedules = course.courseSchedule
                    delete course.courseSchedule
                    schedules.forEach(schedule => {
                        let course_ = {}
                        Object.assign(course_, course)
                        Object.assign(course_, schedule)
                        this.courseList.push(course_)
                    })
                })
            },
            getSpanArr() {
                this.spanArr = []
                for (let i = 0; i < this.courseList.length; i++) {
                    if (i === 0) {
                        this.spanArr.push(1)
                        this.pos = 0
                    }
                    else {
                        if (this.courseList[i].courseCode === this.courseList[i-1].courseCode) {
                            this.spanArr[this.pos] += 1;
                            this.spanArr.push(0);
                        }
                        else {
                            this.spanArr.push(1);
                            this.pos = i;
                        }
                    }
                }
            },
            getCourseList() {
                studentAPI.getCourseList((this.courseCode, this.courseName, this.college, this.courseTime, this.curPage, this.pageSize))
                    .then(body => {
                        this.totalElements = body.totalElements;
                        this.flatCourses(body.content)
                        this.getSpanArr()
                    })
            },

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
    .el-pagination {
        width: 100%;
        margin: 0 auto
    }
</style>