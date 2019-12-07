<template>
    <el-container>
        <el-main>
            <w-course-search
                    v-on:query-course="queryCourse"
                    v-on:export-data="exportData">
            </w-course-search>
            <w-course-list
                    unSelectedText="预选"
                    selectedText="已预选"
                    :courseListRes="courseListRes"
                    v-on:add-course="preSelectCourse">
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
                        this.courseListRes[index].isSelected = true;
                        this.courseListRes.push()
                    })
            },
            getCourseList() {
                studentAPI.getCourseList(this.formInline)
                    .then(body => {
                        this.courseListRes = body;
                        studentAPI.getMyPreCourseCode(this.$store.state.username)
                            .then(codes => {
                                this.courseListRes.forEach(course => {
                                    course.isSelected = (codes.indexOf(course.courseCode) != -1);
                                })
                                this.courseListRes.push()
                            })
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