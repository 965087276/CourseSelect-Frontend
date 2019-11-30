<template>
    <el-container>
        <el-header>
            <h1>选课学分统计</h1>
        </el-header>
        <el-main>
            <el-table
                    :data="tableData"
                    border="true"
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
                    </template>
                </el-table-column>
                <el-table-column
                        prop="electiveCoursesCredit"
                        label="公共选修课程学分要求">
                </el-table-column>
                <el-table-column
                        prop="specializedCoursesCredit"
                        label="专业学位课程学分要求">
                </el-table-column>
                <el-table-column
                        prop="totalCredit"
                        label="总学分要求">
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>


<script>
    export default {
        data() {
            return {
                tableData: [
                    {
                        'type': '学习要求',
                        'requiredCoursesAndCredit': ['学术道德与学术写作规范（1学分）', '中国特色社会主义理论与实践研究（2学分）', '自然辩证法概论（1学分）', '硕士学位英语（英语A）（3学分）'],
                        'specializedCoursesCredit': '>=12学分',
                        'electiveCoursesCredit': '>=2学分',
                        'totalCredit': '>=30学分'
                    },
                    {
                        'type': '选课情况',
                        'requiredCoursesAndCredit': ['中国特色社会主义理论与实践研究（2学分）', '学术道德与学术写作规范（1学分）'],
                        'specializedCoursesCredit': '13.0学分',
                        'electiveCoursesCredit': '1.0学分',
                        'totalCredit': '20.0学分'
                    },
                    {
                        'type': '获取学分',
                        'requiredCoursesAndCredit': ['中国特色社会主义理论与实践研究（2学分）', '硕士学位英语（英语A）（3学分）'],
                        'specializedCoursesCredit': '0.0学分',
                        'electiveCoursesCredit': '0.0学分',
                        'totalCredit': '5.0学分'
                    }
                ],
                requiredCourses: [
                    {name: '学术道德与学术写作规范', credit: 1 },
                    {name: '中国特色社会主义理论与实践研究', credit: 2 },
                    {name: '自然辩证法概论', credit: 1 },
                    {name: '硕士学位英语', credit: 3 }
                ],
                myCourses: {
                    selectedCourses: {
                        requiredCourses:  [
                            {name: '中国特色社会主义理论与实践研究', credit: 2 },
                            {name: '硕士学位英语', credit: 3 }
                        ],
                        electiveCourses: [
                            {name: '科学技术史', credit: 1 },
                            {name: '全球史', credit: 1.5 }
                        ],
                        specializedCourses: [
                            {name: '算法设计与分析', credit: 3 },
                            {name: '模式识别', credit: 3 },
                            {name: '高级软件工程', credit: 3 },
                        ],
                        requiredCoursesSum: 5,
                        electiveCoursesSum: 2.5,
                        specializedCoursesSum: 9
                    },
                    passedCourses: {
                        requiredCourses:  [
                            {name: '中国特色社会主义理论与实践研究', credit: 2 },
                            {name: '硕士学位英语', credit: 3 }
                        ],
                        electiveCourses: [
                            {name: '科学技术史', credit: 1 },
                            {name: '全球史', credit: 1 }
                        ],
                        specializedCourses: [
                            {name: '算法设计与分析', credit: 3 },
                            {name: '模式识别', credit: 3 },
                            {name: '高级软件工程', credit: 3 },
                        ],
                        requiredCoursesSum: 5,
                        electiveCoursesSum: 2.5,
                        specializedCoursesSum: 9
                    }
                }
            }
        },
        methods: {
            rowClass ({ row, column, rowIndex, columnIndex }) {
                if (columnIndex == 0) {
                    return 'background: #f4f5f5'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>