<template>
    <el-container>
        <el-header>
            <h1>学生管理</h1>
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
                <el-form-item label="学工号">
                    <el-input v-model="formInline.username" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" icon="el-icon-search"  @click="queryTeachers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" icon="el-icon-plus"  @click="dialogNewUserVisible = true">新增学生</el-button>
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
                        label="学工号">
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

            <el-dialog title="编辑学生" :visible.sync="dialogEditUserVisible">
                <el-form :model="studentForm">
                    <el-form-item label="学工号" :label-width="formLabelWidth">
                        <el-input v-model="studentForm.username" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="studentForm.realName" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="所在学院" :label-width="formLabelWidth">
                        <el-select v-model="studentForm.college" filterable placeholder="请选择">
                            <el-option v-for="item in colleges" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                        <el-input v-model="studentForm.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" :label-width="formLabelWidth">
                        <el-input v-model="studentForm.phoneNumber" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogEditUserVisible = false">取 消</el-button>
                    <el-button type="primary" @click="confirmEditUser">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="新增学生" :visible.sync="dialogNewUserVisible" width="30%">
                <el-form inline>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-plus"  @click="dialogNewUserFormVisible = !(dialogNewUserVisible = false)">手动添加</el-button>
                    </el-form-item>
                    <el-form-item>
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                            :http-request="uploadFile"
                            :before-remove="beforeRemove"
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                            <el-button type="primary" icon="el-icon-plus">excel录入</el-button>
                    </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" icon="el-icon-download"  @click="downloadExcel">excel模板下载</el-button>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogNewUserVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogNewUserVisible = false">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog
                    title="新增学生"
                    :visible.sync="dialogNewUserFormVisible"
                    width="40%"
                    :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :show-close="false"
            >
                <el-form
                        :model="registerForm"
                        status-icon
                        :rules="rules"
                        label-width="100px"
                        :label-position="'left'"
                        ref="registerForm"
                >
                    <el-form-item label="学工号" prop="username">
                        <el-input v-model="registerForm.username"></el-input>
                    </el-form-item>

                    <el-form-item label="姓名" prop="realName">
                        <el-input v-model="registerForm.realName" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="学院" prop="college">
                        <el-select v-model="registerForm.college" placeholder="请选择学院">
                            <el-option v-for="item in colleges" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>

                    <!--                    <el-form-item label="专业" prop="major">-->
                    <!--                        <el-select v-model="registerForm.major" placeholder="请选择专业">-->
                    <!--                            <el-option label="计算机应用技术" value="计算机应用技术"></el-option>-->
                    <!--                            <el-option label="计算机体系结构" value="计算机体系结构"></el-option>-->
                    <!--                        </el-select>-->
                    <!--                    </el-form-item>-->

                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="registerForm.email"></el-input>
                    </el-form-item>

                    <el-form-item label="联系方式" prop="phoneNumber">
                        <el-input v-model="registerForm.phoneNumber"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="addUser('registerForm')">提交</el-button>
                        <el-button @click="dialogNewUserFormVisible = false">取 消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-main>

    </el-container>
</template>

<script>
    import * as adminAPI from '@/api/admin/api-admin.js'
    import * as pubAPI from '@/api/pub/api-pub.js'
    export default {
        name: "StudentManage",
        data() {
            return {
                dialogEditUserVisible: false,
                dialogNewUserVisible: false,
                dialogNewUserFormVisible: false,
                registerForm: {
                    username: '',
                    realName: '',
                    email: '',
                    college: '',
                    // major: '',
                    phoneNumber: '',
                    role: 'student'
                },
                formLabelWidth: '120px',
                formInline: {
                    username: '',
                    realName: '',
                    college: ''
                },
                fileList:[],
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
                studentForm: {
                    'username': '',
                    'realName': '',
                    'college': '',
                    'email': '',
                    'phoneNumber': '',
                    'index': 0
                },
                rules: {
                    username: [{ required: true, message: "请输入学工号", trigger: "blur" }],
                    realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
                    email: [
                        { required: true, message: "请输入邮箱", trigger: "blur" },
                        { type: 'email',  message: "请输入正确的邮箱地址", trigger: "blur"}
                    ],
                    college: [
                        { required: true, message: "请选择学院", trigger: ["blur", "change"] }
                    ],
                    // major: [
                    //     { required: true, message: "请选择专业", trigger: ["blur", "change"] }
                    // ],
                }
            }
        },
        methods: {
            addUser(registerForm) {
                this.$refs.registerForm.validate(valid => {
                    if (valid) {
                        let body = registerForm
                        adminAPI.addUser(body)
                            .then(body => {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.dialogNewUserFormVisible = false;
                            })
                    }
                })
            },
            editUser(index, row) {
                this.studentForm.username = row.username
                this.studentForm.realName = row.realName
                this.studentForm.college = row.college
                this.studentForm.email = row.email
                this.studentForm.phoneNumber = row.phoneNumber
                this.studentForm.index = index
                this.dialogEditUserVisible = true;
            },
            removeUser(index, row) {
                this.$confirm('您要删除的为学生为' + row.realName, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'danger'
                }).then(() => {
                    adminAPI.deleteUser(row.username)
                        .then(body => {
                            this.$message({
                                message: '成功删除学生：' + row.username,
                                type: 'success'
                            });
                            this.tableData.splice(index, 1);
                        })
                })
            },
            confirmEditUser() {
                this.dialogEditUserVisible = false
                adminAPI.updateUserInfo(this.studentForm.username, this.studentForm)
                    .then(body => {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        let index = parseInt(this.studentForm.index)
                        this.tableData[index].realName = this.studentForm.realName
                        this.tableData[index].college = this.studentForm.college
                        this.tableData[index].email = this.studentForm.email
                        this.tableData[index].phoneNumber = this.studentForm.phoneNumber
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
                        arr.forEach(item => {
                            this.colleges.push({ label: item, value: item })
                        })
                    })
            },
            downloadExcel(){
                console.log('test!!!');
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/excel/Export2Excel.js');
                    const tHeader = ['所在学院', '学工号', '学生姓名', '邮箱','联系方式'];
                    const filterVal = [];
                    const list = [];  //把data里的tableData存到list
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '新增学生列表(模板)');
                }),
                this.dialogNewUserVisible=false;
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            uploadFile(item){
                this.$confirm("是否确认上传？","确认上传",
                {type:'info'})
                .then(()=>{
                    const form=new FormData();
                    form.append('file',item.file)
                    adminAPI.usersImport(this.registerForm.role,form)
                    .then(()=>{
                        this.$message({
                                message:"文件已上传！！",
                                type:'success',
                            });
                        this.getTableData()
                    })
                    
                })
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                this.fileList=fileList;
                console.log(this.fileList);
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
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