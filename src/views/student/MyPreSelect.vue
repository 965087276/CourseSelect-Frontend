<template>
    <el-container>
        <el-header>
            <h1>我的预选课列表</h1>
        </el-header>
        <el-main>
            <el-table
                    :data="tableData"
                    border
                    stripe
                    style="width: 100%">
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
                        label="学分">
                </el-table-column>
                <el-table-column
                        prop="courseTeacher"
                        label="主讲教师">
                </el-table-column>
                <el-table-column label="操作" width="150px">
                    <template slot-scope="scope">
                        <el-button
                                v-if="$store.state.canSelect"
                                type="primary"
                                size="small"
                                @click="$emit('selectCourse', scope.$index, scope.row)">
                            选课
                        </el-button>
                        <el-button
                                type="danger"
                                size="small"
                                @click="$emit('removeCourse', scope.$index, scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
    import * as studentAPI from '@/api/student/api-student.js'
    export default {
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            selectCourse(index, row) {

            },
            removeCourse(index, row) {

            },
            getTableData() {
                studentAPI.getStudentPreCourse(this.$store.state.username)
                    .then(body => {
                        this.tableData = body;
                    })
            }
        },
        mounted() {
            this.getTableData();
        }
    }
</script>