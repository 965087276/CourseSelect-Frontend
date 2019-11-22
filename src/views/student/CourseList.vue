<template>
    <el-container>
        <el-header>
            <el-form :inline="true" :model="formInline" label-width="auto" class="demo-form-inline">
                <el-form-item label="开课学院">
                    <el-select v-model="formInline.college" filterable placeholder="请选择">
                        <el-option v-for="item in colleges" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上课时间">
                    <el-select v-model="formInline.college" filterable placeholder="请选择">
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
        </el-header>
        <el-main>
            Main
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
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
                formInline: {
                    courseCode: '',
                    courseName: '',
                    college: '',
                }
            }
        },
        methods: {
            onSubmit() {

            },
            exportData() {

            }
        }
    }
</script>

<style scoped>
    
</style>