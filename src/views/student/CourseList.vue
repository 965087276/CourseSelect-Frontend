<template>
    <el-container>
        <el-main>
            <w-course-list
                    v-model="formInline"
                    :courseList="courseList"
                    v-on:add-course="preSelectCourse"
                    v-on:on-submit="onSubmit"
                    v-on:export-data="exportData">
                <template v-slot:course-select-text>
                    预选
                </template>
            </w-course-list>

        </el-main>
        <el-footer>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="totalElements"
                    :current-page="curPage"
                    :page-size="pageSize"
                    @current-change="handleCurrentChange">
            </el-pagination>
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
                formInline: {
                    courseType: '',
                    courseName: '',
                    college: '',
                    courseTime: ''
                },
                courseList: [], //表格
                spanArr: [] , //二维数组，用于存放单元格合并规则
            }
        },
        methods: {
            onSubmit(childFormInline) {
                Object.assign(this.formInline, childFormInline);
                this.getCourseList();
            },
            exportData() {

            },
            handleCurrentChange(val) {
                if (val != this.curPage) {
                    this.curPage = val;
                    this.getCourseList();
                } 
            },
            preSelectCourse(index, row) {
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
                let courseList_ = []
                coursesResponse.forEach(item => {
                    let course = {}
                    Object.assign(course, item)
                    let schedules = course.courseSchedule
                    delete course.courseSchedule
                    schedules.forEach(schedule => {
                        let course_ = {}
                        Object.assign(course_, course)
                        Object.assign(course_, schedule)
                        courseList_.push(course_)
                    })
                })
                this.courseList = courseList_;
            },
            getCourseList() {
                studentAPI.getCourseList(this.formInline, this.curPage, this.pageSize)
                    .then(body => {
                        this.totalElements = body.totalElements;
                        this.flatCourses(body.content)
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