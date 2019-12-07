<template>
    <el-container>
        <el-header>
            <h1>选课学分统计</h1>
        </el-header>
        <el-main>
            <el-table
                    :data="tableData"
                    border
                    stripe
                    :header-cell-style="{background: '#e6e6e6'}"
                    :cell-style="rowClass"
                    style="width: 100%">
                <el-table-column
                        prop="type"
                        label="类别"
                        style="background: #f4f5f5">
                </el-table-column>
                <el-table-column
                        prop="requiredCoursesAndCredit"
                        label="公共必修课程及学分">
                    <template slot-scope="scope">
                        <p v-for="item in scope.row.requiredCoursesAndCredit">
                            {{ item }}
                        </p>
                        <p v-if="scope.row.requiredCoursesCreditSum != null">
                            <span style="color: red">共计：{{ scope.row.requiredCoursesCreditSum }}</span>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="electiveCoursesAndCredit"
                        label="公共选修课程学分要求">
                    <template slot-scope="scope">
                        <p v-for="item in scope.row.electiveCoursesAndCredit">
                            {{ item }}
                        </p>
                        <p v-if="scope.row.electiveCoursesCreditSum != null">
                            <span style="color: red">共计：{{ scope.row.electiveCoursesCreditSum }}</span>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="specializedCoursesAndCredit"
                        label="专业课程学分要求">
                    <template slot-scope="scope">
                        <p v-for="item in scope.row.specializedCoursesAndCredit">
                            {{ item }}
                        </p>
                        <p v-if="scope.row.specializedCoursesCreditSum != null">
                            <span style="color: red">共计：{{ scope.row.specializedCoursesCreditSum }}</span>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="totalCredit"
                        label="总学分要求">
                    <template slot-scope="scope">
                        <span  v-if="scope.$index > 0" style="color: red">共计：{{ scope.row.totalCredit }}</span>
                        <p v-else>{{ scope.row.totalCredit }}</p>
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
                tableData: [
                    {
                        'type': '学习要求',
                        'requiredCoursesAndCredit': ['学术道德与学术写作规范（1学分）', '中国特色社会主义理论与实践研究（2学分）', '自然辩证法概论（1学分）', '硕士学位英语（英语A）（3学分）'],
                        'specializedCoursesAndCredit': ['>=12学分'],
                        'electiveCoursesAndCredit': ['>=2学分'],
                        'totalCredit': '>=30学分'
                    },
                    {
                        'type': '选课情况',
                        'requiredCoursesAndCredit': ['中国特色社会主义理论与实践研究（2学分）', '学术道德与学术写作规范（1学分）', '共计：5学分'],
                        'specializedCoursesAndCredit': ['模式识别（3学分）', '算法设计与分析（3学分）', '高级软件工程（3学分）', '并发数据结构与多核编程（2学分）', '矩阵分析与应用（2学分）', '共计：13学分'],
                        'electiveCoursesAndCredit': ['科学技术史（1学分）', '共计：1学分'],
                        'totalCredit': '20.0学分'
                    },
                    {
                        'type': '获取学分',
                        'requiredCoursesAndCredit': ['中国特色社会主义理论与实践研究（2学分）', '硕士学位英语（英语A）（3学分）', '共计：5学分'],
                        'specializedCoursesAndCredit': ['0.0学分'],
                        'electiveCoursesAndCredit': ['0.0学分'],
                        'totalCredit': '5.0学分'
                    }
                ],
                requiredCourses: [
                    {name: '学术道德与学术写作规范', credit: 1 },
                    {name: '中国特色社会主义理论与实践研究', credit: 2 },
                    {name: '自然辩证法概论', credit: 1 },
                    {name: '硕士学位英语', credit: 3 }
                ],


            }
        },
        methods: {
            rowClass ({ row, column, rowIndex, columnIndex }) {
                if (columnIndex == 0) {
                    return 'background: #f4f5f5'
                }
            },
            getTableData() {
                studentAPI.getCourseStats(this.$store.state.username)
                    .then(body => {
                        this.tableData[1] = body[0];
                        this.tableData[2] = body[1];
                    })
            }
        },
        mounted() {
            this.getTableData();
        }
    }
</script>

<style lang="scss" scoped>
    .el-main {
        margin-left: 0px
    }
</style>