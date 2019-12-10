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
                    <el-button type="success" icon="el-icon-plus"  @click="dialogNewUserVisible = true">新增教师</el-button>
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
                                @click="editUser(scope.$index, scope.row)">
                            修改
                        </el-button>
                        <el-button
                                :disabled="$store.state.canSelect"
                                type="danger"
                                size="small"
                                @click="removeUser(scope.$index, scope.row)">
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
                        :current-page.sync="paramData.curPage"
                        layout="prev, pager, next"
                        :total="totalElements">
                </el-pagination>
            </div>

            <el-dialog title="编辑教师" :visible.sync="dialogEditUserVisible">
                <el-form :model="teacherForm">
                    <el-form-item label="教工号" :label-width="formLabelWidth">
                        <el-input v-model="teacherForm.username" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="teacherForm.realName" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="所在学院" :label-width="formLabelWidth">
                        <el-select v-model="teacherForm.college" filterable placeholder="请选择">
                            <el-option v-for="item in colleges" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                        <el-input v-model="teacherForm.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" :label-width="formLabelWidth">
                        <el-input v-model="teacherForm.phoneNumber" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogEditUserVisible = false">取 消</el-button>
                    <el-button type="primary" @click="confirmEditUser">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="新增教师" :visible.sync="dialogNewUserVisible" width="30%">
                <el-form :model="teacherForm" inline>

                    <el-form-item>
                        <el-button type="primary" icon="el-icon-plus"  @click="queryTeachers">手动添加</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-plus"  @click="$emit('export-data')">excel录入</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" icon="el-icon-download"  @click="$emit('export-data')">excel模板下载</el-button>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogNewUserVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogNewUserVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </el-main>

    </el-container>
</template>

<script>
    import * as adminAPI from '@/api/admin/api-admin.js'
    import * as pubAPI from '@/api/pub/api-pub.js'
    export default {
        name: "TeacherManage",
        data() {
            return {
                dialogEditUserVisible: false,
                dialogNewUserVisible: false,
                formLabelWidth: '120px',
                formInline: {
                    username: '',
                    realName: '',
                    college: ''
                },
                colleges: [],
                tableData: [],
                totalElements: 10,
                paramData: {
                    curPage: 1,
                    pageSize: 10,
                    username: '',
                    realName: '',
                    college: ''
                },
                teacherForm: {
                    'username': '',
                    'realName': '',
                    'college': '',
                    'email': '',
                    'phoneNumber': '',
                    'index': 0
                }
            }
        },
        methods: {
            editUser(index, row) {
                this.teacherForm.username = row.username
                this.teacherForm.realName = row.realName
                this.teacherForm.college = row.college
                this.teacherForm.email = row.email
                this.teacherForm.phoneNumber = row.phoneNumber
                this.teacherForm.index = index
                this.dialogEditUserVisible = true;
            },
            removeUser(index, row) {
                this.$confirm('您要删除的为教师为' + row.realName, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'danger'
                }).then(() => {
                    adminAPI.deleteUser(row.username)
                        .then(body => {
                            this.$message({
                                message: '成功删除教师：' + row.username,
                                type: 'success'
                            });
                            this.tableData.splice(index, 1);
                        })
                })
            },
            confirmEditUser() {
                this.dialogEditUserVisible = false
                adminAPI.updateUserInfo(this.teacherForm.username, this.teacherForm)
                    .then(body => {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        let index = parseInt(this.teacherForm.index)
                        this.tableData[index].realName = this.teacherForm.realName
                        this.tableData[index].college = this.teacherForm.college
                        this.tableData[index].email = this.teacherForm.email
                        this.tableData[index].phoneNumber = this.teacherForm.phoneNumber
                        this.tableData.push()
                    })
            },
            handlePrevChange(currentPage) {
                this.getTableData()
            },
            handleNextChange(currentPage) {
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
                this.$store.commit('updateCanSelect')
            },
            getColleges() {
                pubAPI.getColleges()
                    .then(arr => {
                        arr.colleges.forEach(item => {
                            this.colleges.push({ label: item, value: item })
                        })
                    })
            }
        },
        mounted() {
            this.getTableData();
            this.getColleges();
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