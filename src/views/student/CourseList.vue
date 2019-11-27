<template>
    <el-container>
        <el-main>
            <w-course-search
                    v-on:query-course="queryCourse"
                    v-on:export-data="exportData">
            </w-course-search>
            <w-course-list
                    :courseListRes="courseListRes"
                    v-on:add-course="preSelectCourse">
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
    import wCourseSearch from '@/components/student/wCourseSearch.vue'
    export default {
        components: {wCourseList, wCourseSearch},
        data() {
            return {
                totalElements: 100,
                curPage: 1,
                pageSize: 20,
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
            getCourseList() {
                studentAPI.getCourseList(this.formInline, this.curPage, this.pageSize)
                    .then(body => {
                        this.totalElements = body.totalElements;
                        this.courseListRes = body.content;
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