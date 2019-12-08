<template>
    <el-container>
        <el-main>
        <h1>教师课程列表</h1>
            <w-course-list
                    :courseListRes="courseListRes"
                    v-on:edit-course="editCourse"
                    v-on:remove-course="removeCourse">
                <template v-slot:course-select-text>
                    删除
                </template>
            </w-course-list>
        </el-main>
    </el-container>
</template>

<script>
    import * as teacherAPI from '@/api/teacher/api-teacher.js'
    import * as adminAPI from '@/api/admin/api-admin.js'
    import wCourseList from '@/components/student/wCourseListTable.vue'
    export default {
        components: {wCourseList},
        data() {
            return {
                courseListRes: [], //表格
            }
        },
        methods: {
            exportData() {

            },
            editCourse(){

            },
            removeCourse(index,row){
                this.$confirm("是否确认删除？","删除确认",{
                    type:"warning"})
                    .then(()=>{
                        adminAPI.deleteCourse(row.courseCode)
                        .then(()=>{
                            this.$message({
                                    message:"删除成功！！",
                                    type:'success',
                                });
                            })
                        this.getCourseList();
                    }).catch(()=>{
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    })
            },
            getCourseList() {
                teacherAPI.getTeacherCourseList(this.$store.state.username)
                    .then(body => {
                        this.courseListRes = body;
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