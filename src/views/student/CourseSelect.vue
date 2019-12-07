<template>
    <el-container>
        <el-main>
            <w-course-search
                    :courseTime="courseTimeParams"
                    v-on:query-course="queryCourse"
                    v-on:export-data="exportData">
            </w-course-search>
            <w-course-list
                    :courseListRes="courseListRes"
                    v-on:add-course="selectCourse">
                <template v-slot:course-select-text>
                    选课
                </template>
            </w-course-list>

        </el-main>

    </el-container>
</template>

<script>
    import * as studentAPI from '@/api/student/api-student.js'
    import wCourseList from '@/components/student/wCourseListTable.vue'
    import wCourseSearch from '@/components/student/wCourseSearch.vue'

    export default {
        components: {wCourseList, wCourseSearch},
        data() {
            return {
                formInline: {},
                courseListRes: [], //表格
                courseTimeParams: {}
            }
        },
        methods: {
            queryCourse(childFormInline) {
                Object.assign(this.formInline, childFormInline);
                this.getCourseList();
            },
            exportData() {

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
                        })
                })

            },
            getCourseList() {
                studentAPI.getCourseList(this.formInline, this.curPage, this.pageSize)
                    .then(body => {
                        this.courseListRes = body;
                    })
            },
            fetchData() {
                alert(this.$route.params.day)
            }
        },
        mounted() {
            // 如果是从我的课程里跳转过来
            if (this.$route.params.isCourseTable == true) {
                this.courseTimeParams = this.$route.params;
                this.formInline = this.$route.params;
            }
            this.getCourseList();
        },
        created() {

        },
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