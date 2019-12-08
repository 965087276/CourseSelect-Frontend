<template>
    <div id="app" v-loading="$store.state.canSelect === false" element-loading-text="选课尚未开放">
        <el-container>
            <el-main>
                <w-course-search
                        :courseTime="courseTimeParams"
                        v-on:query-course="queryCourse"
                        v-on:export-data="exportData">
                </w-course-search>
                <w-course-list
                        unSelectedText="选课"
                        selectedText="已选课"
                        :courseListRes="courseListRes"
                        v-on:add-course="selectCourse">
                </w-course-list>

            </el-main>

        </el-container>
    </div>
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
                            this.courseListRes[index].isSelected = true;
                            this.courseListRes.push()
                        })
                })

            },
            getCourseList() {
                studentAPI.getCourseList(this.formInline, this.curPage, this.pageSize)
                    .then(body => {
                        this.courseListRes = body;
                        studentAPI.getMyCourseCode(this.$store.state.username)
                            .then(codes => {
                                this.courseListRes.forEach(course => {
                                    course.isSelected = (codes.indexOf(course.courseCode) != -1);
                                })
                                this.courseListRes.push()
                            })
                    })
            }
        },
        created() {

        },
        mounted() {
            this.$store.commit('updateCanSelect')
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