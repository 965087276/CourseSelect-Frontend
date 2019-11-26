<template>
    <el-table
            :data="courseList"
            :span-method="objectSpanMethod"
            border
            stripe
            style="width: 100%">
        <el-table-column
                prop="college"
                label="开课学院">
        </el-table-column>
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
                prop="major"
                label="所属学科/专业">
        </el-table-column>
        <el-table-column
                prop="credit"
                label="课时/学分">
        </el-table-column>
        <el-table-column
                prop="limitNum"
                label="限选">
        </el-table-column>
        <el-table-column
                prop="selectedNum"
                label="已选">
        </el-table-column>
        <el-table-column
                prop="weekPeriod"
                label="开课周">
        </el-table-column>
        <el-table-column
                prop="sectionPeriod"
                label="节次">
        </el-table-column>
        <el-table-column
                prop="classroom"
                label="教室">
        </el-table-column>
        <!-- <el-table-column
            prop="teachingType"
            label="授课方式">
        </el-table-column> -->
        <el-table-column
                prop="examType"
                label="考核方式">
        </el-table-column>
        <el-table-column
                prop="courseTeacher"
                label="主讲教师">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <!--<el-button-->
                        <!--type="primary"-->
                        <!--size="small"-->
                        <!--@click="addPreCourse(scope.$index, scope.row)">预选</el-button>-->
                <el-button
                    type="primary"
                    size="small"
                    @click="$emit('add-pre-course', scope.$index, scope.row)">
                    预选
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "wCoursesListTable",
        components: {},
        props: {
            // 课程列表
            courseList: {
                type: Array,
                default: []
            },
            // // spanArray
            // spanArr: {
            //     type: Array,
            //     default: []
            // }
        },
        data() {
            return {
                spanArr: []
            }
        },
        methods: {
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                if (columnIndex < 8 || columnIndex > 11) {
                    return {
                        rowspan: this.spanArr[rowIndex],
                        colspan: this.spanArr[rowIndex] > 0 ? 1 : 0
                    }
                }
            },
            getSpanArr() {
                this.spanArr = []
                for (let i = 0; i < this.courseList.length; i++) {
                    if (i === 0) {
                        this.spanArr.push(1)
                        this.pos = 0
                    } else {
                        if (this.courseList[i].courseCode === this.courseList[i - 1].courseCode) {
                            this.spanArr[this.pos] += 1;
                            this.spanArr.push(0);
                        } else {
                            this.spanArr.push(1);
                            this.pos = i;
                        }
                    }
                }
            }
        },
        watch: {
            courseList: function () {
                this.getSpanArr();
            }
        }
    }
</script>