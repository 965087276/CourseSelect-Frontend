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
                    <el-input v-model="formInline.courseName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="教工号">
                    <el-input v-model="formInline.courseName" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" icon="el-icon-search"  @click="$emit('query-course', formInline)">查询</el-button>
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
                        layout="prev, pager, next"
                        :total="1000">
                </el-pagination>
            </div>

        </el-main>

    </el-container>
</template>

<script>
    export default {
        name: "TeacherManage",
        data() {
            return {
                formInline: {},
                tableData: []
            }
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