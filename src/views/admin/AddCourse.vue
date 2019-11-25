<template>
    <el-container>
        <el-main>
           <el-button type="primary" @click="importCourse">导入课程</el-button>
           <el-form :inline="true" :model="formInline" label-width="auto" class="demo-form-inline">
           <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-form-item label="课程编码">
                            <el-input v-model="formInline.courseCode" placeholder="请输入"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-form-item label="课程名称">
                            <el-input v-model="formInline.courseName" placeholder="请输入"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="开课学院">
                            <el-select v-model="formInline.colleges" filterable placeholder="请选择">
                                <el-option v-for="item in colleges" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-form-item label="课程属性">
                            <el-select v-model="formInline.courseTypes" filterable placeholder="请选择">
                                <el-option v-for="item in courseTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-form-item label="所属学科/专业">
                        <el-select v-model="formInline.majors" filterable placeholder="请选择">
                            <el-option v-for="item in majors" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-form-item label="课时/学分">
                        <el-select v-model="formInline.courseTypes" filterable placeholder="请选择">
                            <el-option v-for="item in courseTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-form-item label="课程开始周">
                        <el-select v-model="formInline.weeks" filterable placeholder="请选择">
                            <el-option v-for="item in weeks" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-form-item label="课程结束周">
                        <el-select v-model="formInline.weeks" filterable placeholder="请选择">
                            <el-option v-for="item in weeks" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                 <el-col :span="12">
                 <div class="grid-content bg-purple-light">
                    <el-form-item label="节次">
                        <el-select v-model="formInline.courseTimes" filterable placeholder="请选择">
                            <el-option v-for="item in courseTimes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-form-item label="教室">
                        <el-select v-model="formInline.classrooms" filterable placeholder="请选择">
                            <el-option v-for="item in classrooms" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-form-item label="授课方式">
                        <el-select v-model="formInline.teachingTypes" filterable placeholder="请选择">
                            <el-option v-for="item in teachingTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-form-item label="考核方式">
                        <el-select v-model="formInline.examTypes" filterable placeholder="请选择">
                            <el-option v-for="item in examTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-form-item label="主讲老师">
                        <el-input v-model="formInline.teacher" placeholder="请输入"></el-input>
                    </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-form-item label="限选人数">
                        <el-input v-model="formInline.limitNum" placeholder="请输入"></el-input>
                    </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                 <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-form-item label="课程大纲">
                        <el-input
                        v-model="formInline.outline" 
                        placeholder="请输入" 
                        style="width:400px" ></el-input>
                    </el-form-item>
                    </div>
                </el-col>
            </el-row>
            </el-form>
            

        </el-main>
        <el-footer>
            <div style="
                width: 100%;
                height: 100px;
                text-align:center;"
                >
                <el-button type="success" round size="medium">确认添加</el-button>
                <el-button type="danger" round size="medium">取消</el-button>
            </div>
        </el-footer>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                colleges: [{
                    value: '选项1',
                    label: '计算机科学与技术学院'
                }, {
                    value: '选项2',
                    label: '网络空间安全学院'
                }, {
                    value: '选项3',
                    label: '人工智能技术学院'
                }, {
                    value: '选项4',
                    label: '软件学院'
                }, {
                    value: '选项5',
                    label: '马克思主义学院'
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
                weeks:[{
                    value: '选项1',
                    label: '第1周'
                }, {
                    value: '选项2',
                    label: '第2周'
                }, {
                    value: '选项3',
                    label: '第3周'
                }, {
                    value: '选项4',
                    label: '第4周'
                }, {
                    value: '选项5',
                    label: '第5周'
                },{
                    value: '选项6',
                    label: '第6周'
                }, {
                    value: '选项7',
                    label: '第7周'
                }, {
                    value: '选项8',
                    label: '第8周'
                }, {
                    value: '选项9',
                    label: '第9周'
                }, {
                    value: '选项10',
                    label: '第10周'
                },{
                    value: '选项11',
                    label: '第11周'
                }, {
                    value: '选项12',
                    label: '第12周'
                }, {
                    value: '选项13',
                    label: '第13周'
                }, {
                    value: '选项14',
                    label: '第14周'
                }, {
                    value: '选项15',
                    label: '第15周'
                },{
                    value: '选项16',
                    label: '第16周'
                }, {
                    value: '选项17',
                    label: '第17周'
                }, {
                    value: '选项18',
                    label: '第18周'
                }, {
                    value: '选项19',
                    label: '第19周'
                }, {
                    value: '选项20',
                    label: '第20周'
                }],
                examTypes:[{
                    value: '选项1',
                    label: '课堂开卷'
                }, {
                    value: '选项2',
                    label: '大开卷'
                }, {
                    value: '选项3',
                    label: '闭卷笔试'
                }, {
                    value: '选项4',
                    label: '读书报告'
                }, {
                    value: '选项5',
                    label: '其他'
                }],
                teachingTypes:[{
                    value: '选项1',
                    label: '课堂讲授为主'
                }, {
                    value: '选项2',
                    label: '授课、讨论'
                }, {
                    value: '选项3',
                    label: '讲课、实验'
                }, {
                    value: '选项4',
                    label: '讲课、上机'
                }, {
                    value: '选项5',
                    label: '其他'
                }],
                formInline: {
                    courseCode: '',
                    courseName: '',
                    colleges: '',
                    courseTimes: '',
                    outline:'',
                    limitNum:'',
                    weeks:'',
                    classrooms:'',
                    teachingTypes:'',
                    examTypes:'',
                    teacher:'',
                    courseTimes:'',
                    majors:''
                },
                courseList: [

                ]
            }
        },
        methods: {
            importCourse(){

            }
        },
        mounted(){
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