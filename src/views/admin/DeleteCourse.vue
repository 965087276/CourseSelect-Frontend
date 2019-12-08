<template>
    <el-container>
        <el-main>
            <w-course-search
                    v-on:query-course="queryCourse"
                    v-on:export-data="exportData">
            </w-course-search>
            <w-course-list
                    :courseListRes="courseListRes"
                    v-on:edit-course="editCourse"
                    v-on:remove-course="removeCourse">
                <template v-slot:course-select-text>
                    编辑和删除
                </template>
            </w-course-list>
        </el-main>
    </el-container>
</template>

<script>
    import * as studentAPI from '@/api/student/api-student.js'
    import * as adminAPI from '@/api/admin/api-admin.js'
    import wCourseList from '@/components/student/wCourseListTable.vue'
    import wCourseSearch from '@/components/student/wCourseSearch.vue'
    export default {
        components: {wCourseList,wCourseSearch},
        data() {
            return {
                formInline: {},
                courseListRes: [], //表格
            }
        },
        methods: {
            queryCourse(childFormInline) {
                Object.assign(this.formInline, childFormInline);
                this.getCourseList();
            },
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
                studentAPI.getCourseList(this.formInline)
                    .then(body => {
                        
                        this.courseListRes = body;
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