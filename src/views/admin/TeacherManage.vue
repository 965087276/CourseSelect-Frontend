<template>
    <el-container>
        <el-header>
            <h1>教师管理</h1>
        </el-header>
        <el-main>
            <el-form
                    :inline="true"
                    :model="formInline"
                    label-width="auto"
                    class="demo-form-inline">
                <el-form-item label="所在学院">
                    <el-select v-model="formInline.college" filterable placeholder="请选择">
                        <el-option v-for="item in colleges" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formInline.realName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="教工号">
                    <el-input v-model="formInline.username" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" icon="el-icon-search"  @click="queryTeachers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" icon="el-icon-plus"  @click="$emit('export-data')">新增教师</el-button>
                </el-form-item>
            </el-form>

            <el-table
                    :data="tableData"
                    border
                    stripe
                    :header-cell-style="{background: '#e6e6e6'}"
                    style="width: 100%">
                <el-table-column
                        prop="college"
                        label="所在学院">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="教工号">
                </el-table-column>
                <el-table-column
                        prop="realName"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        prop="phoneNumber"
                        label="联系方式">
                </el-table-column>

                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button
                                type="primary"
                                size="small"
                                @click="$emit('edit-user', scope.$index, scope.row)">
                            修改
                        </el-button>
                        <el-button
                                type="danger"
                                size="small"
                                @click="$emit('remove-user', scope.$index, scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-box">
                <el-pagination
                        class="pagination"
                        background
                        @prev-click="handlePrevChange"
                        @next-click="handleNextChange"
                        @current-change="handleCurrentChange"
                        :page-size.sync="paramData.pageSize"
                        :current-page.sync="paramData.currentPage"
                        layout="prev, pager, next"
                        :total="totalElements">
                </el-pagination>
            </div>

        </el-main>

    </el-container>
</template>

<script>
    import * as adminAPI from '@/api/admin/api-admin.js'
    export default {
        name: "TeacherManage",
        data() {
            return {
                formInline: {
                    username: '',
                    realName: '',
                    college: ''
                },
                tableData: [],
                totalElements: 10,
                paramData: {
                    curPage: 1,
                    pageSize: 10,
                    username: '',
                    realName: '',
                    college: ''
                }
            }
        },
        methods: {
            handlePrevChange(currentPage) {
                this.getTableData()
            },
            handlePrevChange(currentPage) {
                this.getTableData()
            },
            handleCurrentChange(currentPage) {
                this.getTableData()
            },
            queryTeachers() {
                this.paramData.username = this.formInline.username
                this.paramData.realName = this.formInline.realName
                this.paramData.college = this.formInline.college
                this.paramData.curPage = 1
                this.paramData.pageSize = 10
                this.getTableData()
            },
            getTableData() {
                adminAPI.getTeachers(this.paramData)
                    .then(body => {
                        this.tableData = body.content;
                        this.totalElements = body.totalElements;
                    })
            }
        },
        mounted() {
            this.getTableData();
        }
    }
</script>

<style scoped>
    .el-main {
        margin-left: 0px;
    }
    .pagination-box {
        text-align: center;
    }
    .pagination {
        padding: 30px 5px;
    }
</style>