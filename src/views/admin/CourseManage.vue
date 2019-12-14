<template>
    <el-container>
        <el-main>
            <w-course-search
                    v-on:query-course="queryCourse"
                    v-on:new-course="clickNewCourse">
            </w-course-search>
            <w-course-list
                    :courseListRes="courseListRes"
                    v-on:edit-course="editCourse"
                    v-on:remove-course="removeCourse">
                <template v-slot:course-select-text>
                    编辑和删除
                </template>
            </w-course-list>

            <el-dialog title="新增课程" :visible.sync="dialogNewCourseVisible" width="30%">
                <el-form inline>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-plus"  @click="dialogNewCourseFormVisible = !(dialogNewCourseVisible = false)">手动添加</el-button>
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
                    <el-button @click="dialogNewCourseVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogNewCourseVisible = false">确 定</el-button>
                </div>
            </el-dialog>

            <w-new-course-form-dialog
                v-bind:dialog-new-course-form-visible-control.sync="dialogNewCourseFormVisible"
                v-on:submit-form="submitNewCourseForm"

            >
            </w-new-course-form-dialog>

        </el-main>
    </el-container>
</template>

<script>
    import * as studentAPI from '@/api/student/api-student.js'
    import * as adminAPI from '@/api/admin/api-admin.js'
    import wCourseList from '@/components/student/wCourseListTable.vue'
    import wCourseSearch from '@/components/student/wCourseSearch.vue'
    import wNewCourseFormDialog from "../../components/teacher/wNewCourseFormDialog";
    export default {
        components: {wCourseList,wCourseSearch, wNewCourseFormDialog},
        data() {
            return {
                formInline: {},
                courseListRes: [], //表格
                dialogNewCourseVisible: false,
                dialogNewCourseFormVisible: false,
                fileList:[],
            }
        },
        methods: {
            clickNewCourse() {
                this.dialogNewCourseVisible = true
            },
            submitNewCourseForm() {
                this.dialogNewCourseFormVisible = false;
                this.getCourseList();
            },
            queryCourse(childFormInline) {
                Object.assign(this.formInline, childFormInline);
                this.getCourseList();
            },
            downloadExcel(){
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/excel/Export2Excel.js');
                    const tHeader = ['开课学院', '课程编码', '课程名称', '课程属性','课时','学分','限选','起始周','结束周','星期','节次','教室','主讲教师','教工号'];
                    const filterVal = [];
                    const list = [];  //把data里的tableData存到list
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '新增课程表（模板）');
                })
                 this.dialogNewCourseVisible=false;
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
                    adminAPI.coursesImport(form)
                    .then(()=>{
                        this.$message({
                                message:"文件已上传！！",
                                type:'success',
                            });
                        this.getCourseList()
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
            editCourse(){

            },
            removeCourse(index,row){
                this.$confirm("是否确认删除？","删除确认",{
                    type:"warning"})
                    .then(()=>{
                        adminAPI.deleteCourse(row.courseCode)
                        .then(()=>{
                            this.$message({
                                    message:"删除成功！！",
                                    type:'success',
                                });
                            })
                        this.getCourseList();
                    }).catch(()=>{
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    })
            },
            getCourseList() {
                studentAPI.getCourseList(this.formInline)
                    .then(body => {
                        this.courseListRes = body;
                    })
                this.$store.commit('updateCanSelect')
            },

        },
        mounted() {
            this.getCourseList();
        }
    }
</script>

<style lang="scss" scoped>
    .el-main {
        margin-left: 0px
    }
    .el-pagination {
        width: 100%;
        margin: 0 auto
    }
</style>