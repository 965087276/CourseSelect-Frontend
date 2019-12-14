<template>
    <el-container>
        <el-main>
            <h1>教师课程列表</h1>
            <el-form inline>
                <el-form-item>
                    <el-button type="primary" @click="dialogNewCourseFormVisible = true">增加新课程</el-button>
                </el-form-item>
            </el-form>
            <w-course-list
                    :courseListRes="courseListRes"
                    v-on:edit-course="editCourse"
                    v-on:remove-course="removeCourse">
                <template v-slot:course-select-text>
                    删除
                </template>
            </w-course-list>

            <w-new-course-form-dialog
                    v-bind:dialog-new-course-form-visible-control.sync="dialogNewCourseFormVisible"
                    v-on:submit-form="submitNewCourseForm"
            >
            </w-new-course-form-dialog>

        </el-main>
    </el-container>
</template>

<script>
    import * as teacherAPI from '@/api/teacher/api-teacher.js'
    import * as adminAPI from '@/api/admin/api-admin.js'
    import wCourseList from '@/components/student/wCourseListTable.vue'
    import wNewCourseFormDialog from "../../components/teacher/wNewCourseFormDialog";

    export default {
        components: {wCourseList, wNewCourseFormDialog},
        data() {
            return {
                courseListRes: [], //表格
                dialogNewCourseFormVisible: false
            }
        },
        methods: {
            exportData() {

            },
            editCourse() {

            },
            submitNewCourseForm() {
                this.dialogNewCourseFormVisible = false;
                this.getCourseList();
            },
            removeCourse(index, row) {
                this.$confirm("是否确认删除？", "删除确认", {
                    type: "warning"
                })
                    .then(() => {
                        adminAPI.deleteCourse(row.courseCode)
                            .then(() => {
                                this.$message({
                                    message: "删除成功！！",
                                    type: 'success',
                                });
                            })
                        this.getCourseList();
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            },
            getCourseList() {
                this.$store.commit('updateCanSelect')
                teacherAPI.getTeacherCourseList(this.$store.state.username)
                    .then(body => {
                        this.courseListRes = body;
                        this.courseListRes.push()
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

    .el-pagination {
        width: 100%;
        margin: 0 auto
    }
</style>