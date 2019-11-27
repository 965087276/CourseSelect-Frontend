<template>
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
            <el-select v-model="formInline.day" filterable placeholder="请选择">
                <el-option v-for="item in days" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
            <el-button type="primary" icon="el-icon-search"  @click="$emit('query-course', formInline)">查询</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" icon="el-icon-download"  @click="$emit('export-data')">导出</el-button>
        </el-form-item>
    </el-form>

</template>
<script>
    export default {
        name: "wCourseSearch",
        components: {},
        props: {},
        data() {
            return {
                // formInline
                formInline: {
                    courseType: '',
                    courseName: '',
                    college: '',
                    day: ''
                },
                colleges: [{
                    value: '计算机科学与技术学院',
                    label: '计算机科学与技术学院'
                }, {
                    value: '人工智能学院',
                    label: '人工智能学院'
                }, {
                    value: '网络空间安全学院',
                    label: '网络空间安全学院'
                }, {
                    value: '马克思学院',
                    label: '马克思学院'
                }, {
                    value: '人文学院',
                    label: '人文学院'
                }],
                courseTypes: [{
                    value: '核心课',
                    label: '核心课'
                }, {
                    value: '普及课',
                    label: '普及课'
                }, {
                    value: '研讨课',
                    label: '研讨课'
                }, {
                    value: '公共选修课',
                    label: '公共选修课'
                }, {
                    value: '公共必修课',
                    label: '公共必修课'
                }],
                days: [{
                    value: '1',
                    label: '周一'
                }, {
                    value: '2',
                    label: '周二'
                }, {
                    value: '3',
                    label: '周三'
                }, {
                    value: '4',
                    label: '周四'
                }, {
                    value: '5',
                    label: '周五'
                }, {
                    value: '6',
                    label: '周六'
                }, {
                    value: '7',
                    label: '周日'
                }],
                weekMap: {
                    '1': '周一',
                    '2': '周二',
                    '3': '周三',
                    '4': '周四',
                    '5': '周五',
                    '6': '周六',
                    '7': '周日'
                }
            }
        },
        methods: {}
    }
</script>