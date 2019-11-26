<template>
    <div id="app">
        <el-form
                :inline="true"
                :model="formInline"
                label-width="auto"
                class="demo-form-inline">
            <el-form-item label="开课学院">
                <el-select v-model="formInline.college" filterable placeholder="请选择">
                    <el-option v-for="item in colleges" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上课时间">
                <el-select v-model="formInline.courseTime" filterable placeholder="请选择">
                    <el-option v-for="item in colleges" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="课程属性">
                <el-select v-model="formInline.courseType" filterable placeholder="请选择">
                    <el-option v-for="item in courseTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="课程名称">
                <el-input v-model="formInline.courseName" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search"  @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-download"  @click="exportData">导出</el-button>
            </el-form-item>
        </el-form>
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
                            @click="$emit('add-course', scope.$index, scope.row)">
                        <slot name="course-select-text"></slot>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
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
            // formInline
            formInline: {
                type: Object,
                default: []
            }
        },
        data() {
            return {
                spanArr: [],
                colleges: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                courseTypes: [{
                    value: '选项1',
                    label: '核心课'
                }, {
                    value: '选项2',
                    label: '普及课'
                }, {
                    value: '选项3',
                    label: '研讨课'
                }, {
                    value: '选项4',
                    label: '公共选修课'
                }, {
                    value: '选项5',
                    label: '公共必修课'
                }],
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